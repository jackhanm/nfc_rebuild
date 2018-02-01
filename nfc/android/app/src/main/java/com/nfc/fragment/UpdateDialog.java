package com.nfc.fragment;

import android.app.DialogFragment;
import android.content.ContentResolver;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.nfc.R;
import com.nfc.util.DownloadContentObserver;
import com.nfc.util.NativeConstant;


/**
 * Created by tangdi on 1/9/18.
 */

public class UpdateDialog extends DialogFragment {

    private CancleCallBack cancleCallBack;

    private EnsureCallBack ensureCallBack;

    private ContentResolver contentResolver;

    private Handler handler = new Handler(){

    };

    private SharedPreferences sharedPreferences;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState){
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
        if(!getArguments().getString("info").equals("")){
            ((TextView)view.findViewById(R.id.update_info))
                    .setText(getArguments().getString("info"));
        }
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
        sharedPreferences = context.getSharedPreferences("download", Context.MODE_PRIVATE);
        contentResolver = context.getContentResolver();
        DownloadContentObserver observer = new DownloadContentObserver(handler, context, sharedPreferences.getLong(NativeConstant.HOT_UPDATE_ID, 0));
        contentResolver.registerContentObserver(Uri.parse("file://" + NativeConstant.JS_PATCH_LOCAL_ZIP), true, observer);
    }

    public static DialogFragment getFragment(String info){
        UpdateDialog updateDialog = new UpdateDialog();
        Bundle bundle = new Bundle();
        bundle.putString("info", info);
        updateDialog.setArguments(bundle);
        return updateDialog;
    }
}
