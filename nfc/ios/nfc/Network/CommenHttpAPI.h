//
//  CommenHttpAPI.h
//  keluLive
//
//  Created by yuhao on 16/7/27.
//  Copyright © 2016年 yuhao. All rights reserved.
//

#import "BaseHttpSessionManager.h"
#import "NetUrl.h"
@interface CommenHttpAPI : BaseHttpSessionManager



/**
 *  登录
 */
+(void)klloginByPhoneandpwdWithParemeters:(nonnull id)parameters
                              Version:(NSString *_Nullable)version
                              accessToken:(NSString *_Nullable)accessToken
         progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress
         success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success
         failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  刷新accessToken
 */
+(void)klUpdateAccessTokenWithParemeters:(nonnull id)parameters
                                 Version:(NSString *_Nullable)version
                             accessToken:(NSString *_Nullable)accessToken
        progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress
        success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success
        failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  用户注册
 */
+(void)klRegistWithParemeters:(nonnull id)parameters
                   Version:(NSString *_Nullable)version
                   accessToken:(NSString *_Nullable)accessToken
       progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress
       success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success
      failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  用户修改密码
 */
+(void)klChangePwdWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  用户退出
 */
+(void)klExitWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  发送短信验证码
 */
+(void)klsendCodeWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 *  验证短信验证码
 */
+(void)klverifyCodeWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 * 横幅
 */

+(void)klgetBanner:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 * 文章列表
 */
+(void)klgetArticleList:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;

/**
 * 文章类型
 */
+(void)klgetArticeltypes:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;

/**
 * 文章详情
 */
+(void)klgetArticelDetail:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;

/**
 上传设备信息
 */
+(void)klgetServerPareWithParemeters:(nonnull id)parameters Version:(NSString *_Nullable)version uploadPhoneInfo:(NSNumber *_Nullable)type uid:(NSString *_Nullable)uid uname:(NSString *_Nullable)uname model:(NSString *_Nullable)model osver:(NSString *_Nullable)osver imei:(NSString *_Nullable)imei imsi:(NSString*_Nullable)imsi mac:(NSString *_Nullable)mac udid:(NSString *_Nullable)udid ip:(NSString *_Nullable)ip devid:(NSString *_Nullable)devid tokid:(NSString *_Nullable)tokid plat:(NSString *_Nullable)plat appver:(NSString *_Nullable)appver appro:(NSString *_Nullable)appro time:(NSString *_Nullable)time accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;

/**
 启动页
 */
+(void)klgetguidepageParemeters:(nonnull id)parameters os:(NSString *_Nullable)os prod:(NSString *_Nullable)prod res:(NSString *_Nullable)res  progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 app版本升级
 */
+(void)klUpgradeParemeters:(nonnull id)parameters version:(NSString *_Nullable)version channel:(NSString *_Nullable)channel os:(NSString *_Nullable)os jsVersionList:(NSString *_Nullable)jsVersionList progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
/**
 文章视频详情
 */
+(void)klGetPlayAuthWithVideoId:(NSString *_Nonnull)VideoId Paremeters:(nonnull id)parameters Version:(NSString *_Nullable)version accessToken:(NSString *_Nullable)accessToken progress:(nonnull void (^)(NSProgress * _Nonnull progress))uploadProgress success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseobject))success failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure_Nonnull_Nullable;
@end
