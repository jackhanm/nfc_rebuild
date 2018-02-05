//
//  CommenHttpAPI.m
//  keluLive
//
//  Created by yuhao on 16/7/27.
//  Copyright © 2016年 yuhao. All rights reserved.
//

#import "CommenHttpAPI.h"

@implementation CommenHttpAPI


/**
 *  用户登陆
 */
+(void)klloginByPhoneandpwdWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLogin_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}

/**
 *  刷新accessToken
 */
+(void)klUpdateAccessTokenWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *  refreshtoken= [[UserOperatemanager shareManager] returnRefreshToken:nil];
    NSString *Str = [NSString stringWithFormat:@"%@/%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLUpdateAccessToken_v_1_0],refreshtoken,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] PUT:Str parameters:parameters success:success failure:failure];
}
/**
 *  用户注册
 */
+(void)klRegistWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLRegist_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}
/**
 *  用户修改密码
 */
+(void)klChangePwdWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLchangePWd_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] PUT:Str parameters:parameters success:success failure:failure];
}
/**
 *  用户退出
 */
+(void)klExitWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLExit_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}

/**
 *  发送短信验证码
 */
+(void)klsendCodeWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
  
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLsendCode_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}
/**
 *  验证短信验证码
 */
+(void)klverifyCodeWithParemeters:(nonnull id)parameters Version:(NSString *)version accessToken:(NSString *)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps= [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLverifyCode_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}
/**
 * 横幅
 */

+(void)klgetBanner:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLgetbanner_v_1_0],parameters,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    JKLog(@"%@",Str);
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultGETAddTokentoken:version AccessToken:accessToken URLString:Str parameters:nil progress:uploadProgress success:success failure:failure];
}
/**
 * 文章列表
 */
+(void)klgetArticleList:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLgetartcleList_v_1_0],parameters,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    
    JKLog(@"%@",Str);
    JKLog(@"%@",key);
     [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultGETAddTokentoken:version AccessToken:accessToken URLString:Str parameters:nil progress:uploadProgress success:success failure:failure];
}


/**
 * 文章类型
 */
+(void)klgetArticeltypes:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@?&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLarticleTypes_v_1_0],ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultGETAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}

/**
 * 文章详情
 */
+(void)klgetArticelDetail:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *Str = [NSString stringWithFormat:@"%@%@?&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLarticleDetails_v_1_0],parameters,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
    [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultGETAddTokentoken:version AccessToken:accessToken URLString:Str parameters:parameters progress:uploadProgress success:success failure:failure];
}

/**
 上传设备信息
 */
+(void)klgetServerPareWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version uploadPhoneInfo:(NSNumber *)type uid:(NSString *)uid uname:(NSString *)uname model:(NSString *)model osver:(NSString *)osver imei:(NSString *)imei imsi:(NSString*)imsi mac:(NSString *)mac udid:(NSString *)udid ip:(NSString *)ip devid:(NSString *)devid tokid:(NSString *)tokid plat:(NSString *)plat appver:(NSString *)appver appro:(NSString *)appro time:(NSString *)time accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    int typeint = [type intValue];
    NSNumber * Membership_Id =  [NSNumber numberWithInt:typeint];
    int platint = [plat intValue];
    NSNumber * platint_Id =  [NSNumber numberWithInt:platint];
    int approint = [appro intValue];
    NSNumber * approint_Id =  [NSNumber numberWithInt:approint];
    NSString *str = [NSString stringWithFormat:@"%@?type=%@&uid=%@&uname=%@&model=%@&osver=%@&imei=%@&imsi=%@&mac=%@&udid=%@&ip=%@&devid=%@&tokid=%@&plat=%@&appver=%@&appro=%@&time=%@", [serverUrl2 stringByAppendingString:KLupLoadPhoneInfo_v_1_0],Membership_Id,uid,uname,model,osver,imei,imsi,mac,udid,ip,devid,tokid,platint_Id,appver,approint_Id,time];
       [[self shareManagerAddToken:NoNeedtoken AccessToken:NoNeedtoken] DefaultPOSTAddTokentoken:version AccessToken:accessToken URLString:str parameters:parameters progress:uploadProgress success:success failure:failure];
}
/**
 启动页
 */
+(void)klgetguidepageParemeters:(nonnull id)parameters os:(NSString *)os prod:(NSString *)prod res:(NSString *)res progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
{
  NSString *timeStamps         = [CTUUID getTimeStamp];
  NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
  NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
  NSString *Str = [NSString stringWithFormat:@"%@?os=%@&resolution=%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl2 stringByAppendingString:KlAPPlanuchimage_v_1_0],os,prod,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
 

  JKLog(@"%@",Str);
    [[self shareManger] DefaultGET:Str parameters:nil progress:uploadProgress success:success failure:failure];
}
/**
 app版本升级
 */
+(void)klUpgradeParemeters:(nonnull id)parameters version:(NSString *)version channel:(NSString *)channel os:(NSString *)os jsVersionList:(NSString *)jsVersionList progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
//    NSString *Str= [version stringByReplacingOccurrencesOfString:@"." withString:@""];
//    int approint = [Str intValue];
//    NSNumber * approint_Id =  [NSNumber numberWithInt:approint];
  NSString *timeStamps         = [CTUUID getTimeStamp];
  NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
  NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
 
    NSString *str = [NSString stringWithFormat:@"%@%@?version=%@&channel=%@&os=%@&jsVersionList=%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@", serverUrl2,KlUpdateversion_v_1_0,[[UserOperatemanager shareManager] last_run_version_of_application],channel,os,jsVersionList,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
//
  //mock 假数据
//  NSString *str = @"https://d954c7f3-c8f7-4e00-b2de-8602f57ba5e8.mock.pstmn.io/rnupdate/3";
  JKLog(@"%@",str);
    [[self shareManagerAddToken:APIVersion AccessToken:NoNeedtoken] DefaultGET:str parameters:nil progress:uploadProgress success:success failure:failure];
}

/**
 文章视频详情
 */
+(void)klGetPlayAuthWithVideoId:(NSString *)VideoId Paremeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure
{
    NSString *timeStamps         = [CTUUID getTimeStamp];
    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
    NSString *str = [NSString stringWithFormat:@"%@%@?&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@", [serverUrl stringByAppendingString:KlGetPlayAuth_v_1_0],VideoId,ASConfigAPPID,[key do16MD5],timeStamps,deToken,[[UserOperatemanager shareManager] last_run_version_of_application]];
   [[self shareManagerAddToken:APIVersion AccessToken:accessToken] DefaultGETAddTokentoken:version AccessToken:accessToken URLString:str parameters:parameters progress:uploadProgress success:success failure:failure];
}






















@end
