//
//  BaseHttpSessionManager.m
//  优汇圈商家
//
//  Created by yuhao on 2017/4/6.
//  Copyright © 2017年 uhqsh. All rights reserved.
//

#import "BaseHttpSessionManager.h"


@implementation BaseHttpSessionManager
static NSMutableArray *_allSessionTask;
static NSMutableArray *_allSessionFailTask;
 static BaseHttpSessionManager *_manager=nil;


+(instancetype)shareManger{
    static dispatch_once_t predite;
    dispatch_once(&predite, ^{
      _manager =  [BaseHttpSessionManager manager];
//        _manager=[self manager];
    _manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"application/x-json",@"text/html",@"text/plain", nil];
      _manager.requestSerializer=[AFJSONRequestSerializer serializer];
      [_manager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
      _manager.requestSerializer.timeoutInterval = 5.f;
      [_manager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
    _manager.responseSerializer = [AFJSONResponseSerializer serializer];
        //_manager.requestSerializer=[AFJSONRequestSerializer serializer];
        // _manager.responseSerializer = [AFHTTPResponseSerializer serializer];
//        _manager.requestSerializer=[AFHTTPRequestSerializer serializer];
        // 加上这行代码，https ssl 验证。
        //[_manager setSecurityPolicy:[self customSecurityPolicy]];
    });
    return _manager;


}

+(instancetype)shareManagerAddToken:(NSString *)version AccessToken:(NSString *)accessToken{
    
     _manager=[self shareManger];
    if (![accessToken isEqualToString:@"NOnedd"]) {
          [_manager.requestSerializer setValue:accessToken forHTTPHeaderField:@"accessToken"];
    }
    if (![version isEqualToString:@"NOnedd"]) {
         [_manager.requestSerializer setValue:version forHTTPHeaderField:@"version"];
    }
  
    return _manager;
    
    
}

/**
 存储着所有的请求task数组
 */
-(NSMutableArray *)allSessionTask {
    if (!_allSessionTask) {
        _allSessionTask = [[NSMutableArray alloc] init];
    }
    return _allSessionTask;
}
/**
 存储着所有的请求失败task数组
 */
-(NSMutableArray *)allSessionFailTask {
    if (!_allSessionFailTask) {
        _allSessionFailTask =[[NSMutableArray alloc] init];
    }
    return _allSessionFailTask;
}
-(NSURLSessionTask *)DefaultGET:(NSString *)URLString parameters:(id)parameters progress:(void (^)(NSProgress * _Nonnull))downloadProgress success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure{
    
    URLString = [URLString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
   NSURLSessionTask *sessionTask = [[BaseHttpSessionManager shareManger] GET:URLString parameters:parameters progress:downloadProgress success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        
        success(task,responseObject);
       [[self allSessionTask] removeObject:task];
        
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        
        failure(task,error);
        [[self allSessionTask] removeObject:task];
    }];
    
    // 添加sessionTask到数组
    sessionTask ? [[self allSessionTask] addObject:sessionTask] : nil ;
    
    return sessionTask;
    
}

-(NSURLSessionTask *)DefaultPOST:(NSString *)URLString parameters:(id)parameters progress:(void (^)(NSProgress * _Nonnull))uploadProgress success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure{
    
    
    URLString = [URLString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSLog(@"%@",URLString );
    
    
    NSURLSessionTask *sessionTask = [[BaseHttpSessionManager shareManger] POST:URLString parameters:parameters progress:uploadProgress success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
         [[self allSessionTask] removeObject:task];
        success(task,responseObject);
        
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
         [[self allSessionTask] removeObject:task];
        failure(task,error);
    }];
    // 添加最新的sessionTask到数组
    sessionTask ? [[self allSessionTask] addObject:sessionTask] : nil ;
    return sessionTask;

}
-(NSURLSessionTask *)DefaultGETAddTokentoken:(NSString *)token AccessToken:(NSString *)accessToken URLString:(NSString *)URLString parameters:(id)parameters progress:(void (^)(NSProgress * _Nonnull))downloadProgress success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure{
    
    URLString = [URLString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
   

    NSURLSessionTask *sessionTask =[[BaseHttpSessionManager shareManagerAddToken:token AccessToken:accessToken] GET:URLString parameters:parameters progress:downloadProgress success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        
        success(task,responseObject);
         [[self allSessionTask] removeObject:task];
        if (!klObjectisEmpty([responseObject objectForKey:@"code"]) ) {
            if ([[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10000"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10001"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10002"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10003"]) {
//                [[UserOperatemanager shareManager] updateAcctoken];
               
            }
        }else{
            
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
         [[self allSessionTask] removeObject:task];
        failure(task,error);
    }];
    
   
    
    // 添加最新的sessionTask到数组
    sessionTask ? [[self allSessionTask] addObject:sessionTask] : nil ;
    return sessionTask;
    
}

-(NSURLSessionTask *)DefaultPOSTAddTokentoken:(NSString *)token AccessToken:(NSString *)accessToken URLString:(NSString *)URLString parameters:(id)parameters progress:(void (^)(NSProgress * _Nonnull))uploadProgress success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure {
    
    
    URLString = [URLString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSURLSessionTask *sessionTask =[[BaseHttpSessionManager shareManagerAddToken:token AccessToken:accessToken] POST:URLString parameters:parameters progress:uploadProgress success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        
         [[self allSessionTask] removeObject:task];
        
        if (!klObjectisEmpty([responseObject objectForKey:@"code"]) ) {
            if ([[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10000"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10001"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10002"]||[[NSString stringWithFormat:@"%@",[responseObject objectForKey:@"code"]] isEqualToString:@"10003"]) {
                 sessionTask ? [[self allSessionFailTask] addObject:sessionTask]:nil;
                JKLog(@"刷新token，重新请求");
                [[UserOperatemanager shareManager]updateAcctokensuccess:^NSString * _Nullable(NSString *str) {
                    JKLog(@"%@",str);
                    return str;
                }];
                
                NSURLSessionTask *sessionTaskfail = [[BaseHttpSessionManager shareManagerAddToken:token AccessToken: [[UserOperatemanager shareManager] returnAccessToken:nil]] POST:URLString parameters:parameters progress:uploadProgress success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                    
                     success(task,responseObject);
                } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                    JKLog(@"%@",error);
                }];
                 sessionTaskfail ? [[self allSessionFailTask] addObject:sessionTaskfail] : nil ;
                _Isfail = YES;
                JKLog(@"%@%ld",URLString,[[self allSessionFailTask] count]);
               NSLog(@"当前线程---%@",[NSThread currentThread]);
                [self Repectrequest];
            }else{
                 success(task,responseObject);
            }
        }else{
            JKLog(@"111111");
        }
        
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        JKLog(@"%@", error);
      [[self allSessionTask] removeObject:task];
        failure(task,error);
    }];
    NSLog(@"当前线程---%@",[NSThread currentThread]);
    // 添加最新的sessionTask到数组
    sessionTask ? [[self allSessionTask] addObject:sessionTask] : nil ;
    return sessionTask;
}
-(NSURLSessionTask *)DefaultPUTAddTokentoken:(NSString *)token AccessToken:(NSString *)accessToken URLString:(NSString *)URLString parameters:(id)parameters progress:(void (^)(NSProgress * _Nonnull))downloadProgress success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure{
    
    URLString = [URLString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSLog(@"%@",URLString );
 
    NSURLSessionTask *sessionTask = [[BaseHttpSessionManager shareManagerAddToken:token AccessToken:accessToken] PUT:URLString parameters:parameters success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        [[self allSessionTask] removeObject:task];
        success(task,responseObject);
        
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        
        [[self allSessionTask] removeObject:task];
        failure(task,error);
    }];

    // 添加最新的sessionTask到数组
    sessionTask ? [[self allSessionTask] addObject:sessionTask] : nil ;
    return sessionTask;
    
}

-(void)Repectrequest{
    @synchronized(self) {
        [[self allSessionFailTask] enumerateObjectsUsingBlock:^(NSURLSessionTask  *_Nonnull task, NSUInteger idx, BOOL * _Nonnull stop) {
            [task resume];
        }];
//        [[self allSessionFailTask] removeAllObjects];
    }
}



-(void)cancelAllRequest {
    // 锁操作
    
    @synchronized(self) {
        [[self allSessionTask] enumerateObjectsUsingBlock:^(NSURLSessionTask  *_Nonnull task, NSUInteger idx, BOOL * _Nonnull stop) {
            [task cancel];
        }];
        [[self allSessionTask] removeAllObjects];
    }
}

-(void)cancelRequestWithURL:(NSString *)URL {
    if (!URL) { return; }
    @synchronized (self) {
        [[self allSessionTask] enumerateObjectsUsingBlock:^(NSURLSessionTask  *_Nonnull task, NSUInteger idx, BOOL * _Nonnull stop) {
            if ([task.currentRequest.URL.absoluteString hasPrefix:URL]) {
                [task cancel];
                [[self allSessionTask] removeObject:task];
                *stop = YES;
            }
        }];
    }
}
#pragma mark 缓存策略
- (void)setCacheBuyUrl:(NSString *)stringUrl responseObject:(id)responseObject
{
    if (true) {
        NSString *path = [NSString stringWithFormat:@"%ld.plist", (unsigned long)[stringUrl hash]];
        // 存储的沙盒路径
        NSString *path_doc = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject];
        // 归档
        [NSKeyedArchiver archiveRootObject:responseObject toFile:[path_doc stringByAppendingPathComponent:path]];
        
    }
    
    
}
-(id)getCacheByurl:(NSString *)stringUrl
{
    if ( true) {
        NSString *path = [NSString stringWithFormat:@"%ld.plist", (unsigned long)[stringUrl hash]];
        NSString *path_doc = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject];
        // 反归档
        id result = [NSKeyedUnarchiver unarchiveObjectWithFile:[path_doc stringByAppendingPathComponent:path]];
        return result;
        
    }
    return nil;
}
/**
 *  为链接添加token
 *
 *  @param url url description
 *
 *  @return return value description
 */
//+ (NSString *)addAccessToken:(NSString *)url{
//    
//    return [url stringByAppendingString:[NSString stringWithFormat:@"?access_token=%@",[[NSUserDefaults standardUserDefaults] objectForKey:ACCESSTOKEN]]];
//}




@end
