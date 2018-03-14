package com.nfc;

import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.Toast;

import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener;
import com.github.barteksc.pdfviewer.listener.OnPageChangeListener;

import java.io.File;

/**
 * Created by tangdi on 3/13/18.
 */

public class ReportShowActivity extends AppCompatActivity {

    private String filePath;

    private PDFView pdfView;

    private ImageView back;


    private void statuBar(){
        if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) return;

        Window window = this.getWindow();

        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        window.setStatusBarColor(0xff1B52A2);

    }

    @Override
    public void onCreate(Bundle saveInstanceBundle){
        super.onCreate(saveInstanceBundle);
        setContentView(R.layout.show_pdf);
        statuBar();
        pdfView = (PDFView) findViewById(R.id.pdf_show);
        back = (ImageView) findViewById(R.id.back);
        filePath = getIntent().getStringExtra("PATH");
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        displayFromFile();
    }

    private void displayFromFile() {
        File pdf = new File(filePath);
        if(!pdf.exists()){
            Toast.makeText(this, "文件不存在，请重新下载", Toast.LENGTH_SHORT).show();
        }
        pdfView.fromFile(new File(filePath))
                .defaultPage(0)
                .onPageChange(new OnPageChangeListener() {
                    @Override
                    public void onPageChanged(int page, int pageCount) {

                    }
                })
                .enableAnnotationRendering(true)
                .onLoad(new OnLoadCompleteListener() {
                    @Override
                    public void loadComplete(int nbPages) {

                    }
                })
                .load();
    }
}
