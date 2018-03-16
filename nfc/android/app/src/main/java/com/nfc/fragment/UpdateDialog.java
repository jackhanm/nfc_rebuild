package com.nfc.fragment;

import android.app.DialogFragment;
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


    private DownloadUntil.DownloadUntilObserver downloadUntilObserver;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState){

        forceLoading = getArguments().getParcelable("FORCELOADING");

        View view = inflater.inflate(R.layout.update_dialog, container, false);
        ((Button)view.findViewById(R.id.cancle)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cancleCallBack.cancleCallBack();
                dismiss();
            }
        });

        ((Button)view.findViewById(R.id.ensure)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ensureCallBack.ensureCallBack();
                dismiss();
            }
        });

        progressBar = (ProgressBar)view.findViewById(R.id.customProgressBar) ;
        textView = (TextView)view.findViewById(R.id.update_log);
        String updateLog = getArguments().getString("info");
        if(updateLog != null){
            textView.setText(updateLog);
        }

        downloadUntilObserver = new DownloadUntil.DownloadUntilObserver() {
            @Override
            public void downloadProgress(int progress) {
                Log.d("UpdateDialog", String.valueOf(progress));
                progressBar.setProgress(progress);
            }
        };

        DownloadUntil.registObserver(downloadUntilObserver);

        getDialog().setCanceledOnTouchOutside(false);

        return view;
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
