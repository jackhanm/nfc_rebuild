package com.nfc.fragment;

import android.app.DialogFragment;
import android.app.DownloadManager;
import android.content.ContentResolver;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.nfc.R;
import com.nfc.net.DownloadUntil;
import com.nfc.util.ForceLoading;
import com.nfc.util.ToolUtil;

import java.util.Timer;
import java.util.TimerTask;


/**
 * Created by tangdi on 1/9/18.
 */

public class UpdateDialog extends DialogFragment {

    private CancleCallBack cancleCallBack;

    private EnsureCallBack ensureCallBack;

    private ContentResolver contentResolver;

    private ProgressBar progressBar;

    private TextView textView;

    private ForceLoading forceLoading;

    private static final String TAG = "UpdateDialog";

    private int checkCount = 0;


    private DownloadUntil.DownloadUntilObserver downloadUntilObserver;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState){

        forceLoading = getArguments().getParcelable("FORCELOADING");

        View view = inflater.inflate(R.layout.update_dialog, container, false);
        ((Button)view.findViewById(R.id.cancle)).setVisibility(View.GONE);

        ((Button)view.findViewById(R.id.ensure)).setVisibility(View.GONE);

        progressBar = (ProgressBar)view.findViewById(R.id.customProgressBar) ;
        textView = (TextView)view.findViewById(R.id.update_log);
        String updateLog = getArguments().getString("info");
        textView.setText("花费少许流量正在为您更新，请稍后....");

        getDialog().setCanceledOnTouchOutside(false);
        getTime();

        return view;
    }

    private void getTime(){
        final DownloadManager downloadManager = (DownloadManager)getActivity().getSystemService(Context.DOWNLOAD_SERVICE);

        final Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                int prosess = DownloadUntil.getProsess(downloadManager, forceLoading.id);
                Log.d(TAG, "=======================>" + prosess);
                if(prosess != Integer.MAX_VALUE){
                    if(progressBar != null){
                        progressBar.setProgress(prosess);
                    }
                    if(prosess == 100){
                        if(ensureCallBack != null) {
                            if(ToolUtil.checkJSversion(forceLoading.version)){
                                ensureCallBack.ensureCallBack();
                                timer.cancel();
                                dismiss();
                            }else{
                                checkCount++;
                            }
                            if(checkCount >= 3){
                                timer.cancel();
                                dismiss();
                            }
                        }else{
                            timer.cancel();
                            dismiss();
                        }
                    }
                }else{
                    progressBar.setVisibility(View.INVISIBLE);
                    timer.cancel();
                    dismiss();
                }
            }
        }, 0, 500);
    }

    public interface CancleCallBack{
        void cancleCallBack();
    }

    public interface EnsureCallBack{
        void ensureCallBack();
    }

    @Override
    public void onAttach(Context context){
        super.onAttach(context);
        cancleCallBack = (CancleCallBack)context;
        ensureCallBack = (EnsureCallBack)context;
    }

    public static DialogFragment getFragment(ForceLoading info){
        UpdateDialog updateDialog = new UpdateDialog();
        Bundle bundle = new Bundle();
        bundle.putParcelable("FORCELOADING", info);
        updateDialog.setArguments(bundle);
        updateDialog.setCancelable(false);
        return updateDialog;
    }

    @Override
    public void onDestroy(){
        super.onDestroy();
        DownloadUntil.unRegistObserver();
    }
}
