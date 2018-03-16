//
//  CTUUID.h
//  KuaiCheCaiFu
//
//  Created by AllenQin on 16/1/27.
//  Copyright © 2016年 ChangTian. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CTUUID : NSObject
//UUID
+(NSString *)getUUID;
//IDFA
+(NSString *)getIDFA;
//phone type
+(NSString *)getPhoneType;
//OS Version
+(NSString *)getPhoneVersion;

+(NSString *)getPhoneTime;
+(NSString *)getPhoneTimeToss;
//ip
+ (NSString *)getIPAddress;

+ (NSString *)getTimeStamp;

@end
