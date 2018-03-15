package com.nfc.network;

import android.os.Environment;

import com.nfc.util.NativeConstant;

import java.io.File;

/**
 * Created by tangdi on 9/22/17.
 */

public class Constant {

    //平台本地环境
    //private static final String DEV_URL = "http://172.16.253.15:8080/kccf/";

    //PostMan本地地址
    private static final String POST_MAN = "https://14b765a2-a486-4826-9c99-b281140b8d0b.mock.pstmn.io/";


    //Mock
    private static final String MOCK_BASE = "http://192.168.1.32:8888/mockjs/4/";


    //测试环境
    private static final String DEV_URL = "http://192.168.1.202:8901/kccf/";

    public static final String BASE_URL = MOCK_BASE;

    public static final String LOGING = "user/login";

    public static final String REFRESHTOKEN = "user/token/{refreshToken}";

    public static final String REGIST = "user/reg";

    public static final String LOGOUT = "user/logout";

    public static final String GET_CHECKCODE = "msg/sms/sendCode";

    public static final String CHECK_CODE = "msg/sms/verifyCode";

    public static final String CMS = "content/banner";

    public static final String ARTICLE_LIST = "content/article";

    public static final String ARTICLE_TYPE = "content/article/types";

    public static final String ARTICLE_DETAIL = "content/article/{id}";

    public static final String CHANGE_PASS = "user/updPwd";

    public static final String ARTICLE_VIDEO = "content/article/video/{videoId}";

    //公共平台测试baseURL
    private static final String PLAT_BASE_URL_2 = "http://192.168.1.32:8888/mockjsdata/7";

    public static final String BASE_URL_2 = PLAT_BASE_URL_2;

    public static final String STARTUP = BASE_URL_2 + "startup/os/{os}/prod/{prod}/res/{res}";

    public static final String COLLECTINGINFO = BASE_URL_2 + "appdevice/collectingInfo";

    //更新版本
    public static final String UPDATE_VERSION = BASE_URL_2 + "/app/anroidVersion";

    //启动页面
    public static final String START_PAGE = BASE_URL + "app/startup";


    /*============================================================================================*/

    public static final String APPID = "appId";

    public static final String APPVER = "appVer";

    public static final String KEY = "key";

    public static final String TS = "ts";

    public static final String DETOKEN = "deviceId";

    public static final String ACCESSTOKEN = "accessToken";

    public static final String REFRESH_TOKEN = "refreshToken";

    public static final String VERSION = "version";

    public static final String FRIST_ON = "first";

    public static final String USER_ID = "user_id";

    public static final String DOWN_ID = "downId";
    /*==================================图片缓存============================================*/
    public static final String BITMAP_CACH = Environment.getExternalStorageDirectory()
            + File.separator + "KCCFRN" + File.separator;

    /*============================================================================================*/
    //文件下载地址
    public static final String BASE_FILE = Environment.getExternalStorageDirectory() + File.separator
            + NativeConstant.APP_NAME_FILE;

    public static final String APK_FILE = "NFC.apk";

    public static final String DOWN_APK = BASE_FILE + File.separator + Constant.APK_FILE;

    public static final String MD5 = "MD5";

}
