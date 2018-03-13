package com.nfc;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.dx.stock.ProxyBuilder;
import com.nfc.modle.PersonInfo;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * Created by tangdi on 3/12/18.
 */

public class ReportActivity extends AppCompatActivity {

    private WebView webView;

    private Button button;

    private ImageView back;

    private void checkPermission() {
        //检查权限（NEED_PERMISSION）是否被授权 PackageManager.PERMISSION_GRANTED表示同意授权
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            //用户已经拒绝过一次，再次弹出权限申请对话框需要给用户一个解释
            if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission
                    .WRITE_EXTERNAL_STORAGE)) {
                Toast.makeText(this, "请开通相关权限，否则无法正常使用本应用！", Toast.LENGTH_SHORT).show();
            }
            //申请权限
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 0);

        } else {
            Toast.makeText(this, "授权成功！", Toast.LENGTH_SHORT).show();
        }
    }

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
        setContentView(R.layout.report_activity);
        statuBar();
        checkPermission();
        PersonInfo personInfo = getIntent().getParcelableExtra("PERSONINFO");
        webView = (WebView) findViewById(R.id.web);
        button = (Button) findViewById(R.id.download);
        back = (ImageView) findViewById(R.id.back);
        WebSettings webSettings = webView.getSettings();

        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);        //缓存
        webSettings.setDomStorageEnabled(true);                    //使用localStorage则必须打开
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setSupportZoom(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);    //提高渲染优先级
        webSettings.setBlockNetworkImage(false);                           //把图片放在最后渲染
        // 把刚才的接口类注册到名为HTMLOUT的JavaScript接口

        // 必须在loadUrl之前设置WebViewClient
        webView.setWebViewClient(new WebViewClient()
        {
            @Override
            public void onPageFinished(WebView view, String url)
            {
                super.onPageFinished(view, url);
                //printPDFFile();
                //createPDf();


            }
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon)
            {

                super.onPageStarted(view, url, favicon);

            }
        });

        webView.loadUrl("http://www.kuaichecaifu.com/");

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkPermission();
                printPDFFile(webView);
            }
        });

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    File file = new File(Environment.getExternalStorageDirectory() + File.separator + "NFCreport" + File.separator + new Date().getTime() + ".pdf");
    File dexCacheFile;
    // 获取需要打印的webview适配器
    PrintDocumentAdapter printAdapter;
    PageRange[] ranges;
    ParcelFileDescriptor descriptor;
    /**
        a* @param webView
        */
    private void printPDFFile(WebView webView) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
/* android 5.0之后，出于对动态注入字节码安全性德考虑，已经不允许随意指定字节码的保存路径了，需要放在应用自己的包名文件夹下。*/
//新的创建DexMaker缓存目录的方式，直接通过context获取路径
            dexCacheFile = getDir("dex", 0);
            if (!dexCacheFile.exists()) {
                dexCacheFile.mkdir();
            }

            try {
                //创建待写入的PDF文件，pdfFilePath为自行指定的PDF文件路径
                if (file.exists()) {
                    file.delete();
                }
                file.createNewFile();
                descriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_WRITE);

                // 设置打印参数
                PrintAttributes attributes = new PrintAttributes.Builder()
                        .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                        .setResolution(new PrintAttributes.Resolution("id", Context.PRINT_SERVICE, 300, 300))
                        .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                        .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                        .build();
                //打印所有界面
                ranges = new PageRange[]{PageRange.ALL_PAGES};

                printAdapter = webView.createPrintDocumentAdapter();
                // 开始打印
                printAdapter.onStart();
                printAdapter.onLayout(attributes, attributes, new CancellationSignal(), getLayoutResultCallback(new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        if (method.getName().equals("onLayoutFinished")) {
                            // 监听到内部调用了onLayoutFinished()方法，即打印成功
                            onLayoutSuccess();
                        } else {
                            // 监听到打印失败或者取消了打印

                        }
                        return null;
                    }
                }, dexCacheFile.getAbsoluteFile()), new Bundle());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    private void onLayoutSuccess() throws IOException {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            PrintDocumentAdapter.WriteResultCallback callback = getWriteResultCallback(new InvocationHandler() {
                @Override
                public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
                    if (method.getName().equals("onWriteFinished")) {
                        Toast.makeText(ReportActivity.this,"Success",Toast.LENGTH_SHORT).show();
                        // PDF文件写入本地完成，导出成功
                        Log.e("onLayoutSuccess","onLayoutSuccess");
                    } else {
                        Toast.makeText(ReportActivity.this,"导出失败",Toast.LENGTH_SHORT).show();
                    }
                    return null;
                }
            }, dexCacheFile.getAbsoluteFile());
            //写入文件到本地
            printAdapter.onWrite(ranges, descriptor, new CancellationSignal(), callback);
        }else {
            Toast.makeText(ReportActivity.this,"不支持4.4.以下",Toast.LENGTH_SHORT).show();

        }
    }

    @SuppressLint("NewApi")
    public static PrintDocumentAdapter.LayoutResultCallback getLayoutResultCallback(InvocationHandler invocationHandler, File dexCacheDir) throws IOException {
        return ProxyBuilder.forClass(PrintDocumentAdapter.LayoutResultCallback.class)
                .dexCache(dexCacheDir)
                .handler(invocationHandler)
                .build();
    }

    @SuppressLint("NewApi")
    public static PrintDocumentAdapter.WriteResultCallback getWriteResultCallback(InvocationHandler invocationHandler, File dexCacheDir) throws IOException {
        return ProxyBuilder.forClass(PrintDocumentAdapter.WriteResultCallback.class)
                .dexCache(dexCacheDir)
                .handler(invocationHandler)
                .build();
    }

}
