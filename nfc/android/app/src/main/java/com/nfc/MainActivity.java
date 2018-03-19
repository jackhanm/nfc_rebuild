package com.nfc;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.telephony.TelephonyManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.nfc.fragment.AppUpdateDialog;
import com.nfc.fragment.UpdateDialog;
import com.nfc.util.AppUpdate;
import com.nfc.util.ForceLoading;
import com.nfc.util.NativeConstant;
import com.nfc.util.PhoneMessage;
import com.nfc.util.ToolUtil;

import permissions.dispatcher.NeedsPermission;
import permissions.dispatcher.RuntimePermissions;

import static com.nfc.util.NativeConstant.SHARED_PREFERENCES;

@RuntimePermissions
public class MainActivity extends ReactActivity implements UpdateDialog.CancleCallBack, UpdateDialog.EnsureCallBack, AppUpdateDialog.AppUpdateCallBack{

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "nfc";
    }

    @NeedsPermission({Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE})
    void reactHotUpdate(){
        //DownloadUntil.unzip();
        //DownloadUntil.downLoadBundle(MainActivity.this);
    }

    @Override
    public void onCreate(Bundle saveInstanceBundle){

        super.onCreate(saveInstanceBundle);
        initPhoneInfo();
        //DownloadUntil.downLoadBundle(MainApplication.getInstance());
        //timer.schedule(task, 8000);
        getAction();
        showDialog();
    }

    private void getAction(){
        Intent intent = getIntent();
        String action = intent.getAction();
        if (Intent.ACTION_VIEW.equals(action)) {
            Uri uri = intent.getData();
            if (uri != null) {
                String page = uri.getQueryParameter("page");
                if(page != null){
                    getReactInstanceManager()
                            .getCurrentReactContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("pagename", page);
                }
            }
        }
    }

    private void initPhoneInfo(){
        TelephonyManager tm = (TelephonyManager) this.getSystemService(Activity.TELEPHONY_SERVICE);
        if (tm != null) {
            PhoneMessage.IMEI =  tm.getDeviceId();
            PhoneMessage.IMSI = tm.getSubscriberId();
        }

        WifiManager wifi = (WifiManager) this.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifi.getConnectionInfo();

    }

    //强制更新Dialog
    public void showDialog(){
        ForceLoading forceLoading = MainApplication.getInstance().needUpdate();
        AppUpdate appUpdate = MainApplication.getInstance().needAppUpdate();
        if(forceLoading != null && forceLoading.isUpdate){
            if(ToolUtil.checkJSversion(forceLoading.version)){
                loadAgain();
            }else{
                UpdateDialog.getFragment(forceLoading).show(getFragmentManager(), "");
            }
        }else if(appUpdate != null){
            AppUpdateDialog.instance(appUpdate).show(getFragmentManager(), "");
        }
    }


    @Override
    public void cancleCallBack() {
        ForceLoading forceLoading = MainApplication.getInstance().needUpdate();
        forceLoading.isUpdate = false;
    }

    @Override
    public void ensureCallBack() {
        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                loadAgain();
            }
        });
    }

    //重新加载
    private void loadAgain(){
        ForceLoading forceLoading = MainApplication.getInstance().needUpdate();
        forceLoading.isUpdate = false;
        MainActivity.this
                .getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE)
                .edit()
                .putString(NativeConstant.JS_VERSION_NAME, forceLoading.version)
                .commit();
        Intent intent = new Intent(MainActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
        //清除RN，重新加载后会选择其他JS版本
        MainApplication.getInstance().getReactNativeHost().clear();
    }

    @Override
    public void appCancleCallBack() {

    }

    @Override
    public void appEnsureCallBack() {
    }
}
