package com.nfc;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.support.multidex.MultiDex;
import android.support.v4.content.FileProvider;
import android.util.Log;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.nfc.net.AppUpDateModle;
import com.nfc.net.DownloadUntil;
import com.nfc.network.Constant;
import com.nfc.network.HttpResultSubscriber;
import com.nfc.network.NetService;
import com.nfc.network.NetWorkFactory;
import com.nfc.network.req.ReportJSversion;
import com.nfc.network.resp.ResponseJSEntity;
import com.nfc.reactmodle.RNtoNativeModle;
import com.nfc.util.ForceLoading;
import com.nfc.util.NativeConstant;
import com.nfc.util.PhoneMessage;
import com.nfc.util.ToolUtil;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static final String TAG = "MainApplication";

  private static MainApplication instance = null;


  private SharedPreferences sharedPreferences;

  private SharedPreferences.Editor editor;

  private ForceLoading forceLoading;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNReactNativeDocViewerPackage(),
            new PickerPackage(),
            new RNFSPackage(),
            new SplashScreenReactPackage(),
              new RNtoNativeModle()
      );
    }

    protected ReactInstanceManager createReactInstanceManager() {
      ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
              .setApplication(MainApplication.this)
              .setJSMainModulePath(getJSMainModuleName())
              .setUseDeveloperSupport(getUseDeveloperSupport())
              .setRedBoxHandler(getRedBoxHandler())
              .setJavaScriptExecutorFactory(getJavaScriptExecutorFactory())
              .setUIImplementationProvider(getUIImplementationProvider())
              .setInitialLifecycleState(LifecycleState.BEFORE_CREATE);

      for (ReactPackage reactPackage : getPackages()) {
        builder.addPackage(reactPackage);
      }

      String jsBundleFile = getJSBundleFile();
      if (jsBundleFile != null) {
        builder.setJSBundleFile(jsBundleFile);
      } else {
        String assetsVersion = ToolUtil.assetsVersion(MainApplication.this);
        sharedPreferences.edit().putString(NativeConstant.JS_VERSION_NAME, assetsVersion).commit();
        builder.setBundleAssetName(Assertions.assertNotNull(NativeConstant.JS_VERSION +
                File.separator + assetsVersion + File.separator + getBundleAssetName()));
      }
      return builder.build();
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }


    @Override
    protected String getJSBundleFile() {
      String loadVersion = ToolUtil.loadJSVersion(MainApplication.this);
      String jsPath = NativeConstant.BASE_PATH + loadVersion + File.separator + NativeConstant.JS_ENTY;
      File file = new File (jsPath);
      if(file != null && file.exists()) {
        sharedPreferences.edit().putString(NativeConstant.JS_VERSION_NAME, loadVersion).commit();
        return jsPath;
      } else {
        return super.getJSBundleFile();
      }
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    instance = this;

    firstCopy();
    //initPush();

    DownloadUntil.getDeviceInfo(this);

    PhoneMessage.appVer = getPackageInfo(this).versionCode;
  }

  public static MainApplication getInstance(){
    return instance;
  }

  /**
   * 判断是更新是否需要拷贝Assets文件
   * 同步操作防止出错
   */
  public void firstCopy(){
    PackageInfo packageInfo = null;
    //清空下载任务ID
    this.getSharedPreferences("download", Context.MODE_PRIVATE).edit().clear().commit();
    try {
      packageInfo = this.getPackageManager().getPackageInfo(getPackageName(), 0);
      int versionCode = packageInfo.versionCode;
      sharedPreferences = getSharedPreferences("kuaiCheCaiFu", Context.MODE_PRIVATE);
      int oldversionCode = sharedPreferences.getInt(NativeConstant.VERSION_CODE, 0);
      editor = sharedPreferences.edit();
      if(versionCode > oldversionCode){
        /**
         * 更新了APK需要更新SDK上的Bundle
         * 重置sharedPreferences的JS_VERSION_NAME，本地JS版本清空
         */
        ToolUtil.deleteAllJS();
        DownloadUntil.CopyRN(this);
        editor.putInt(NativeConstant.VERSION_CODE, versionCode);
        editor.putString(NativeConstant.JS_VERSION_NAME, "0");
        editor.commit();
      }

      if(ToolUtil.getVersionList().length == 0){
        DownloadUntil.CopyRN(this);
      }
      SendVersionInfo();

    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
  }


  /**
   * 服务器交互，上传版本信息
   * @throws PackageManager.NameNotFoundException
   */
  public void SendVersionInfo() throws PackageManager.NameNotFoundException {
    /**
     * 收集本地JS版本信息
     * 发送请求
     */
    final ReportJSversion reportJSversion = new ReportJSversion();
    reportJSversion.Version = ToolUtil.getAPKVersion(this) + "."
            + sharedPreferences.getString(NativeConstant.JS_VERSION_NAME, "0");
    reportJSversion.JSVersionList = ToolUtil.getVersionList();

    NetService.getInstance(NetWorkFactory.getInstance())
            .getUpdateInfo(reportJSversion, new HttpResultSubscriber<ResponseJSEntity>() {
              @Override
              public void onSuccess(ResponseJSEntity responseJSEntity) {

                /**====================================测试代码====================================**/
                if(NativeConstant.ISDEBUG){
                  responseJSEntity = new ResponseJSEntity();
                }

                /**====================================测试代码====================================**/

                if(responseJSEntity.appVersion.upgrade != 0){
                  //APP更新
                  AppUpDateModle.download(responseJSEntity.appVersion.url, Constant.BASE_FILE, new AppUpDateModle.OnDownloadListener(){

                    @Override
                    public void onDownloadSuccess() {
                      Log.d(TAG, "DownSuccess");
                      File file = new File(Constant.DOWN_APK);
                      String[] command = {"chmod", "777", file.getPath() };
                      ProcessBuilder builder = new ProcessBuilder(command);
                      try {
                        builder.start();
                      } catch (IOException e) {
                        e.printStackTrace();
                      }
                      if(Build.VERSION.SDK_INT>=24){
                        Intent intent = new Intent(Intent.ACTION_VIEW);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        Uri apkUrl = FileProvider.getUriForFile(MainApplication.this, getApplicationContext().getPackageName() + ".provider", new File(Constant.DOWN_APK));
                        intent.setDataAndType(apkUrl,
                                "application/vnd.android.package-archive");

                        startActivity(intent);
                      }else{
                        Intent install = new Intent(Intent.ACTION_VIEW);
                        install.setDataAndType(Uri.fromFile(new File(Constant.DOWN_APK)), "application/vnd.android.package-archive");
                        install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(install);
                      }
                    }

                    @Override
                    public void onDownloading(int progress) {
                      //Log.d(TAG, "==================" + progress + "==================");
                    }

                    @Override
                    public void onDownloadFailed() {

                    }
                  });

                }else{
                  if(!responseJSEntity.loadRnVersion.equals("")){
                    if(!ToolUtil.checkJSversion(responseJSEntity.loadRnVersion)){
                      //强制加载版本,将提示信息延迟到主界面
                      forceLoading = new ForceLoading();
                      forceLoading.isUpdate = true;
                      forceLoading.version = responseJSEntity.loadRnVersion;
                    }
                    //记录加载版本号
                    editor.putString(NativeConstant.JS_VERSION_NAME, responseJSEntity.loadRnVersion).commit();
                  }else{
                    //本地版本出错，服务器要求加载内置版本
                    editor.putString(NativeConstant.JS_VERSION_NAME, NativeConstant.VERSION_ERROR).commit();
                  }
                  if(responseJSEntity.rnVersionList != null){
                    for(ResponseJSEntity.RNVersion rnVersion : responseJSEntity.rnVersionList){
                      if(rnVersion.versionUrl != null && !rnVersion.versionUrl.equals("")){
                        //添加JS版本
                        DownloadUntil.downLoadBundle(MainApplication.this, rnVersion.version
                                , rnVersion.incrementVersion, rnVersion.versionUrl, rnVersion.versionSign);
                      }
                    }
                  }

                  if(responseJSEntity.deleteVersionList != null){
                    for(String deleteRnVersion : responseJSEntity.deleteVersionList){
                      //删除版本
                      ToolUtil.deleteJS(deleteRnVersion);
                    }
                  }
                }
              }
              @Override
              public void _onError(int status, String msg) {
                editor.putString(NativeConstant.JS_VERSION_NAME, NativeConstant.PLATFROM_ERROR).commit();
              }
            });
  }


  private static PackageInfo getPackageInfo(Context context) {
    PackageInfo pi = null;

    try {
      PackageManager pm = context.getPackageManager();
      pi = pm.getPackageInfo(context.getPackageName(),
              PackageManager.GET_CONFIGURATIONS);

      return pi;
    } catch (Exception e) {
      e.printStackTrace();
    }

    return pi;
  }


  public ForceLoading needUpdate(){
    return forceLoading;
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
