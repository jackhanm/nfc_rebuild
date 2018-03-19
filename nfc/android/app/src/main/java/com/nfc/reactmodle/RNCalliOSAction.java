package com.nfc.reactmodle;

import android.content.Context;
import android.content.Intent;
import android.os.Environment;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.nfc.ReportActivity;
import com.nfc.ReportShowActivity;
import com.nfc.modle.PersonInfo;

import java.io.File;

/**
 * Created by tangdi on 3/12/18.
 */

public class RNCalliOSAction  extends ReactContextBaseJavaModule {

    private Context application;

    public RNCalliOSAction(ReactApplicationContext reactContext) {
        super(reactContext);
        application = reactContext.getApplicationContext();
    }


    @ReactMethod
    public void calliOSActionWithOneParams(ReadableMap data){
        Intent intent = new Intent(application, ReportActivity.class);
        //intent.putExtra("JSdata", val);
        //ReadableMap data = val.getMap("NativeMap");

        //企业社会代码
        PersonInfo personInfo = new PersonInfo();
        personInfo.companyName = data.getString("companyName");
        personInfo.companyId = data.getString("companyId");
                //省份证号码
        personInfo.id = data.getString("id");
                //姓名
        personInfo.name = data.getString("name");
                //车牌
        personInfo.carBrand = data.getString("carBrand");
                //车系
        personInfo.carVs = data.getString("carVs");
                //车型号
        personInfo.carModle = data.getString("carModle");
                //上市时间
        personInfo.markTime = data.getString("markTime");
                //汽车属地 二级地址，逗号隔开
        personInfo.carAdd = data.getString("carAdd");
                //车牌
        personInfo.carID = data.getString("carID");
                //行驶公里数
        personInfo.carMileage = data.getString("carMileage");
                //房屋地址，三级地址，逗号隔开
        personInfo.homeAdd = data.getString("homeAdd");
                //房屋名字
        personInfo.homeName = data.getString("homeName");
                //房屋类型
        personInfo.hometype = data.getString("hometype");
                //房屋面积
        personInfo.homeMeasure = data.getString("homeMeasure");
    /*-----------------------------------------*/
        personInfo.peoplequality = data.getString("peoplequality");
        personInfo.development = data.getString("development");
        personInfo.finance = data.getString("finance");
        personInfo.performance = data.getString("performance");
        personInfo.caseinfo = data.getString("caseinfo");
        personInfo.countrycompany = data.getString("countrycompany");
        personInfo.companyhaoche = data.getString("companyhaoche");
        personInfo.companyoverdue = data.getString("companyoverdue");
        personInfo.userage = data.getString("userage");
        personInfo.education = data.getString("education");
        personInfo.helathstate = data.getString("helathstate");
        personInfo.registered = data.getString("registered");
        personInfo.income = data.getString("income");
        personInfo.percentage = data.getString("percentage");
        personInfo.houseinfo = data.getString("houseinfo");
        personInfo.marriage = data.getString("marriage");
        personInfo.residence = data.getString("residence");
        personInfo.peoples = data.getString("peoples");
        personInfo.employer = data.getString("employer");
        personInfo.work = data.getString("work");
        personInfo.post = data.getString("post");
        personInfo.creditcard = data.getString("creditcard");
        personInfo.quota = data.getString("quota");
        personInfo.use_year = data.getString("use_year");
        personInfo.credit_lost = data.getString("credit_lost");
        personInfo.personalhaoche = data.getString("personalhaoche");
        personInfo.personaloverdue = data.getString("personaloverdue");
        personInfo.personalcarcard = data.getString("personalcarcard");
        personInfo.crimehistory = data.getString("crimehistory");
        personInfo.realestate = data.getString("realestate");
        personInfo.familyknow = data.getString("familyknow");

        personInfo.phoneNumber = data.getString("phoneNumber");
        personInfo.personTime = data.getString("personTime");
        personInfo.companyTime = data.getString("companyTime");
        personInfo.money = data.getString("money");
        personInfo.backTime = data.getString("backTime");

        personInfo.typeTag = data.getString("typeTag");

        intent.putExtra("PERSONINFO", personInfo);

        application.startActivity(intent);
    }

    @ReactMethod
    public void calliOStopdfView(String val){
        Intent intent = new Intent(application, ReportShowActivity.class);
        intent.putExtra("PATH", val);
        application.startActivity(intent);
    }

    @ReactMethod void calliOSActionWithCallBack(Callback callback){
        File file = new File(Environment.getExternalStorageDirectory() + File.separator + "NFCreport");
        String[] filelist = file.list();
        WritableArray array = Arguments.createArray();
        if(filelist == null){
            callback.invoke(array);
            return;
        }

        for (String files : filelist){
            String[] jsondata = files.split(",");
            String[] typelist = jsondata[2].split(";");
            String type = "";
            for(int i = 0; i < typelist.length; i++){
                type += typelist[i];
                type += ",";
            }
            WritableMap map = Arguments.createMap();
            map.putString("path", Environment.getExternalStorageDirectory() + File.separator + "NFCreport" + File.separator + files);
            map.putString("quertType", jsondata[0]);
            map.putString("queryKey", jsondata[1]);
            map.putString("reportType", type);
            String tmp = jsondata[jsondata.length - 1];
            String time = tmp.substring(0, tmp.length() - 4);
            map.putString("createTime", time.replace("-", "/"));
            array.pushMap(map);
        }
        callback.invoke(array);
    }

    @ReactMethod
    public void deletepdf(String val){
        File file = new File(val);
        if(file.exists()){
            file.delete();
        }
    }

    @Override
    public String getName() {
        return "RNCalliOSAction";
    }
}
