//
//  DeviceDataLibrery.h
//  ClientTest
//
//  Created by yuhao on 2017/8/24.
//  Copyright © 2017年 yuhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface DeviceDataLibrery : NSObject

+ (instancetype)sharedLibrery;
/** 获取设备名称 */
- (const NSString *)getDiviceName;
/** 获取设备电池容量，单位 mA 毫安 */
- (NSInteger)getBatteryCapacity;
/** 获取电池电压，单位 V 福特 */
- (CGFloat)getBatterVolocity;
/** 获取CPU处理器名称 */
- (const NSString *)getCPUProcessor;

@end
