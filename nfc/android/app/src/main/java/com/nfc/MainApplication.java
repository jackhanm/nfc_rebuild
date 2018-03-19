package com.nfc;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.support.multidex.MultiDex;

import com.beefe.picker.PickerViewPackage;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.nfc.net.DownloadUntil;
import com.nfc.network.HttpResultSubscriber;
import com.nfc.network.NetService;
import com.nfc.network.NetWorkFactory;
import com.nfc.network.req.ReportJSversion;
import com.nfc.network.resp.ResponseJSEntity;
import com.nfc.reactmodle.RNtoNativeModle;
import com.nfc.util.AppUpdate;
import com.nfc.util.ForceLoading;
import com.nfc.util.NativeConstant;
import com.nfc.util.PhoneMessage;
import com.nfc.util.ToolUtil;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static final String TAG = "MainApplication";

  private static MainApplication instance = null;


  private SharedPreferences sharedPreferences;

  private SharedPreferences.Editor editor;

  private ForceLoading forceLoading = null;

    private AppUpdate appUpdate = null;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerViewPackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
              new RNSpinkitPackage(),
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
      sharedPreferences = getSharedPreferences(NativeConstant.SHARED_PREFERENCES, Context.MODE_PRIVATE);
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

                if(responseJSEntity.appVersion.upgrade != 0 || responseJSEntity.appVersion.forceUpgrade != 0){

                    appUpdate = new AppUpdate();
                    appUpdate.forceUpgrade = responseJSEntity.appVersion.forceUpgrade;
                    appUpdate.upgrade = responseJSEntity.appVersion.upgrade;
                    appUpdate.upgradeLog = responseJSEntity.appVersion.upgradeLog;
                    appUpdate.url = responseJSEntity.appVersion.url;
                    appUpdate.version = responseJSEntity.appVersion.version;
                    appUpdate.versionCode = responseJSEntity.appVersion.versionCode;

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
                        Long id = DownloadUntil.downLoadBundle(MainApplication.this, rnVersion.version
                                , rnVersion.incrementVersion, rnVersion.versionUrl, rnVersion.versionSign);
                        if(responseJSEntity.loadRnVersion.equals(rnVersion.version)){
                          forceLoading.id = id;
                        }
                      }
                    }
                  }

                  if(responseJSEntity.deleteRnVersionList != null){
                    for(String deleteRnVersion : responseJSEntity.deleteRnVersionList){
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

  public AppUpdate needAppUpdate(){return appUpdate;}

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
