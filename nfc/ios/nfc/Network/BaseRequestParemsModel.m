//
//  BaseRequestParemsModel.m
//  keluLive
//
//  Created by mac on 16/8/12.
//  Copyright © 2016年 desunire. All rights reserved.
//

#import "BaseRequestParemsModel.h"

@implementation BaseRequestParemsModel

+ (NSMutableDictionary *)baseGetInfoFacory:(NSMutableDictionary *)params{
    
       return [self Des:[self setPostTotalParams:params]];
    
}

/**
 *  设置公用部分参数
 *
 *  @param parameters 原始params
 *
 *  @return 设置公共部分后的参数
 */
+ (NSMutableDictionary *)setPostTotalParams:(id)parameters{
    //    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    //    [params setObject:parameters forKey:@"param"];
    //    [params setValue:@"ios" forKey:@"platformType"];
    //    [params setObject:@"1.0" forKey:@"appVersion"];
    //    [params setObject:@"iphone" forKey:@"phoneModel"];
    
    return parameters;
}

/**
 *  加密参数
 *
 *  @param dic dic description
 *
 *  @return return value description
 */
+ (NSMutableDictionary *)Des:(NSMutableDictionary *)dic{
//    NSMutableDictionary *baseDic = [NSMutableDictionary dictionary];
//    NSString *timeStamps         = [CTUUID getTimeStamp];
//    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@",ASConfigAPPSecret,timeStamps];
//    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
//    [dic setValue :ASConfigAPPID forKey:@"appId"];
//    [dic setValue:[key do16MD5] forKey:@"key"];
//    [dic setValue:timeStamps forKey:@"ts"];
//    [dic setValue:deToken forKey:@"deToken"];
//    [dic setValue:ASConfigAPPVersion forKey:@"appVer"];
    
    return dic;
    
}
@end
