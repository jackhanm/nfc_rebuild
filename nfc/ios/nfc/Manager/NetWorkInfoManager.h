//
//  NetWorkInfoManager.h
//  ClientTest
//
//  Created by yuhao on 2017/8/23.
//  Copyright © 2017年 yuhao. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NetWorkInfoManager : NSObject


+ (instancetype)sharedManager;

/** 获取ip */
- (NSString *)getDeviceIPAddresses;

- (NSString *)getIpAddressWIFI;
- (NSString *)getIpAddressCell;
/** 网络环境 */
- (void)getNetTypeType:(int)type;
@end
