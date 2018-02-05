//
//  NetUrl.h
//  keluLive
//
//  Created by mac on 16/7/27.
//  Copyright © 2016年 desunire. All rights reserved.
//

#ifndef NetUrl_h
#define NetUrl_h

//trunk


//
//开发

//测试环境
#define serverUrl @"http://192.168.1.202:8901/kccf/"
//#define serverUrl2  @"http://192.168.1.234:8088/"
#define serverUrl2 @"http://192.168.1.32:8888/mockjsdata/4/"
//#define serverUrl2  @"http://172.16.255.102:8088/kccf"
//#define serverUrl @"172.16.253.15:8080/kccf/"
//李强哥
//#define serverUrl @"http://172.16.253.15:8080/kccf/"
//#define serverUrl @"http:192.168.1.202:8080/"
//准生产外网
//外网测试
//准生产测试
//生产





//登录
#define KLogin_v_1_0 @"user/login"
//刷新accessToken
#define KLUpdateAccessToken_v_1_0 @"user/token"
//注册
#define KLRegist_v_1_0 @"user/reg"
//修改密码
#define KLchangePWd_v_1_0 @"user/updPwd"
//用户登出
#define KLExit_v_1_0 @"user/logout"
//发送短信验证码
#define KLsendCode_v_1_0 @"msg/sms/sendCode"
//验证短信验证码
#define KLverifyCode_v_1_0 @"msg/sms/verifyCode"
//横幅
#define KLgetbanner_v_1_0 @"content/banner"
//文章列表
#define KLgetartcleList_v_1_0 @"content/article"
//文章类型
#define KLarticleTypes_v_1_0 @"content/article/types"
//文章详情
#define KLarticleDetails_v_1_0 @"content/article/"
//上传设备信息
#define KLupLoadPhoneInfo_v_1_0 @"appdevice/collectingInfo"
//App启动页
#define KlAPPlanuchimage_v_1_0 @"app/startup"
//App版本升级
#define KlUpdateversion_v_1_0 @"app/version"
//文章视频详情
#define KlGetPlayAuth_v_1_0 @"content/article/video/"






#endif /* NetUrl_h */
