//
//  EventEmitterManager.m
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "EventEmitterManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTLog.h>

@implementation EventEmitterManager{
  bool hasListeners;
}
RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
  static EventEmitterManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"HttpResult"];
}

// 在添加第一个监听函数时触发
-(void)startObserving {
  hasListeners = YES;
}
// 取消监听时触发
-(void)stopObserving {
  hasListeners = NO;
}

- (void)sendNoticeWithEventName:(NSString *)eventName Dict:(NSDictionary *)dict{
  if(hasListeners){
    [self sendEventWithName:eventName body:dict];
  }
}

@end
