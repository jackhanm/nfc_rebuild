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
        personInfo.companyhaoche = data.getString("countrycompany");
        personInfo.companyoverdue = data.getString("countrycompany");
        personInfo.userage = data.getString("countrycompany");
        personInfo.education = data.getString("countrycompany");
        personInfo.helathstate = data.getString("countrycompany");
        personInfo.registered = data.getString("countrycompany");
        personInfo.income = data.getString("countrycompany");
        personInfo.percentage = data.getString("countrycompany");
        personInfo.houseinfo = data.getString("countrycompany");
        personInfo.marriage = data.getString("countrycompany");
        personInfo.residence = data.getString("countrycompany");
        personInfo.peoples = data.getString("countrycompany");
        personInfo.employer = data.getString("countrycompany");
        personInfo.work = data.getString("countrycompany");
        personInfo.post = data.getString("countrycompany");
        personInfo.creditcard = data.getString("countrycompany");
        personInfo.quota = data.getString("countrycompany");
        personInfo.use_year = data.getString("countrycompany");
        personInfo.credit_lost = data.getString("countrycompany");
        personInfo.personalhaoche = data.getString("countrycompany");
        personInfo.personaloverdue = data.getString("countrycompany");
        personInfo.personalcarcard = data.getString("countrycompany");
        personInfo.crimehistory = data.getString("countrycompany");
        personInfo.realestate = data.getString("countrycompany");
        personInfo.familyknow = data.getString("countrycompany");

        personInfo.phoneNumber = data.getString("countrycompany");
        personInfo.personTime = data.getString("countrycompany");
        personInfo.companyTime = data.getString("countrycompany");
        personInfo.money = data.getString("countrycompany");
        personInfo.backTime = data.getString("countrycompany");

        intent.putExtra("PERSONINFO", personInfo);

        application.startActivity(intent);
    }

    @ReactMethod
    public void showPdf(String val){
        Intent intent = new Intent(application, ReportShowActivity.class);
        intent.putExtra("PATH", val);
        application.startActivity(intent);
    }

    @ReactMethod void callisoActionWidthCallBack(Callback callback){
        File file = new File(Environment.getExternalStorageDirectory() + File.separator + "NFCreport");
        //String[] filelist = file.list();
        String[] filelist = new String[]{"唐地,1;2;3;4,2018/02/03", "唐地,1;2;3;4,2018/02/04", "唐地,1;2;3;4,2018/02/05", "唐地,1;2;3;4,2018/02/06"};

        WritableArray array = Arguments.createArray();

        for (String files : filelist){
            String[] jsondata = files.split(",");
            String[] typelist = jsondata[1].split(";");
            String type = "";
            for(int i = 0; i < typelist.length; i++){
                type += typelist[i];
                type += ",";
            }
            WritableMap map = Arguments.createMap();
            map.putString("path", Environment.getExternalStorageDirectory() + File.separator + "NFCreport" + File.separator + files);
            map.putString("title", jsondata[0]);
            map.putString("name", "");
            map.putString("type", type);
            map.putString("time", jsondata[jsondata.length - 1]);
            array.pushMap(map);
        }
        callback.invoke(array);
    }

    @Override
    public String getName() {
        return "RNCalliOSAction";
    }
}
