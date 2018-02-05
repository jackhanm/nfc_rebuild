//
//  BaseRequestParemsModel.h
//  keluLive
//
//  Created by mac on 16/8/12.
//  Copyright © 2016年 desunire. All rights reserved.
//

#import <Foundation/Foundation.h>


/**
 *  基础数据请求类型
 */
@interface BaseRequestParemsModel : NSObject


+ (NSMutableDictionary *)baseGetInfoFacory:(NSMutableDictionary *)params;
@end
