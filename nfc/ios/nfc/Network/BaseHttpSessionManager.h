//
//  BaseHttpSessionManager.h
//  优汇圈商家
//
//  Created by yuhao on 2017/4/6.
//  Copyright © 2017年 uhqsh. All rights reserved.
//

#import <AFNetworking/AFNetworking.h>

@interface BaseHttpSessionManager : AFHTTPSessionManager
@property(nonatomic, assign)BOOL Isfail;
+(nonnull instancetype)shareManger;
+(instancetype)shareManagerAddToken:(NSString *)version AccessToken:(NSString *)accessToken;
//基础请求方法 get
-(nonnull NSURLSessionTask *)DefaultGET:(nonnull NSString *)URLString
                             parameters:(nonnull id)parameters
           progress:(nonnull void (^)(NSProgress * _Nonnull))downloadProgress
           success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject))success
           failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull error))failure;
//基础请求方法 post
-(nonnull NSURLSessionTask *)DefaultPOST:(nonnull NSString *)URLString
                             parameters:(nonnull id)parameters
           progress:(nonnull void (^)(NSProgress * _Nonnull))uploadProgress
           success:(nonnull void (^)(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject))success
           failure:(nonnull void (^)(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error))failure;
//添加token get
-(NSURLSessionTask *_Nonnull)DefaultGETAddTokentoken:(NSString *_Nonnull)token
                                         AccessToken:(NSString *_Nullable)accessToken
                                         URLString:(NSString *_Nonnull)URLString
                                         parameters:(id _Nonnull )parameters
            progress:(void (^_Nonnull)(NSProgress * _Nonnull))downloadProgress
            success:(void (^_Nonnull)(NSURLSessionDataTask * _Nonnull, id _Nullable))success
            failure:(void (^_Nonnull)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure;
//添加token post
-(NSURLSessionTask *_Nonnull)DefaultPOSTAddTokentoken:(NSString *_Nonnull)token AccessToken:(NSString *_Nullable)accessToken URLString:(NSString *_Nonnull)URLString parameters:(id _Nonnull )parameters progress:(void (^_Nullable)(NSProgress * _Nonnull))uploadProgress success:(void (^_Nonnull)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^_Nonnull)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure ;
//添加token put
-(NSURLSessionTask *_Nullable)DefaultPUTAddTokentoken:(NSString *_Nullable)token AccessToken:(NSString *_Nullable)accessToken URLString:(NSString *_Nullable)URLString parameters:(id _Nullable )parameters progress:(void (^_Nullable)(NSProgress * _Nonnull))downloadProgress success:(void (^_Nullable)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^_Nullable)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure;

/**
 *  为链接添加token
 *
 *  @param url 地址
 *
 *  @return 字符串
 */
+ (nonnull NSString *)addAccessToken:(nonnull NSString *)url;
/**
 *  get方法专用 拼接链接信息
 *
 *  @param compose 带入信息字典
 *  @param url     链接地址
 *
 *  @return 拼接完成链接  xxxx/xxx?xxx=xxx&yy=yy&zzzz=zzzzz
 */
+ (nonnull NSString *)getUrlCompose:(nonnull NSMutableDictionary *)compose withUrl:(nonnull NSString *)url;

/**
 *  拼接特殊id
 *
 *  @param especid 信息id
 *
 *  @return 拼接字符串
 */
+ (nonnull NSString *)getUrl:(nonnull NSString *)url addEspecid:(nonnull NSString *)especid;



/***************   Get方法链接拼接方法 start  *************************/
+ (nonnull NSString *)getUrl:(nonnull NSString *)url addEspecid:(nonnull NSString *)especid needToken:(Boolean) need params:(nonnull id)params;


/***************   Post方法链接拼接方法 start  *************************/
+ (nonnull NSString *)postUrl:(nonnull NSString *)url addEspecid:(nonnull NSString *)especid needToken:(Boolean) need;


/**
 取消所有HTTP请求
 */
-(void)cancelAllRequest;




/**
 取消指定URL的HTTP请求
 */
-(void)cancelRequestWithURL:(NSString *)URL;





















@end
