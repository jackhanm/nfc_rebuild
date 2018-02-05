//
//  JKBundleHelper.m
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "JKBundleHelper.h"

@implementation JKBundleHelper
+(NSURL *)getBundlePath{
  //#ifdef  DEBUG
  //  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //  return jsCodeLocation;
  //#else
  //需要存放和读取的document路径
  //jsbundle地址
  NSString *jsCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"main.jsbundle"];
  //assets文件夹地址
  NSString *assetsCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"assets"];
  JKLog(@"%@========%@", jsCachePath,assetsCachePath);
  //判断JSBundle是否存在
  BOOL jsExist = [[NSFileManager defaultManager] fileExistsAtPath:jsCachePath];
  //如果已存在
  if(jsExist){
    NSLog(@"js已存在: %@",jsCachePath);
    //如果不存在
  }else{
    NSString *jsBundlePath = [[NSBundle mainBundle] pathForResource:@"main" ofType:@"jsbundle"];
    [[NSFileManager defaultManager] copyItemAtPath:jsBundlePath toPath:jsCachePath error:nil];
    NSLog(@"js已拷贝至Document: %@",jsCachePath);
  }
  
  //判断assets是否存在
  BOOL assetsExist = [[NSFileManager defaultManager] fileExistsAtPath:assetsCachePath];
  //如果已存在
  if(assetsExist){
    NSLog(@"assets已存在: %@",assetsCachePath);
    //如果不存在
  }else{
    NSString *assetsBundlePath = [[NSBundle mainBundle] pathForResource:@"assets" ofType:nil];
    [[NSFileManager defaultManager] copyItemAtPath:assetsBundlePath toPath:assetsCachePath error:nil];
    NSLog(@"assets已拷贝至Document: %@",assetsCachePath);
  }
  return [NSURL URLWithString:jsCachePath];
  //#endif
}

@end
