package com.nfc.net;

import android.Manifest;
import android.app.DownloadManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;

import com.nfc.util.MD5Util;
import com.nfc.util.NativeConstant;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by tangdi on 12/13/17.
 */

public class DownloadUntil {

    private static final String TAG = "DownloadUntil";

    private static DownloadUntilObserver downloadContentObserver;

    public interface DownloadUntilObserver{
        void downloadProgress(String message);
    }

    public static void registObserver(DownloadUntilObserver observer){
        downloadContentObserver = observer;
    }

    public static void unRegistObserver(){
        downloadContentObserver = null;
    }


    /*private static void query(final DownloadManager downloadManager) {

        final Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                DownloadManager.Query downloadQuery = new DownloadManager.Query();
                downloadQuery.setFilterById(MainApplication.DOWNLOAD_ID);
                Cursor cursor = downloadManager.query(downloadQuery);
                if (cursor != null && cursor.moveToFirst()) {
                    int fileName = cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);
                    int fileUri = cursor.getColumnIndex(DownloadManager.COLUMN_URI);
                    String fn = cursor.getString(fileName);
                    String fu = cursor.getString(fileUri);

                    int totalSizeBytesIndex = cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES);
                    int bytesDownloadSoFarIndex = cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR);

                    // 下载的文件总大小
                    int totalSizeBytes = cursor.getInt(totalSizeBytesIndex);

                    // 截止目前已经下载的文件总大小
                    int bytesDownloadSoFar = cursor.getInt(bytesDownloadSoFarIndex);

                    Log.d("DownloadUntil",
                            "from " + fu + " 下载到本地 " + fn + " 文件总大小:" + totalSizeBytes + " 已经下载:" + bytesDownloadSoFar);

                    if(downloadContentObserver != null){
                        if(fn != null){
                            int progress = (int)((float) bytesDownloadSoFar / (float) totalSizeBytes * 100);
                            downloadContentObserver.downloadProgress(progress);
                        }
                    }
                    if(totalSizeBytes == bytesDownloadSoFar){
                        cursor.close();
                        timer.cancel();
                    }
                }
            }
        }, 0, 500);
    }*/

