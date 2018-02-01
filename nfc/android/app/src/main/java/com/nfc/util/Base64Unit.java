package com.nfc.util;

import android.util.Base64;

/**
 * Created by tangdi on 9/25/17.
 */

public class Base64Unit {
    public static String BASE64ToString(String value){
        return Base64.encodeToString(value.getBytes(), Base64.DEFAULT).replaceAll("\r|\n", "");
    }

    public static String BASE64ToString(byte[] value){
        return Base64.encodeToString(value, Base64.DEFAULT);
    }
}
