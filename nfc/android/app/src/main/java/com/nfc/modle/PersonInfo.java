package com.nfc.modle;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by tangdi on 3/13/18.
 */

public class PersonInfo implements Parcelable{

     //企业社会代码
    public String companyId = "";
     //企业名称
    public String companyName = "";
      //省份证号码
    public String id = "";
     //姓名
    public String name = "";
    //车牌
    public String carBrand = "";
     //车系
    public String carVs = "";
     //车型号
    public String carModle = "";
     //上市时间
    public String markTime = "";
     //汽车属地 二级地址，逗号隔开
    public String carAdd = "";
    //车牌
    public String carID = "";
     //行驶公里数
    public String carMileage = "";
     //房屋地址，三级地址，逗号隔开
    public String homeAdd = "";
     //房屋名字
    public String homeName = "";
     //房屋类型
    public String hometype = "";
     //房屋面积
    public String homeMeasure = "";
     /*-----------------------------------------*/
    public String peoplequality = "";
    public String development = "";
    public String finance = "";
    public String performance = "";
    public String caseinfo = "";
    public String countrycompany = "";
    public String companyhaoche = "";
    public String companyoverdue = "";
    public String userage = "";
    public String education = "";
    public String helathstate = "";
    public String registered = "";
    public String income = "";
    public String percentage = "";
    public String houseinfo = "";
    public String marriage = "";
    public String residence = "";
    public String peoples = "";
    public String employer = "";
    public String work = "";
    public String post = "";
    public String creditcard = "";
    public String quota = "";
    public String use_year = "";
    public String credit_lost = "";
    public String personalhaoche = "";
    public String personaloverdue = "";
    public String personalcarcard = "";
    public String crimehistory = "";
    public String realestate = "";
    public String familyknow = "";

    public String phoneNumber = "";
    public String personTime = "";
    public String companyTime = "";
    public String money = "";
    public String backTime = "";

    public String typeTag = "";

    protected PersonInfo(Parcel in) {
        companyId = in.readString();
        companyName = in.readString();
        id = in.readString();
        name = in.readString();
        carBrand = in.readString();
        carVs = in.readString();
        carModle = in.readString();
        markTime = in.readString();
        carAdd = in.readString();
        carID = in.readString();
        carMileage = in.readString();
        homeAdd = in.readString();
        homeName = in.readString();
        hometype = in.readString();
        homeMeasure = in.readString();
        peoplequality = in.readString();
        development = in.readString();
        finance = in.readString();
        performance = in.readString();
        caseinfo = in.readString();
        countrycompany = in.readString();
        companyhaoche = in.readString();
        companyoverdue = in.readString();
        userage = in.readString();
        education = in.readString();
        helathstate = in.readString();
        registered = in.readString();
        income = in.readString();
        percentage = in.readString();
        houseinfo = in.readString();
        marriage = in.readString();
        residence = in.readString();
        peoples = in.readString();
        employer = in.readString();
        work = in.readString();
        post = in.readString();
        creditcard = in.readString();
        quota = in.readString();
        use_year = in.readString();
        credit_lost = in.readString();
        personalhaoche = in.readString();
        personaloverdue = in.readString();
        personalcarcard = in.readString();
        crimehistory = in.readString();
        realestate = in.readString();
        familyknow = in.readString();
        phoneNumber = in.readString();
        personTime = in.readString();
        companyTime = in.readString();
        money = in.readString();
        backTime = in.readString();
        typeTag = in.readString();
    }

    public static final Creator<PersonInfo> CREATOR = new Creator<PersonInfo>() {
        @Override
        public PersonInfo createFromParcel(Parcel in) {
            return new PersonInfo(in);
        }

        @Override
        public PersonInfo[] newArray(int size) {
            return new PersonInfo[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(companyId);
        dest.writeString(companyName);
        dest.writeString(id);
        dest.writeString(name);
        dest.writeString(carBrand);
        dest.writeString(carVs);
        dest.writeString(carModle);
        dest.writeString(markTime);
        dest.writeString(carAdd);
        dest.writeString(carID);
        dest.writeString(carMileage);
        dest.writeString(homeAdd);
        dest.writeString(homeName);
        dest.writeString(hometype);
        dest.writeString(homeMeasure);
        dest.writeString(peoplequality);
        dest.writeString(development);
        dest.writeString(finance);
        dest.writeString(performance);
        dest.writeString(caseinfo);
        dest.writeString(countrycompany);
        dest.writeString(companyhaoche);
        dest.writeString(companyoverdue);
        dest.writeString(userage);
        dest.writeString(education);
        dest.writeString(helathstate);
        dest.writeString(registered);
        dest.writeString(income);
        dest.writeString(percentage);
        dest.writeString(houseinfo);
        dest.writeString(marriage);
        dest.writeString(residence);
        dest.writeString(peoples);
        dest.writeString(employer);
        dest.writeString(work);
        dest.writeString(post);
        dest.writeString(creditcard);
        dest.writeString(quota);
        dest.writeString(use_year);
        dest.writeString(credit_lost);
        dest.writeString(personalhaoche);
        dest.writeString(personaloverdue);
        dest.writeString(personalcarcard);
        dest.writeString(crimehistory);
        dest.writeString(realestate);
        dest.writeString(familyknow);
        dest.writeString(phoneNumber);
        dest.writeString(personTime);
        dest.writeString(companyTime);
        dest.writeString(money);
        dest.writeString(backTime);
        dest.writeString(typeTag);
    }

    public PersonInfo(){

    }
}
