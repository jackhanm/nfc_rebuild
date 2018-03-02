import {
    Dimensions,Platform
}from 'react-native'
module.exports ={
    serverUrl :"http://192.168.1.202:8901/kccf/",
    //方西岗
    serverUrl2 : "http://192.168.1.234:8088/",
    //RAP
    serverUrl3 : "http://192.168.1.32:8888/mockjsdata/4",
//export const serverUrl @"172.16.253.15:8080/kccf/"
//李强哥
//export const serverUrl @"http://172.16.253.15:8080/kccf/"
//export const serverUrl @"http:192.168.1.202:8080/"
//准生产外网
//外网测试
//准生产测试
//生产


//登录
  KLogin_v_1_0 :"user/login",
//刷新accessToken
    KLUpdateAccessToken_v_1_0 :"user/token",
//注册
     KLRegist_v_1_0 :"user/reg",
//修改密码
     KLchangePWd_v_1_0 :"user/updPwd",
//用户登出
     KLExit_v_1_0 :"user/logout",
//发送短信验证码
     KLsendCode_v_1_0 :"msg/sms/sendCode",
//验证短信验证码
    KLverifyCode_v_1_0 :"msg/sms/verifyCode",
//横幅
    KLgetbanner_v_1_0 :"content/banner",
//文章列表
    KLgetartcleList_v_1_0 :"content/article",
//文章类型
     KLarticleTypes_v_1_0 :"content/article/types",
//文章详情
     KLarticleDetails_v_1_0 :"content/article/",
//上传设备信息
     KLupLoadPhoneInfo_v_1_0 :"appdevice/collectingInfo",
//App启动页
    KlAPPlanuchimage_v_1_0 :"startup/",
//App版本升级
     KlUpdateversion_v_1_0 :"app/upgrade",
//文章视频详情
     KlGetPlayAuth_v_1_0 :"content/article/video/"



};

//
//开发

//测试环境

