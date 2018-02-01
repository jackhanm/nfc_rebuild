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
import com.nfc.fragment.UpdateDialog;
import com.nfc.util.ForceLoading;
import com.nfc.util.NativeConstant;
import com.nfc.util.PhoneMessage;

import permissions.dispatcher.NeedsPermission;
import permissions.dispatcher.RuntimePermissions;

@RuntimePermissions
public class MainActivity extends ReactActivity implements UpdateDialog.CancleCallBack, UpdateDialog.EnsureCallBack{

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
        if(forceLoading != null && forceLoading.isUpdate){
            UpdateDialog.getFragment("").show(getFragmentManager(), "");
        }
    }


    @Override
    public void cancleCallBack() {
        ForceLoading forceLoading = MainApplication.getInstance().needUpdate();
        forceLoading.isUpdate = false;
    }

    @Override
    public void ensureCallBack() {
        ForceLoading forceLoading = MainApplication.getInstance().needUpdate();
        forceLoading.isUpdate = false;
        MainActivity.this
                .getSharedPreferences("kuaiCheCaiFu", Context.MODE_PRIVATE)
                .edit()
                .putString(NativeConstant.JS_VERSION_NAME, forceLoading.version)
                .commit();
        Intent intent = new Intent(MainActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
        //清除RN，重新加载后会选择其他JS版本
        MainApplication.getInstance().getReactNativeHost().clear();
    }
}
