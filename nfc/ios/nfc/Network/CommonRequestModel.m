//
//  CommonRequestModel.m
//  keluLive
//
//  Created by mac on 16/8/12.
//  Copyright © 2016年 desunire. All rights reserved.
//

#import "CommonRequestModel.h"

@implementation CommonRequestModel



/**
 *  刷新accessToken
 user/token/{refreshToken}
 phone 登录名（手机号）
 code 验证码 （默认：1234）
 
 */
+ (NSMutableDictionary *)AccessTokeb:(NSString *)reFreshToken
{
     NSMutableDictionary *params = [NSMutableDictionary dictionary];
     [params setObject:@"" forKey:@"refreshToken"];
     return [self baseGetInfoFacory:params];
}


/**
 *  用户注册
 /sso/user/register
 phone 登录名（手机号）
 code 验证码 （默认：1234）
 channelMark 渠道号
 */

+(NSMutableDictionary *)userRegister:(NSString *)phone password:(NSString *)password andCode:(NSString *)code andchannelMark:(NSString *)channelMark{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
       [params setObject:phone forKey:@"phone"];
        [params setObject:code forKey:@"verCode"];
      //  [params setObject:[password md5_32bit] forKey:@"password"];
        [params setObject:channelMark forKey:@"channel"];
    
    return [self baseGetInfoFacory:params];
    
}
+(NSMutableDictionary *)userchangepwd:(NSString *)phone andCode:(NSString *)verCode password:(NSString *)password
{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    [params setObject:phone forKey:@"phone"];
    [params setObject:verCode forKey:@"verCode"];
  //  [params setObject: [password md5_32bit]forKey:@"password"];
    return [self baseGetInfoFacory:params];
}
/**
 *  发送短信验证码
 msg/sms/sendCode
 phone 登录名（手机号）
 type 短信类型 1:注册  2:忘记密码
 
 */
+(NSMutableDictionary *)userSendphone:(NSString *)phone type:(NSString *)type
{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    [params setObject:phone forKey:@"phone"];
    [params setObject:type forKey:@"type"];
     return [self baseGetInfoFacory:params];
}
/**
 *  验证短信验证码
 msg/sms/verifyCode
 phone 登录名（手机号）
 type 短信类型 1:注册  2:忘记密码
 
 */
+(NSMutableDictionary *)userverifyCodephone:(NSString *)phone type:(NSString *)type code:(NSString *)code
{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    [params setObject:phone forKey:@"phone"];
    [params setObject:type forKey:@"type"];
     [params setObject:code forKey:@"code"];
    return [self baseGetInfoFacory:params];
}
/**
 *  文章类型
 cms/article/types
 */
+(NSMutableDictionary *)ShowaritclesType:(NSString *)parentId code:(NSString *)code
{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    [params setObject:parentId forKey:@"parentId"];
    [params setObject:code forKey:@"code"];
    return [self baseGetInfoFacory:params];
}

/**
 *  上传设备信息
 /sso/user/register
 phone 登录名（手机号）
 code 验证码 （默认：1234）
 channelMark 渠道号
 */
+ (NSMutableDictionary *)uploadPhoneInfo:(NSNumber *)type uid:(NSString *)uid uname:(NSString *)uname model:(NSString *)model osver:(NSString *)osver imei:(NSString *)imei imsi:(NSString*)imsi mac:(NSString *)mac udid:(NSString *)udid ip:(NSString *)ip devid:(NSString *)devid tokid:(NSString *)tokid plat:(NSString *)plat appver:(NSString *)appver appro:(NSString *)appro time:(NSString *)time{
    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    int typeint = [type intValue];
      NSNumber * Membership_Id =  [NSNumber numberWithInt:typeint];
    int platint = [plat intValue];
    NSNumber * platint_Id =  [NSNumber numberWithInt:platint];
    int approint = [appro intValue];
    NSNumber * approint_Id =  [NSNumber numberWithInt:approint];
    [params setObject:Membership_Id forKey:@"type"];
    [params setObject:uid forKey:@"uid"];
    [params setObject:uname forKey:@"uname"];
    [params setObject:model forKey:@"model"];
    [params setObject:osver forKey:@"osver"];
    [params setObject:imei forKey:@"imei"];
    [params setObject:imsi forKey:@"imsi"];
     [params setObject:mac forKey:@"mac"];
     [params setObject:udid forKey:@"udid"];
    [params setObject:ip forKey:@"ip"];
    [params setObject:devid forKey:@"devid"];
     [params setObject:tokid forKey:@"tokid"];
     [params setObject:platint_Id forKey:@"plat"];
     [params setObject:appver forKey:@"appver"];
     [params setObject:approint_Id forKey:@"appro"];
     [params setObject:time forKey:@"time"];
    
    return [self baseGetInfoFacory:params];
    
    
}

+ (NSMutableDictionary *)LoginWithAccount:(NSString *)account Password:(NSString *)password
                                    appid:(NSString *)appId appVer:(NSString *)appver key:(NSString *)key1 ts:(NSString *)ts deToken:(NSString *)deToken1 accessToken:(NSString *)accessToken
{

    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    
    
    [params setObject:account forKey:@"account"];
    [params setObject:password forKey:@"password"];

    return [self baseGetInfoFacory:params];
}


@end
