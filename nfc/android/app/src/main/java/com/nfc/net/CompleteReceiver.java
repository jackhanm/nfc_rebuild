package com.nfc.net;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.nfc.util.NativeConstant;


/**
 * Created by tangdi on 12/13/17.
 */

public class CompleteReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        long completeId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID,-1);
        SharedPreferences sharedPreferences = context.getSharedPreferences("download", context.MODE_PRIVATE);
        String version = sharedPreferences.getString(NativeConstant.UPDATE_VERSION + completeId, "0");
        String baseVersion = sharedPreferences.getString(NativeConstant.BASE_VERSION + completeId, "0");
        boolean isAll = false;
        if(baseVersion.equals("all")){
            isAll = true;
        }else{
            isAll = false;
        }
        long mDownLoadId = sharedPreferences.getLong(NativeConstant.HOT_UPDATE_ID + completeId, 0);
        if(completeId == mDownLoadId) {
            if(!version.equals("0")){
                if(isAll){
                    DownloadUntil.decompression(context, completeId);
                }else{
                    if(!baseVersion.equals("0")){
                        DownloadUntil.merge(context, completeId);
                    }
                }
            }
        }
    }
}
