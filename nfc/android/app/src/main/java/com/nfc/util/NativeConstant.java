package com.nfc.util;

import android.os.Environment;

import com.nfc.MainApplication;

import java.io.File;

/**
 * Created by tangdi on 12/12/17.
 */

public class NativeConstant {

    public static final String APP_NAME_FILE = "NFC";

    public static final boolean ISDEBUG = false;

    //增量文件i名称
    public static final String INCREMENT_FILE = "index.txt";

    //清单文件名
    public static final String DETAILED = "Detail.json";

    //AssetsJS版本上级目录
    public static final String JS_VERSION = "JSversion";

    public static String IMEI = "";

    //版本大面积错误，加载内置版本
    public static final String VERSION_ERROR = "1";

    //服务器无应答，本地决策加载版本
    public static final String PLATFROM_ERROR = "0";

    //JS入口文件
    public static final  String JS_ENTY = "index.android.bundle";

    //下载基文件路径
    public static final String BASE_DOWN_PATH = Environment.getExternalStorageDirectory() + File.separator + APP_NAME_FILE + File.separator;

    //JS版本基路径
    public static final String BASE_PATH = MainApplication.getInstance().getFilesDir() + File.separator + APP_NAME_FILE + File.separator + JS_VERSION + File.separator;

    //DownLoad下载的数据包
    public static final String JS_PATCH_LOCAL_ZIP = BASE_DOWN_PATH;

    public static final String JS_BUNDLE_REMOTE_URL = "http://192.168.1.202:28080/rn/180203.zip";

    //更新文件解压临时路径
    public static final String JS_PATCH_LOCAL_FOLDER = MainApplication.getInstance().getFilesDir() + File.separator + APP_NAME_FILE + File.separator + "tmp";

    public static final String VERSION_CODE = "version";

    public static final String JS_VERSION_NAME = "JSversion";

    public static final String NEW_ID = "news_id";

    //基础版本
    public static final String BASE_VERSION = "baseVersion";

    //更新后版本号
    public static final String UPDATE_VERSION = "updateVersion";

    //是否全量
    public static final String IS_ALL = "isAll";

    //下载ID
    public static final String HOT_UPDATE_ID = "hot_update";

    //下载Zip包MD5
    public static final String ZIP_MD5 = "md5";

    public static final String SHARED_PREFERENCES = "NFC_APP";


}