    public static int getProsess(DownloadManager downloadManager, Long id){
        DownloadManager.Query downloadQuery = new DownloadManager.Query();
        downloadQuery.setFilterById(id);
        Cursor cursor = downloadManager.query(downloadQuery);
        if (cursor != null && cursor.moveToFirst()) {
            int fileName = cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);
            int fileUri = cursor.getColumnIndex(DownloadManager.COLUMN_URI);
            String fn = cursor.getString(fileName);
            String fu = cursor.getString(fileUri);

            int totalSizeBytesIndex = cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES);
            int bytesDownloadSoFarIndex = cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR);

            // 下载的文件总大小
            int totalSizeBytes = cursor.getInt(totalSizeBytesIndex);

            // 截止目前已经下载的文件总大小
            int bytesDownloadSoFar = cursor.getInt(bytesDownloadSoFarIndex);

            Log.d("DownloadUntil",
                    "from " + fu + " 下载到本地 " + fn + " 文件总大小:" + totalSizeBytes + " 已经下载:" + bytesDownloadSoFar);
            return (int)((float) bytesDownloadSoFar / (float) totalSizeBytes * 100);
        }
        return Integer.MAX_VALUE;
    }


    public static Long downLoadBundle(Context context, String updateVersion, String baseVersion, String url, String md5) {
        File zipfile;
        // 1.检查是否存在pat压缩包,存在则删除
        zipfile = new File(NativeConstant.JS_PATCH_LOCAL_ZIP + updateVersion + ".zip");
        if (zipfile != null && zipfile.exists()) {
            zipfile.delete();
        }
        // 2.下载
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Request request = new DownloadManager
                .Request(Uri.parse(url));
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN);
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://" + NativeConstant.JS_PATCH_LOCAL_ZIP + updateVersion + ".zip"));
        SharedPreferences.Editor editor = context.getSharedPreferences("download", context.MODE_PRIVATE).edit();
        long id = downloadManager.enqueue(request);
        editor.putLong(NativeConstant.HOT_UPDATE_ID + id, id);
        editor.putString(NativeConstant.UPDATE_VERSION + id, updateVersion);
        editor.putString(NativeConstant.BASE_VERSION + id, baseVersion);
        editor.putString(NativeConstant.ZIP_MD5 + id, md5);
        editor.commit();

        //query(downloadManager);
        return id;
    }

    public static void decompression(final Context context, final long completeId) {


        new Thread(new Runnable() {
            @Override
            public void run() {

                SharedPreferences sharedPreferences = context.getSharedPreferences("download", context.MODE_PRIVATE);
                String jsVersion = sharedPreferences.getString(NativeConstant.UPDATE_VERSION + completeId, "0");
                String md5 = sharedPreferences.getString(NativeConstant.ZIP_MD5 + completeId, "0");

                SharedPreferences.Editor editor = sharedPreferences.edit();

                Log.d(TAG, "===================================\n" + jsVersion + "下载完成\n" + "===================================");
                if(downloadContentObserver != null){
                    downloadContentObserver.downloadProgress("下载完成");
                }
                if(checkZip(md5, jsVersion)){
                    Log.d(TAG, "===================================\n" + jsVersion + "zip校验完成\n" + "===================================");
                    if(downloadContentObserver != null){
                        downloadContentObserver.downloadProgress("压缩包校验完成");
                    }
                    unzip(jsVersion);
                    File src = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + jsVersion);
                    File dest = new File(NativeConstant.BASE_PATH + jsVersion);
                    try {
                        copyFolder(src, dest);
                        if(!CheckDetail(jsVersion)){
                            deleteFile(new File(NativeConstant.BASE_PATH + jsVersion));
                            Log.d(TAG, "===================================\n" + jsVersion + "清单校验完成\n" + "===================================");
                            if(downloadContentObserver != null){
                                downloadContentObserver.downloadProgress("ERROR");
                            }
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                        Log.e(TAG, "===================================\n" + jsVersion + "出错了\n" + e.getMessage() + "\n" + "===================================");
                        if(downloadContentObserver != null){
                            downloadContentObserver.downloadProgress("ERROR");
                        }
                        deleteFile(new File(NativeConstant.BASE_PATH + jsVersion));
                        deleteFile(src);
                    }
                    deleteFile(src);
                }else{
                    if(downloadContentObserver != null){
                        downloadContentObserver.downloadProgress("ERROR");
                    }
                }
                File file = new File(NativeConstant.JS_PATCH_LOCAL_ZIP + jsVersion + ".zip");
                file.delete();
                editor.remove(NativeConstant.UPDATE_VERSION + completeId);
                editor.remove(NativeConstant.ZIP_MD5 + completeId);
                editor.remove(NativeConstant.BASE_VERSION + completeId);
                editor.remove(NativeConstant.HOT_UPDATE_ID + completeId);
                editor.commit();
                if(downloadContentObserver != null){
                    downloadContentObserver.downloadProgress("SUCCESS");
                }
            }
        }).start();
    }

    public static void merge(final Context context, final long completeId){

        new Thread(new Runnable() {
            @Override
            public void run() {

                SharedPreferences sharedPreferences = context.getSharedPreferences("download", context.MODE_PRIVATE);
                String jsVersion = sharedPreferences.getString(NativeConstant.UPDATE_VERSION + completeId, "0");
                String md5 = sharedPreferences.getString(NativeConstant.ZIP_MD5 + completeId, "0");
                String baseVersion = sharedPreferences.getString(NativeConstant.BASE_VERSION + completeId, "0");

                SharedPreferences.Editor editor = sharedPreferences.edit();

                Log.d(TAG, "===================================\n" + jsVersion + "增量下载完成\n" + "===================================");
                if(downloadContentObserver != null){
                    downloadContentObserver.downloadProgress("下载完成");
                }
                if(checkZip(md5, jsVersion)){
                    Log.d(TAG, "===================================\n" + jsVersion + "zip增量MD5校验完成\n" + "===================================");
                    if(downloadContentObserver != null){
                        downloadContentObserver.downloadProgress("压缩包校验完成");
                    }
                    unzip(jsVersion);
                    Log.d(TAG, "===================================\n" + jsVersion + "zip增量解压完成\n" + "===================================");
                    if(downloadContentObserver != null){
                        downloadContentObserver.downloadProgress("解压完成");
                    }
                    File src = new File(NativeConstant.BASE_PATH + baseVersion);
                    File dest = new File(NativeConstant.BASE_PATH + "tmp" + jsVersion);
                    try {
                        copyFolder(src, dest);
                    } catch (IOException e) {
                        e.printStackTrace();
                        if(downloadContentObserver != null){
                            downloadContentObserver.downloadProgress("ERROR");
                        }
                    }
                    mergePatAndAsset(NativeConstant.BASE_PATH + "tmp" + jsVersion, jsVersion);
                    File file = new File(NativeConstant.BASE_PATH + "tmp" + jsVersion);
                    //重命名文件
                    try {
                        if(!CheckDetail("tmp" + jsVersion)){
                            deleteFile(new File(NativeConstant.BASE_PATH + "tmp" + jsVersion));
                            Log.d(TAG, "===================================\n" + jsVersion + "Detail文件校验失败\n" + "===================================");
                            if(downloadContentObserver != null){
                                downloadContentObserver.downloadProgress("ERROR");
                            }
                        }else{
                            boolean isSucess = file.renameTo(new File(NativeConstant.BASE_PATH + jsVersion));
                            if(isSucess){
                                Log.d(TAG, "===================================\n" + jsVersion + "重命名完成\n" + "===================================");
                            }
                        }
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                        Log.d(TAG, "===================================\n" + jsVersion + e.getMessage() + "===================================");
                        deleteFile(new File(NativeConstant.BASE_PATH + jsVersion));
                        if(downloadContentObserver != null){
                            downloadContentObserver.downloadProgress("ERROR");
                        }
                    }
                }else{
                    if(downloadContentObserver != null){
                        downloadContentObserver.downloadProgress("ERROR");
                    }
                }
                File file = new File(NativeConstant.JS_PATCH_LOCAL_ZIP + jsVersion + ".zip");
                file.delete();
                editor.remove(NativeConstant.UPDATE_VERSION + completeId);
                editor.remove(NativeConstant.ZIP_MD5 + completeId);
                editor.remove(NativeConstant.HOT_UPDATE_ID + completeId);
                editor.remove(NativeConstant.BASE_VERSION + completeId);
                editor.commit();
                if(downloadContentObserver != null){
                    downloadContentObserver.downloadProgress("SUCCESS");
                }
            }
        }).start();
    }

    /**
     * 解压下载文件
     */
    public static void unzip(String versionName){
        File file = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER);
        if(!file.exists()){
            file.mkdir();
        }
        try {
            FileInputStream fileInputStream = new FileInputStream(NativeConstant.JS_PATCH_LOCAL_ZIP + versionName + ".zip");
            ZipInputStream inZip = new ZipInputStream(fileInputStream);
            ZipEntry zipEntry;
            String szName;
            try {
                while((zipEntry = inZip.getNextEntry()) != null) {

                    szName = zipEntry.getName();
                    if(zipEntry.isDirectory()) {
                        szName = szName.substring(0,szName.length()-1);
                        File folder = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + szName);
                        if(!folder.exists()){
                            folder.mkdirs();
                        }
                    }else{
                        File file1 = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + szName);
                        if(!file1.getParentFile().exists()){
                            file1.getParentFile().mkdirs();
                        }
                        boolean s = file1.createNewFile();
                        FileOutputStream fos = new FileOutputStream(file1);
                        int len;
                        byte[] buffer = new byte[1024];

                        while((len = inZip.read(buffer)) != -1) {
                            fos.write(buffer, 0 , len);
                            fos.flush();
                        }

                        fos.close();
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            inZip.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 验证ZipMD5
     * @param md5
     * @return
     */
    private static boolean checkZip(String md5, String versionName){
        try {
            return md5.equals(MD5Util.getMD5(NativeConstant.JS_PATCH_LOCAL_ZIP + versionName + ".zip"));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }


    /**
     * 合并代码
     */
    private static void mergePatAndAsset(String jsPath, String versionName) {

        File file1 = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + versionName + File.separator + NativeConstant.INCREMENT_FILE);
        if(file1.exists()){
            String assetsBundle = readContentFromFile(jsPath + File.separator + NativeConstant.JS_ENTY);
            String patcheStr = readContentFromFile(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + versionName + File.separator + NativeConstant.INCREMENT_FILE);
            // 3.初始化 dmp
            diff_match_patch dmp = new diff_match_patch();
            // 4.转换pat
            LinkedList<diff_match_patch.Patch> pathes = (LinkedList<diff_match_patch.Patch>) dmp.patch_fromText(patcheStr);
            // 5.与assets目录下的bundle合并，生成新的bundle
            Object[] bundleArray = dmp.patch_apply(pathes,assetsBundle);
            // 6.保存新的bundle

            BufferedWriter bufferedWriter;
            try {
                bufferedWriter = new BufferedWriter(new FileWriter(new File(jsPath + File.separator + NativeConstant.JS_ENTY)));
                bufferedWriter.write(bundleArray[0].toString());
                bufferedWriter.close();
                //更新完毕，删除更新文件
                File file = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + versionName + File.separator + NativeConstant.INCREMENT_FILE);
                file.delete();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        copyResource(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + versionName, jsPath);
        //全部操作完成删除临时文件
        File file = new File(NativeConstant.JS_PATCH_LOCAL_FOLDER + File.separator + versionName);
        deleteFile(file);
    }


    //copy RN 文件
    public static void CopyRN(Context context){
        CopyAssets(context, "JSversion", NativeConstant.BASE_PATH);
    }

    /**
     * 拷贝Assets文件
     * @param context
     * @param oldPath
     * @param newPath
     */
    private static void CopyAssets(Context context, String oldPath, String newPath) {
        try {
            String fileNames[] = context.getAssets().list(oldPath);// 获取assets目录下的所有文件及目录名
            if (fileNames.length > 0) {// 如果是目录
                File file = new File(newPath);
                file.mkdirs();// 如果文件夹不存在，则递归
                for (String fileName : fileNames) {
                    CopyAssets(context, oldPath + "/" + fileName, newPath + "/" + fileName);
                }
            } else {// 如果是文件
                InputStream is = context.getAssets().open(oldPath);
                FileOutputStream fos = new FileOutputStream(new File(newPath));
                byte[] buffer = new byte[1024];
                int byteCount = 0;
                while ((byteCount = is.read(buffer)) != -1) {// 循环从输入流读取
                    // buffer字节
                    fos.write(buffer, 0, byteCount);// 将读取的输入流写入到输出流
                }
                fos.flush();// 刷新缓冲区
                is.close();
                fos.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 复制一个目录及其子目录、文件到另外一个目录
     * @param src
     * @param dest
     * @throws IOException
     */
    private static void copyFolder(File src, File dest) throws IOException {
        if (src.isDirectory()) {
            if (!dest.exists()) {
                dest.mkdir();
            }
            String files[] = src.list();
            for (String file : files) {
                File srcFile = new File(src, file);
                File destFile = new File(dest, file);
                // 递归复制
                copyFolder(srcFile, destFile);
            }
        } else {
            InputStream in = new FileInputStream(src);
            OutputStream out = new FileOutputStream(dest);

            byte[] buffer = new byte[1024];

            int length;

            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
            in.close();
            out.close();
        }
    }


    /**
     * 读取文件
     * @param fileName
     * @return
     */
    public static String readContentFromFile(String fileName) {
        StringBuilder strPatchCnt = new StringBuilder();

        BufferedReader bufferedReader;
        try {
            bufferedReader = new BufferedReader(new FileReader(new File(fileName)));
            String tempStr = "";
            while ((tempStr = bufferedReader.readLine()) != null) {

                strPatchCnt.append(tempStr);
                strPatchCnt.append("\n");
            }
            bufferedReader.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return strPatchCnt.toString();
    }


    /**
     * 权限控制
     * @param context
     * @param permission
     * @return
     */
    public static boolean checkPermission(Context context, String permission) {
        boolean result = false;
        if (Build.VERSION.SDK_INT >= 23) {
            try {
                Class<?> clazz = Class.forName("android.content.Context");
                Method method = clazz.getMethod("checkSelfPermission", String.class);
                int rest = (Integer) method.invoke(context, permission);
                if (rest == PackageManager.PERMISSION_GRANTED) {
                    result = true;
                } else {
                    result = false;
                }
            } catch (Exception e) {
                result = false;
            }
        } else {
            PackageManager pm = context.getPackageManager();
            if (pm.checkPermission(permission, context.getPackageName()) == PackageManager.PERMISSION_GRANTED) {
                result = true;
            }
        }
        return result;
    }
    public static String getDeviceInfo(Context context) {
        try {
            JSONObject json = new JSONObject();
            android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE);
            String device_id = null;
            if (checkPermission(context, Manifest.permission.READ_PHONE_STATE)) {
                device_id = tm.getDeviceId();
            }
            String mac = null;
            FileReader fstream = null;
            try {
                fstream = new FileReader("/sys/class/net/wlan0/address");
            } catch (FileNotFoundException e) {
                fstream = new FileReader("/sys/class/net/eth0/address");
            }
            BufferedReader in = null;
            if (fstream != null) {
                try {
                    in = new BufferedReader(fstream, 1024);
                    mac = in.readLine();
                } catch (IOException e) {
                } finally {
                    if (fstream != null) {
                        try {
                            fstream.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (in != null) {
                        try {
                            in.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            json.put("mac", mac);
            if (TextUtils.isEmpty(device_id)) {
                device_id = mac;
            }
            if (TextUtils.isEmpty(device_id)) {
                device_id = android.provider.Settings.Secure.getString(context.getContentResolver(),
                        android.provider.Settings.Secure.ANDROID_ID);
            }
            json.put("device_id", device_id);
            return json.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 拷贝文件
     * @param path
     * @param jsPath
     */
    public static void copyResource(String path, String jsPath){
        File file1=new File(path);
        File[] fs=file1.listFiles();
        File file2=new File(jsPath);
        if(!file2.exists()){
            file2.mkdirs();
        }
        for (File f : fs) {
            if(f.isFile()){
                fileCopy(f.getPath(),jsPath+ File.separator +f.getName()); //调用文件拷贝的方法
            }else if(f.isDirectory()){
                copyResource(f.getPath(),jsPath+ File.separator +f.getName());
            }
        }
    }

    /**
     * 文件拷贝的方法
     */
    private static void fileCopy(String src, String des) {

        InputStream br=null;
        OutputStream ps=null;

        try {
            br=new FileInputStream(new File(src));
            ps=new FileOutputStream(new File(des));
            byte[] bytes = new byte[1024];
            while((br.read(bytes)) > 0){
                ps.write(bytes);
            }

        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }finally{

            try {
                if(br!=null)  br.close();
                if(ps!=null)  ps.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }


    }

    /**
     * 删除文件
     * @param file
     */
    public static void deleteFile(File file) {
        if (file.exists()) {//判断文件是否存在
            if (file.isFile()) {//判断是否是文件
                file.delete();//删除文件
            } else if (file.isDirectory()) {//否则如果它是一个目录
                File[] files = file.listFiles();//声明目录下所有的文件 files[];
                for (int i = 0;i < files.length;i ++) {//遍历目录下所有的文件
                    deleteFile(files[i]);//把每个文件用这个方法进行迭代
                }
                file.delete();//删除文件夹
            }
        } else {
            System.out.println("所删除的文件不存在");
        }
    }

    /**
     *
     * @param jsVersion
     * @return
     */
    public static boolean CheckDetail(String jsVersion) throws FileNotFoundException {
       File file = new File(NativeConstant.BASE_PATH + jsVersion
               + File.separator + NativeConstant.DETAILED);
        String path = NativeConstant.BASE_PATH + jsVersion
                + File.separator;
        /*==========================================*/
        String[] debug = new File(path).list();
        /*==========================================*/

       InputStream is = new FileInputStream(file);
       InputStreamReader streamReader = new InputStreamReader(is);
       BufferedReader reader = new BufferedReader(streamReader);
       String line;
       StringBuilder stringBuilder = new StringBuilder();
       try {
               while ((line = reader.readLine()) != null) {
                       stringBuilder.append(line);
                   }
               reader.close();
               reader.close();
               is.close();
           } catch (IOException e) {
               e.printStackTrace();
                return false;
           }
       try {
                JSONObject jsonObject = new JSONObject(stringBuilder.toString());
                //Bundle文件验证
                String md5 = MD5Util.getMD5(path + NativeConstant.JS_ENTY);
                if(!jsonObject.getString("Bundle").equals(md5)){
                    return false;
                }
                JSONObject resource = jsonObject.getJSONObject("Resource");
                JSONArray drawablehdpi = resource.getJSONArray("drawable-hdpi");
                JSONArray drawablemdpi = resource.getJSONArray("drawable-mdpi");
                JSONArray drawablexhdpi = resource.getJSONArray("drawable-xhdpi");
                JSONArray drawablexxhdpi = resource.getJSONArray("drawable-xxhdpi");
                JSONArray drawablexxxhdpi = resource.getJSONArray("drawable-xxxhdpi");
                if(checkResource(drawablehdpi, path + "drawable-hdpi")
                        && checkResource(drawablemdpi, path + "drawable-mdpi")
                        && checkResource(drawablexhdpi, path + "drawable-xhdpi")
                        && checkResource(drawablexxhdpi, path + "drawable-xxhdpi")
                        && checkResource(drawablexxxhdpi, path + "drawable-xxxhdpi")){
                    return true;
                }else{
                    return false;
                }

           } catch (JSONException e) {
               e.printStackTrace();
                return false;
           } catch (NoSuchAlgorithmException e) {
           e.printStackTrace();
           return false;
       } catch (IOException e) {
           e.printStackTrace();
           return false;
       }
    }

    private static boolean checkResource(JSONArray jsonArray, String path) throws JSONException {
        File filedrawablehdpi = new File(path);
        List<String> drawablehdpilist = Arrays.asList(filedrawablehdpi.list());

        for(int i = 0; i < jsonArray.length(); i++){
            if(!drawablehdpilist.contains(jsonArray.getString(i))){
                return false;
            }
        }
        return true;
    }

}
