/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "JKDownloadManager.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "JKpdfview.h"


@interface AppDelegate ()
@property (nonatomic,strong) RCTBridge *bridge;
@property (nonatomic, strong) UINavigationController *nav;
@property (nonatomic, strong)NSArray *jslistArr;
@property (nonatomic, strong)NSString *jslistStr;
@property (nonatomic, strong)NSDictionary *AppUpdateInfo;
@property (nonatomic, strong)NSArray *RnUpdateInfo;



@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  JKLog(@"%@",NSHomeDirectory());
 __block NSURL *jsCodeLocation;
 
  jsCodeLocation=[self getBundlePath];
  __block RCTRootView *rootView ;
 self.jslistArr =[NSMutableArray arrayWithArray:[self getJslist]] ;
#pragma mark 监听
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(OpenWebview:) name:@"OpenWebview" object:nil];
#if DEBUG
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"nfc"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.nav =[[UINavigationController alloc]initWithRootViewController:rootViewController];
  self.nav.navigationBarHidden=YES;
  self.window.rootViewController = self.nav;
  [self.window makeKeyAndVisible];
#else
  [self checkupdateSuccess:^(id  _Nullable responseobject) {
    
    JKLog(@"%@",responseobject);
    //原则 加载逻辑在前，更新逻辑在后
    //1 . 更新接口网络请求
    //2 遍历本地文件夹，判断是否存在可以加载的js文件，加载js
    //3 检查更新操作
    //    JKLog(@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"load"]);
    JKLog(@"%@",self.jslistArr);
    // 加载
    // 加载
    jsCodeLocation = [[JKRnupdateManage shareManager] bundlePathWithresponseobject:responseobject jsListArr:self.jslistArr];

    rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                           moduleName:@"nfc"
                                    initialProperties:nil
                                        launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
    nav.navigationBarHidden=YES;
    self.window.rootViewController = nav;
    [self.window makeKeyAndVisible];
    // 更新
    
    [[JKRnupdateManage shareManager]updateWithres:responseobject jsListArr:self.jslistArr];
    
    
  } failure:^(NSError * _Nonnull error) {
    if (!klObjectisEmpty([self getJslist])) {
     jsCodeLocation = [[JKRnupdateManage shareManager] bundlePathWithresponseobject:@"failuer" jsListArr:[self getJslist]];
    }else{
      jsCodeLocation =  [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    }
    
    
    rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                           moduleName:@"kuaichecaifuRn"
                                    initialProperties:nil
                                        launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
    nav.navigationBarHidden=YES;
    self.window.rootViewController = nav;
    [self.window makeKeyAndVisible];
  }];
  
#endif
  return YES;
}
- (void)OpenWebview:(NSNotification *)notification{
  
  NSLog(@"%@",notification);
  NSLog(@"---接收到通知---");
  JKpdfview *vc= [[JKpdfview alloc]init];
  [self.nav pushViewController:vc animated:YES];
  
  
}
-(void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)(void))completionHandler{
  NSLog(@"%s", __func__);
  [[JKDownloadSession downloadSession] addCompletionHandler:completionHandler identifier:identifier];
}
#pragma mark 检查更新
-(void)checkupdateSuccess:(nonnull void (^)(id _Nullable responseobject))success failure:(nonnull void (^)(NSError * _Nonnull error))failure{
  JKLog(@"%@",self.jslistStr);
  [CommenHttpAPI klUpgradeParemeters:nil version:AppCFversion channel:@"" os:@"1" jsVersionList:self.jslistStr progress:^(NSProgress * _Nonnull progress) {
    
  } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseobject) {
    
    success(responseobject);
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
    JKLog(@"%@",error);
    failure(error);
  }];
  
}
#pragma mark 获取本地js列表
-(NSMutableArray *)getJslist
{
  //jsversion文件夹地址
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSFileManager *manager =[NSFileManager defaultManager];
  BOOL jsversionExist = [manager fileExistsAtPath:jsversionCachePath];
  self.jslistArr = [NSMutableArray array];
  if (jsversionExist) {
    //js文件存在
    self.jslistArr =[manager contentsOfDirectoryAtPath:jsversionCachePath error:nil];
    JKLog(@"%@",self.jslistArr);
    NSString *str = @"";
    self.jslistStr = @"";
    for (int i = 0; i < self.jslistArr.count; i++) {
      if ( self.jslistArr.count == 1) {
        str = [self.jslistArr objectAtIndex:0];
        
      }else{
        if (i == 0) {
          if ([[self.jslistArr objectAtIndex:i] isEqualToString:@".DS_Store"]||[[self.jslistArr objectAtIndex:i] hasSuffix:@".zip"]) {
            str= [NSString stringWithFormat:@"%@",@""];
          }else{
            str= [NSString stringWithFormat:@"%@",[self.jslistArr objectAtIndex:i]];
          }
        }else{
          
          if ([[self.jslistArr objectAtIndex:i] isEqualToString:@".DS_Store"] ||[[self.jslistArr objectAtIndex:i] hasSuffix:@".zip"]) {
            
          }else{
            if ([[self.jslistArr objectAtIndex:i-1] isEqualToString:@".DS_Store"]||[[self.jslistArr objectAtIndex:i-1] hasSuffix:@".zip"]) {
              str= [NSString stringWithFormat:@"%@",[self.jslistArr objectAtIndex:i]];
            }else{
              str= [NSString stringWithFormat:@",%@",[self.jslistArr objectAtIndex:i]];
            }
            
          }
        }
        
        
      }
  
      self.jslistStr = [NSString stringWithFormat:@"%@%@",self.jslistStr,str];
      JKLog(@"%@",self.jslistStr);
    }
    
  }else{
    
    
  }
  return self.jslistArr;
}
#pragma mark 第一次打开拷贝bundle资源
-(NSURL *)getBundlePath{
  NSString *jsCachePath=@"";
  NSString *assetsCachePath=@"";
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  //判断assets是否存在
  BOOL jsversionExist = [[NSFileManager defaultManager] fileExistsAtPath:jsversionCachePath];
  //如果已存在
  if(jsversionExist){
    NSLog(@"jsversion已存在: %@",jsversionCachePath);
    //如果不存在
  }else{
    NSString *jsversionBundlePath = [[NSBundle mainBundle] pathForResource:@"jsversion" ofType:nil];

     [[NSFileManager defaultManager] copyItemAtPath:jsversionBundlePath toPath:jsversionCachePath error:nil];
  NSLog(@"jsversion已拷贝至Document: %@",jsversionCachePath);
      //jsbundle地址
  }

  NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent:@"18010700"];
  // jsCodeLocation = [NSURL URLWithString:txtPath];
  NSString *txtPath2 = [txtPath stringByAppendingPathComponent:@"main.jsbundle"];

  return [NSURL URLWithString:txtPath2];
  //#endif
}
@end
