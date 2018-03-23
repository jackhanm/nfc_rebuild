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

import org.json.JSONException;
import org.json.JSONObject;

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
    public void calliOSActionWithOneParams(ReadableMap data, String val, String type){
        Intent intent = new Intent(application, ReportActivity.class);
        //intent.putExtra("JSdata", val);
        //ReadableMap data = val.getMap("NativeMap");

        JSONObject house = new JSONObject();
        try {
            house.put("areaCode", data.getString("homeAdd"));
            house.put("houseType", data.getString("hometype"));
            house.put("name", data.getString("homeName"));
            house.put("queryType", data.getString("houseQueryType"));
            house.put("address", data.getString("houseAddStr"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JSONObject vehicle = new JSONObject();
        try {
            vehicle.put("areaCode", data.getString("carAdd"));
            vehicle.put("address", data.getString("carAddStr"));
            vehicle.put("brand", data.getString("carBrand"));
            vehicle.put("carModel", data.getString("carVs"));
            vehicle.put("carSeries", data.getString("carModle"));
            vehicle.put("mileage", data.getString("carMileage"));
            vehicle.put("registerYear", data.getString("markTime"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JSONObject result = new JSONObject();

        if(data.getString("queryType").equals("0")){
            try {
                result.put("ageBracket", data.getString("userage"));
                result.put("carValuation", data.getString("realestate"));
                result.put("certNo", data.getString("id"));
                result.put("companyNature", data.getString("employer"));
                result.put("creditCardAmount", data.getString("quota"));
                result.put("creditCardOverdue", data.getString("credit_lost"));
                result.put("creditCardYear",data.getString("use_year"));
                result.put("crimeRecord",data.getString("crimehistory"));
                result.put("degree",data.getString("education"));
                result.put("dependentsInformed",data.getString("familyknow"));
                result.put("feedPopulation",data.getString("peoples"));
                result.put("health",data.getString("helathstate"));
                result.put("houseSituation", data.getString("houseinfo"));
                result.put("investLoan",data.getString("personalhaoche"));
                result.put("licensePlate",data.getString("personalcarcard"));
                result.put("livingTime",data.getString("residence"));
                result.put("loanAmount",data.getString("money"));;
                result.put("loanDuration",data.getString("backTime"));
                result.put("marriage",data.getString("marriage"));
                result.put("monthCreditCardRate",data.getString("creditcard"));
                result.put("monthIncome",data.getString("income"));
                result.put("monthRepayPrecent",data.getString("percentage"));
                result.put("name",data.getString("name"));
                result.put("overdueNum",data.getString("personTime"));
                result.put("overdueRecord",data.getString("personaloverdue"));
                result.put("phone",data.getString("phoneNumber"));
                result.put("position",data.getString("post"));
                result.put("queryType",data.getString("PersonQueryType"));
                result.put("residence", data.getString("registered"));
                result.put("workYear",data.getString("work"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }else{
            try {
                result.put("caseInvolved", data.getString("caseinfo"));
                result.put("companyQuality", data.getString("peoplequality"));
                result.put("creditSystem", data.getString("countrycompany"));
                result.put("financialIndex", data.getString("finance"));
                result.put("investLoan", data.getString("personalhaoche"));
                result.put("loanAmount", data.getString("money"));
                result.put("loanDuration", data.getString("backTime"));
                result.put("name", data.getString("companyName"));
                result.put("orgCode", data.getString("companyId"));
                result.put("overdueNum", data.getString("personTime"));
                result.put("overdueRecord", data.getString("personaloverdue"));
                result.put("performanceIndex", data.getString("performance"));
                result.put("potentialIndex", data.getString("development"));
                result.put("queryType", data.getString("companyQueryType"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        try {
            result.put("house", house);
            result.put("vehicle", vehicle);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        intent.putExtra("PERSONINFO", result.toString());
        intent.putExtra("typeTag", data.getString("typeTag"));
        intent.putExtra("queryType", data.getString("queryType"));
        intent.putExtra("color", val);



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
