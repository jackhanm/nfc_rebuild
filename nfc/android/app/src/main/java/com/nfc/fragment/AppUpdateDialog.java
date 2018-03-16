package com.nfc.fragment;

import android.app.DialogFragment;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.nfc.R;
import com.nfc.net.AppUpDateModle;
import com.nfc.network.Constant;
import com.nfc.util.AppUpdate;

import java.io.File;
import java.io.IOException;

/**
 * Created by tangdi on 3/16/18.
 */

public class AppUpdateDialog extends DialogFragment {

    private static final String TAG = "AppUpdateDialog";

    public interface AppUpdateCallBack{
        void appCancleCallBack();
        void appEnsureCallBack();
    }

    private AppUpdate appUpdate;

    private AppUpdateCallBack appUpdateCallBack;

    private ProgressBar progressBar;

    private TextView textView;

    private Button cancle, ensure;



    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState){

        appUpdate = getArguments().getParcelable("APPUPDATE");

        View view = inflater.inflate(R.layout.update_dialog, container, false);
        cancle = (Button)view.findViewById(R.id.cancle);
        cancle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(appUpdateCallBack != null){
                    appUpdateCallBack.appCancleCallBack();
                }
                dismiss();
            }
        });

        ensure = (Button)view.findViewById(R.id.ensure);

        ensure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(appUpdateCallBack != null){
                    appUpdateCallBack.appEnsureCallBack();
                    update();
                }
                //dismiss();
            }
        });

        if(appUpdate.forceUpgrade != 0){
            cancle.setVisibility(View.GONE);
        }
        if(appUpdate.upgrade != 0){
            cancle.setVisibility(View.VISIBLE);
        }

        progressBar = (ProgressBar)view.findViewById(R.id.customProgressBar) ;
        textView = (TextView)view.findViewById(R.id.update_log);
        if(appUpdate.upgradeLog != null){
            textView.setText(appUpdate.upgradeLog);
        }
        getDialog().setCanceledOnTouchOutside(false);

        return view;
    }

    @Override
    public void onAttach(Context context){
        super.onAttach(context);
       appUpdateCallBack = (AppUpdateCallBack)context;
    }

    @Override
    public void onDestroy(){
        super.onDestroy();
        appUpdateCallBack = null;
    }




    public void update(){
        //APP更新
        AppUpDateModle.download(appUpdate.url, Constant.BASE_FILE, new AppUpDateModle.OnDownloadListener(){

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
                    Uri apkUrl = FileProvider.getUriForFile(getContext(), getContext().getApplicationContext().getPackageName() + ".provider", new File(Constant.DOWN_APK));
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
                progressBar.setProgress(progress);
                //Log.d(TAG, "==================" + progress + "==================");
            }

            @Override
            public void onDownloadFailed() {

            }
        });
    }

    public static DialogFragment instance(AppUpdate appUpdate){
        DialogFragment fragment = new AppUpdateDialog();
        Bundle bundle = new Bundle();
        bundle.putParcelable("APPUPDATE", appUpdate);
        fragment.setArguments(bundle);
        fragment.setCancelable(false);
        return fragment;
    }

}
