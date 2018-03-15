package com.nfc.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.nfc.net.DownloadUntil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static com.nfc.net.DownloadUntil.CheckDetail;


/**
 * Created by tangdi on 1/8/18.
 */

public class ToolUtil {

    /**
     * 获取APK版本号
     * @param context
     * @return
     * @throws PackageManager.NameNotFoundException
     */
    public static String getAPKVersion(Context context) throws PackageManager.NameNotFoundException {
        PackageManager manager = context.getPackageManager();
        PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
        return info.versionName;
    }

    /**
     * 获取versionlist
     * @return
     */
    public static String[] getVersionList(){
        ArrayList<String> result = new ArrayList<>();
        File file = new File(NativeConstant.BASE_PATH);
        String[] fileList = file.list();
        Pattern pattern = Pattern.compile("^[0-9]{8}[a-zA-Z]?$");
        if(fileList != null){
            for(String filename : fileList){
                if(pattern.matcher(filename).find()){
                    result.add(filename);
                }
            }
        }

        String[] resultString = new String [result.size()];
        for(int i = 0; i < result.size(); i++){
            resultString[i] = result.get(i);
        }

        return resultString;
    }

    /**
     * 更新删除JS文件
     */
    public static boolean deleteAllJS(){
        File file = new File(NativeConstant.BASE_PATH);
        DownloadUntil.deleteFile(file);
        return true;
    }

    public static boolean deleteJS(String jsVersion){
        File file = new File(NativeConstant.BASE_PATH + jsVersion);
        DownloadUntil.deleteFile(file);
        return true;
    }

    /**
     * 加载JS版本决策, 若无合适的版本或本地版本出现问题，返回error，加载最后阶段会验证文件是否存在，不存在则加载内置版本
     * @param context
     * @return
     */
    public static String loadJSVersion(Context context){
        SharedPreferences sharedPreferences = context
                .getSharedPreferences(NativeConstant.SHARED_PREFERENCES, Context.MODE_PRIVATE);
        String jsVersion = sharedPreferences.getString(NativeConstant.JS_VERSION_NAME, "0");
        String loadVersion = null;
        if(jsVersion.equals(NativeConstant.VERSION_ERROR)){
            loadVersion = "error";
        }else if(jsVersion.equals(NativeConstant.PLATFROM_ERROR)){
            List<String> noActionVersion = getNoActionJS("");
            if(noActionVersion.isEmpty()){
                loadVersion = "error";
            }else{
                loadVersion = noActionVersion.get(0);
            }
        }else {
            //若服务器下发加载版本本地没有，表示强制升级，先加载之前的版本
            if(checkJSversion(jsVersion)){
                loadVersion = jsVersion;
            }else{
                List<String> noActionVersion = getNoActionJS("");
                if(noActionVersion.isEmpty()){
                    loadVersion = "error";
                }else{
                    loadVersion = noActionVersion.get(0);
                }

            }
        }
        return loadVersion;
    }

    /**
     * 决策版本
     * @param jsversion， 剔除某个版本决策，版本本身有问题，不参与决策
     * @return
     */
    public static String decisionVersion(String jsversion){
        List<String> list = getNoActionJS(jsversion);
        if(list == null){
            return "";
        }
        if(list.size() != 0){
            try {
                if(CheckDetail(list.get(0))){
                    return list.get(0);
                }else{
                    decisionVersion(list.get(0));
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                decisionVersion(list.get(0));
            }
        }
        return "";
    }

    /**
     * 剔除某个版本后取出JS列表中的非活动页面, 若无和是版本，则返回内置版本
     * @return
     */
    public static List<String> getNoActionJS(String jsversion){
        String[] jsList = getVersionList();
        ArrayList<String> noAction = new ArrayList<>();
        if(jsList.length != 0){
            for(String js : jsList){
                if(js.length() == 8 && !js.equals(jsversion)){
                    noAction.add(js);
                }
            }
            return noAction;
        }
        return noAction;
    }

    /**
     * 下发版本是否存在与版本列表中
     */
    public static boolean checkJSversion(String loadingVersion){
        String[] list = getVersionList();
        if(list.length == 0){
            return false;
        }
        for(String js : list){
            if(js.equals(loadingVersion)){
                return true;
            }
        }
        return false;
    }

    /**
     * 返回Assets文件的加载路径
     * @return
     */
    public static String assetsVersion(Context context){

        String jsVersion = null;

        try {
            String fileNames[] = context.getAssets().list(NativeConstant.JS_VERSION);
            if(fileNames.length == 1){
                jsVersion = fileNames[0];
            }else{
                for(String file : fileNames){
                    if(file.length() == 8){
                        jsVersion =  file;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsVersion;
    }



}
