//
//  CommonRequestModel.h
//  keluLive
//
//  Created by mac on 16/8/12.
//  Copyright © 2016年 desunire. All rights reserved.
//

#import "BaseRequestParemsModel.h"

@interface CommonRequestModel : BaseRequestParemsModel

/**
 *  上传设备信息
 phone 登录名（手机号）
 code 验证码 （默认：1234）
 channelMark 渠道号
 */
+ (NSMutableDictionary *)uploadPhoneInfo:(NSNumber *)type uid:(NSString *)uid uname:(NSString *)uname model:(NSString *)model osver:(NSString *)osver imei:(NSString *)imei imsi:(NSString*)imsi mac:(NSString *)mac udid:(NSString *)udid ip:(NSString *)ip devid:(NSString *)devid tokid:(NSString *)tokid plat:(NSString *)plat appver:(NSString *)appver appro:(NSString *)appro time:(NSString *)time;
/**
 *  登录
 url:      user/login
 account   string  账号 该值为手机号码、用户名其中一个;
 password  string 密码 Md5加密后 32位
 */

+ (NSMutableDictionary *)LoginWithAccount:(NSString *)account Password:(NSString *)password
                                    appid:(NSString *)appId appVer:(NSString *)appver key:(NSString *)key ts:(NSString *)ts deToken:(NSString *)deToken accessToken:(NSString *)accessToken;

/**
 *  刷新accessToken
 url:         user/token/{refreshToken}
 refreshToken string 登录接口返回的刷新token
 
 */
+ (NSMutableDictionary *)AccessTokeb:(NSString *)reFreshToken;

/**
 *  用户注册
 url:     /sso/user/register
 phone    string 电话号码
 verCode  string 手机验证码
 password string 密码Md5加密后
 channel  string 渠道(可不传)
 */

+(NSMutableDictionary *)userRegister:(NSString *)phone password:(NSString *)password andCode:(NSString *)code andchannelMark:(NSString *)channelMark;
/**
 *  用户修改密码
 url:     user/updPwd
 phone    string 登录名（手机号）
 verCode  string 验证码
 password string 密码
 */

+(NSMutableDictionary *)userchangepwd:(NSString *)phone andCode:(NSString *)verCode password:(NSString *)password  ;


/**
 *  发送短信验证码
 url:  msg/sms/sendCode
 phone string 登录名（手机号）
 type  string 短信类型 1:注册  2:忘记密码
 
 */
+(NSMutableDictionary *)userSendphone:(NSString *)phone type:(NSString *)type;

/**
 *  验证短信验证码
 url:  msg/sms/verifyCode
 phone string 登录名（手机号）
 type  string 短信类型 1:注册  2:忘记密码
 Code  string 验证码
 */
+(NSMutableDictionary *)userverifyCodephone:(NSString *)phone type:(NSString *)type code:(NSString *)code;
/**
 *  文章类型
 url: cms/article/types
 parentId int 父文章类型id 0则返回第一级类型
 code     string
 */
+(NSMutableDictionary *)ShowaritclesType:(NSString *)parentId code:(NSString *)code;
















@end
