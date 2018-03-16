package com.nfc.network.resp;


import com.nfc.util.NativeConstant;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tangdi on 1/8/18.
 * 应答加载某个JS版本
 */

public class ResponseJSEntity {
    public AppVersion appVersion;
    public List<RNVersion> rnVersionList;
    public List<String> deleteRnVersionList;
    public String loadRnVersion;
    public class RNVersion{
        public String versionUrl;
        public String incrementVersion;
        public String version;
        public String versionSign;
    }

    public class AppVersion{
        public String version;
        public int versionCode;
        public String upgradeLog;
        public int upgrade;
        public int forceUpgrade;
        public String url;
    }

    public ResponseJSEntity(){
        if(NativeConstant.ISDEBUG){
            appVersion = new AppVersion();
            appVersion.upgrade = 0;
            RNVersion rnVersion1 = new RNVersion();
            rnVersion1.versionUrl = "http://192.168.1.202:28080/rn/18050601.zip";
            rnVersion1.version = "18050601";
            rnVersion1.incrementVersion = "18050600";
            rnVersion1.versionSign = "4c8c4ef3d86b43c77256721395eb88c3";
            RNVersion rnVersion = new RNVersion();
            rnVersion.versionUrl = "http://192.168.1.202:28080/rn/18050600.zip";
            rnVersion.version = "18050600";
            rnVersion.incrementVersion = "all";
            rnVersion.versionSign = "f158f2d374b46c4610f63e461330dfda";
            RNVersion rnVersion2 = new RNVersion();
            rnVersion2.versionUrl = "http://192.168.1.202:28080/rn/18050602.zip";
            rnVersion2.version = "18050602";
            rnVersion2.versionSign = "5b18fd85aef904fffb6624ee7af14612";
            rnVersion2.incrementVersion = "all";
            rnVersionList = new ArrayList<>();
            //rnVersionList.add(rnVersion);
            //rnVersionList.add(rnVersion1);
            rnVersionList.add(rnVersion2);
            deleteRnVersionList = new ArrayList<>();
            //deleteVersionList.add("18050602");
            //deleteVersionList.add("18050601");
            loadRnVersion = "18050602";
        }
    }
}
