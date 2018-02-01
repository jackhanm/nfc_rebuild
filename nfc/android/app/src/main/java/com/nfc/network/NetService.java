package com.nfc.network;

import android.util.Log;

import com.nfc.network.req.ReportJSversion;
import com.nfc.network.resp.ArticeDetailEntity;
import com.nfc.network.resp.ResponseJSEntity;
import com.nfc.network.resp.StartPageEntity;
import com.nfc.network.resp.VideoDetailEntity;
import com.nfc.util.Base64Unit;
import com.nfc.util.MD5Util;
import com.nfc.util.PhoneMessage;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by tangdi on 12/22/17.
 */

public class NetService {
    NetWorkFactory netWorkFactory = null;

    private NetService(NetWorkFactory netWorkFactory){
        this.netWorkFactory = netWorkFactory;
    }

    public static NetService _instance = null;

    public static NetService getInstance(NetWorkFactory netWorkFactory){
        if(_instance == null){
            _instance = new NetService(netWorkFactory);
        }
        return _instance;
    }

    public static Map<String, String> bodyMap(){
        Map<String, String> map = new HashMap<>();
        map.put(Constant.APPID, EnvironmentalData.appId);
        map.put(Constant.APPVER, String.valueOf(PhoneMessage.appVer));
        map.put(Constant.DETOKEN, Base64Unit.BASE64ToString(PhoneMessage.SDK_VERSION + "|" + PhoneMessage.IMEI));
        Long time = PhoneMessage.getTime();
        Log.d("TAG", EnvironmentalData.appSecret + EnvironmentalData.salt
                + map.get(Constant.DETOKEN) + String.valueOf(time));
        String key = MD5Util.encrypt(EnvironmentalData.appSecret + EnvironmentalData.salt
                + map.get(Constant.DETOKEN) + String.valueOf(time));
        map.put(Constant.KEY, key);
        map.put(Constant.TS, String.valueOf(time));
        return map;
    }

    public void getArtice(long id, String accsession, String version, HttpResultSubscriber<ArticeDetailEntity> subscriber){
        netWorkFactory.createService(NetAPI.class).getArtice(id, bodyMap(), accsession, version)
                .compose(TransformUtils.<HttpResult<ArticeDetailEntity>>defaultSchedulers())
                .subscribe(subscriber);
    }

    public void getVideo(String id, String accsession, String version, HttpResultSubscriber<VideoDetailEntity> subscriber){
        netWorkFactory.createService(NetAPI.class).getVideo(id, bodyMap(), accsession, version)
                .compose(TransformUtils.<HttpResult<VideoDetailEntity>>defaultSchedulers())
                .subscribe(subscriber);
    }

    public void getStartPage(String os, String resolution, HttpResultSubscriber<StartPageEntity> subscriber){
        netWorkFactory.createService(NetAPI.class).getStartPage(os, resolution, bodyMap())
                .compose(TransformUtils.<HttpResult<StartPageEntity>>defaultSchedulers())
                .subscribe(subscriber);
    }

    public void getUpdateInfo(ReportJSversion reportJSversion, HttpResultSubscriber<ResponseJSEntity> subscriber){
        StringBuilder stringBuilder = new StringBuilder();
        String versionList;
        if(reportJSversion.JSVersionList.length == 0 ){
            versionList = "";
        }else{
            for(String js : reportJSversion.JSVersionList){
                stringBuilder.append(js);
                stringBuilder.append(",");
            }
            versionList = stringBuilder.substring(0, stringBuilder.length() - 1);
        }
        netWorkFactory.createService(NetAPI.class).getUpDateInfo(bodyMap(), reportJSversion.os
                , reportJSversion.channel, reportJSversion.Version, versionList)
                .compose(TransformUtils.<HttpResult<ResponseJSEntity>>defaultSchedulers())
                .subscribe(subscriber);
    }
}
