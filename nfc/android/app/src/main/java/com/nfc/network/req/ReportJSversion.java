package com.nfc.network.req;

/**
 * Created by tangdi on 1/8/18.
 */

public class ReportJSversion {
    public String Version;
    public String[] JSVersionList;
    public String channel;
    public int os;
    public ReportJSversion(){
        os = 2;
    }
}
