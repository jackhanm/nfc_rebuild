import React,{Component} from 'react'
import MD5 from "react-native-md5"
// import moment from 'moment';
import {
    AppRegistry,Platform


} from 'react-native';
// import  DeviceInfo from 'react-native-device-info';
// import Base64 from 'crypto-js/enc-base64';
import {Toast} from '../../util/toast'
import {dataCache} from '../../util/network/cache'

/*
*  网络请求的工具类
 */
const basurl2 = "http://192.168.1.234:8088/"

const STARTUP = basurl2 + "startup/os/2/prod/3/res/2"

const appSecret = 'IxoYxdKw'

const salt = "!@##@!"

const APPID = 'a2'
const APPIDANROID = 'a1'
const APPVER = '1.0'
const APPVERANDROID = '1.0'
// let Buffer = require('buffer').Buffer

var {NativeModules}=require('react-native');

var reactDeviceModle = NativeModules.ReactDeviceModle;

var IMEI = '';

export default class NetUtils extends Component{



    //构造函数，默认的props，以及state 都可以在这里初始化了
    constructor(props){
        super(props);
    }

    static async getimei() {
        try {
            reactDeviceModle.getIMEI().then((msg)=>{
                IMEI = msg.IMEI;
            });
        } catch (e) {
            console.error(e);
        }
    }


    /**
     * 普通的get请求
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
     */
    static get(url,params,version,accessToken,IspubParm,callback){
        console.log('IMEI' + IMEI);
        //添加公共参数
        var newParams = this.getNewParams();//接口自身的规范，可以忽略

        var urlstr;
        if (IspubParm){
            urlstr = url+params+newParams;
        }else {
            urlstr = url+params;
        }

       console.log('请求'+urlstr);
        fetch(urlstr,{

            method:'get',

            headers:{
                'accessToken': accessToken,
                'version': version,
            }
        })
            .then((response) => {
                // if(response.ok){//如果相应码为200
                  return response.json(); //将字符串转换为json对象
                // }
            })
            .then((json) => {
                //根据接口规范在此判断是否成功，成功后则回调
                callback(json);

            }).catch(error => {
            console.log(error+'error');
            // ToastAndroid.show("netword error",ToastAndroid.SHORT);
        });
    };

    /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url
     * @param {*} service
     * @param {*} params
     * @param {*} callback
     */
    static post(url,service,params,callback){
        //添加公共参数
        var newParams = this.getNewParams(service,params);//接口自身的规范，可以忽略

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:newParams
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((json) => {
                if(json.code === "0"){
                    callback(json);
                }else{
                    ToastAndroid.show(json.resultDesc,ToastAndroid.SHORT);
                }
            }).catch(error => {
          //  alert(error);
            //ToastAndroid.show("netword error",ToastAndroid.SHORT);
        });
    };

    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url
     * @param {*} service
     * @param {*} jsonObj
     * @param {*} callback
     */
    static postJson(url,params,jsonObj,version,accessToken,IspubParm,callback){
      var newParams = this.getNewParams();//接口自身的规范，可以忽略

        var urlstr;
        if (IspubParm){
            urlstr = url+params+'?'+newParams;
        }else {
            urlstr = url+params;
        }
        console.log(urlstr);
        fetch(urlstr,{

            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8',
                'accessToken': accessToken,
                // 'version': version,
            },
             body:JSON.stringify(jsonObj),//json对象转换为string

        })
            .then((response) => {

                    return response.json();

            })
            .then((json) => {


                callback(json);
                //登陆成功保存用户信息
                if (params === '/user/login')
                if (json.code === '0'){
                    //登陆成功
                    dataCache(url, postJson, isCache)
                }




            }).catch(error => {
            callback(error);

          //  ToastAndroid.show("netword error",ToastAndroid.SHORT);
        });
    };

    /**
     * 获取当前系统时间 yyyyMMddHHmmss
     */


    /**
     * 设置公共参数
     * @param {*} service  服务资源类型
     * @param {*} oldParams 参数 key-value形式的字符串
     * @return 新的参数
     */
    static getNewParams(service,oldParams){
        // var newParams = "";
        // var currentDate = this.getCurrentDate();
        // var MD5KEY = "XXXXXX";
        // var digestStr = MD5KEY+service+currentDate+MD5KEY;


        //
        // newParams = oldParams+"&timestamp="+currentDate+"&digest="+this.MD5(digestStr);
        //if(Platform.OS === 'android'){
            //if(IMEI === ''){
                //NetUtils.getimei();
            //}
        //}

        // var IPAdress ="172.16.255.100";
        // var IDFA = DeviceInfo.getUniqueID();
        // // var deToken = IPAdress+"@"+IDFA;
        // var deToken = new Buffer(IDFA).toString('base64');
        // var deTokenANDROID = new Buffer(DeviceInfo.getSystemVersion() + '|' + IMEI).toString('base64');
        // var dates = moment().toDate().getTime();
        // var key = "5IHqGdRB"+"!@##@!"+deToken+dates;
        // var keyANDROID = 'IxoYxdKw'+"!@##@!"+deTokenANDROID+dates;
        // var md5key1 = this.MD5(key);
        // var md5key1ANDROID = this.MD5(keyANDROID);
        // var md4key2 = md5key1.substr(8,16);
        // var md4key2ANDROID = md5key1ANDROID.substr(8,16);

        // console.log(key);
        // console.log(deToken);
        // console.log(md5key1);
        // console.log(dates);
        // if (Platform.OS === 'ios'){
        //     newParams= "&appId="+APPID+"&key="+md4key2+"&ts="+dates+"&deviceId="+deToken+"&appVer="+APPVER
        // }else {
        //     newParams="&appId="+APPIDANROID+"&key="+md4key2ANDROID+"&ts="+dates+"&deviceId="+deTokenANDROID+"&appVer="+APPVERANDROID
        // }


        return "";
    };

    /**
     * 字符串加密
     * @param {*} str
     */
    static MD5(str){
        return MD5.hex_md5(str);
    };


    /**
     * 获取当前系统时间 yyyyMMddHH
     */
    static getCurrentDateFormat(){
        var space = "";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }
        var time = years+space+months+space+days;
        return time;
    };
}



