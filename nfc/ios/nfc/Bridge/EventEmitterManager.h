//
//  EventEmitterManager.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface EventEmitterManager : RCTEventEmitter<RCTBridgeModule>
+ (id)allocWithZone:(NSZone *)zone;
- (void)sendNoticeWithEventName:(NSString *)eventName Dict:(NSDictionary *)dict;
@end
