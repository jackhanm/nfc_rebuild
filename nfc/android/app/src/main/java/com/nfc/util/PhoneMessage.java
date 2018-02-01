package com.nfc.util;

import java.util.Date;

/**
 * Created by tangdi on 9/22/17.
 */

public class PhoneMessage {

    public static String SDK_VERSION = android.os.Build.VERSION.RELEASE;

    public static String FACTORY_NAME = android.os.Build.BRAND;

    public static String PHONE_VERSION = android.os.Build.MODEL;

    public static String IMEI = "";

    public static String IMSI = "";

    public static String MAC = "";

    public static String IP = "";

    public static String DEVICE_TOKEN = "";

    public static String DEVICE_ID = "";

    public static String UUID = "";

    public static int appVer;

    public static String accessToken = "";

    public static String refreshToken = "";

    public static void createUUID(){
        UUID = java.util.UUID.randomUUID().toString();
    }

    public static Long getTime(){
        return new Date().getTime();
    }

    private static String channelName = "";

    public static void setChannelName(String mChannelName){
        if(mChannelName == null || mChannelName.equals("")){
            channelName = "kuaichecaifu";
        }
    }

    public static String getChannelName(){
        return channelName = "qu001";
    }

}
