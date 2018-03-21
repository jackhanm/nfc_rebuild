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
#import "RNCalliOSAction.h"
#import "JKViewController.h"
#import "JKReadview.h"
#import "CTUUID.h"
#import <XHLaunchAd.h>
#import "JKforceupdate.h"
#import "JKforceupdateroot.h"
@interface AppDelegate ()
@property (nonatomic,strong) RCTBridge *bridge;
@property (nonatomic, strong) UINavigationController *nav;
@property (nonatomic, strong)NSArray *jslistArr;
@property (nonatomic, strong)NSString *jslistStr;
@property (nonatomic, strong)NSDictionary *AppUpdateInfo;
@property (nonatomic, strong)NSArray *RnUpdateInfo;
@property (nonatomic, assign)id responseobject;


@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor=[UIColor whiteColor];
  
  
   [self setUpAd_show];
 __block NSURL *jsCodeLocation;
  jsCodeLocation=[self getBundlePath];
  __block RCTRootView *rootView ;
 self.jslistArr =[NSMutableArray arrayWithArray:[self getJslist]] ;

#if DEBUG
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"nfc"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  JKViewController *rootViewController = [JKViewController new];
  rootViewController.view = rootView;
  self.nav =[[UINavigationController alloc]initWithRootViewController:rootViewController];
  self.nav.navigationBarHidden=YES;
  self.window.rootViewController = self.nav;
  [self.window makeKeyAndVisible];
#else
  JKLog(@"time+BEGIN%@", [CTUUID getPhoneTimeToss]);
  
 
    // 处理耗时操作的代码块...
    [self checkupdateSuccess:^(id  _Nullable responseobject) {
      
      JKLog(@"%@",responseobject);
      self.responseobject = responseobject;
      //原则 加载逻辑在前，更新逻辑在后
      //1 . 更新接口网络请求
      //2 . 遍历本地文件夹，判断是否存在可以加载的js文件，加载js
      //3 . 检查更新操作
      //    JKLog(@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"load"]);
   JKLog(@"time+SUCCESS%@", [CTUUID getPhoneTimeToss]);
      // 加载

        //回调或者说是通知主线程刷新，

        jsCodeLocation = [[JKRnupdateManage shareManager] bundlePathWithresponseobject:responseobject jsListArr:self.jslistArr];
        JKLog(@"%@",jsCodeLocation);
   
        if ([[jsCodeLocation absoluteString] isEqualToString:@"forceAll"]) {
       
          JKforceupdateroot *rootViewController = [JKforceupdateroot new];
          rootViewController.responseobject =responseobject;
          rootViewController.view = rootView;
          self.nav =[[UINavigationController alloc]initWithRootViewController:rootViewController];
          self.nav.navigationBarHidden=YES;
          self.window.rootViewController = self.nav;
          [self.window makeKeyAndVisible];

          return ;
        }
        if ([[jsCodeLocation absoluteString] isEqualToString:@"forcePatch"]) {
          
          JKforceupdateroot *rootViewController = [JKforceupdateroot new];
          rootViewController.responseobject =responseobject;
          rootViewController.view = rootView;
          self.nav =[[UINavigationController alloc]initWithRootViewController:rootViewController];
          self.nav.navigationBarHidden=YES;
          self.window.rootViewController = self.nav;
          [self.window makeKeyAndVisible];
          return ;
        }
        if ((![[jsCodeLocation absoluteString] isEqualToString:@"forceAll"])&&(![[jsCodeLocation absoluteString] isEqualToString:@"forcePatch"])) {
          rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                 moduleName:@"nfc"
                                          initialProperties:nil
                                              launchOptions:launchOptions];
          rootView.backgroundColor = [UIColor whiteColor];
          rootView.contentView.backgroundColor = [UIColor whiteColor];
          JKViewController *rootViewController = [[JKViewController alloc]init];
          rootViewController.view = rootView;
          UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
          nav.navigationBarHidden=YES;
          self.window.rootViewController = nav;
          JKLog(@"time+%@", [CTUUID getPhoneTimeToss]);
          [self.window makeKeyAndVisible];
           [[JKRnupdateManage shareManager]updateWithres:responseobject jsListArr:self.jslistArr];
        }
        
       
     
      // 更新
     
     
    
    } failure:^(NSError * _Nonnull error) {
      JKLog(@"time+FAILUER%@", [CTUUID getPhoneTimeToss]);
      if (!klObjectisEmpty([self getJslist])) {
        jsCodeLocation = [[JKRnupdateManage shareManager] bundlePathWithresponseobject:@"failuer" jsListArr:[self getJslist]];
      }else{
        jsCodeLocation =  [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
      }
      
      
      rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                             moduleName:@"nfc"
                                      initialProperties:nil
                                          launchOptions:launchOptions];
      rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
      self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
      JKViewController *rootViewController = [UIViewController new];
      rootViewController.view = rootView;
      UINavigationController *nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
      nav.navigationBarHidden=YES;
      self.window.rootViewController = nav;
      [self.window makeKeyAndVisible];
    }];
    //通知主线程刷新
   
    

  
  
  
#endif
  
#pragma mark 监听
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(OpenWebview:) name:@"OpenWebview" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(Openpdfview:) name:@"Openpdfview" object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deletepdfview:) name:@"deletepdfview" object:nil];
  return YES;
}
- (void)OpenWebview:(NSNotification *)notification{
  
 
  NSLog(@"---接收到通知---");
  JKpdfview *vc= [[JKpdfview alloc]init];
  vc.objectDic =notification.object;
  [self.nav pushViewController:vc animated:YES];
  
  
}

- (void)Openpdfview:(NSNotification *)notification{
  
  
  NSLog(@"---接收到通知---");
  JKReadview *vc= [[JKReadview alloc]init];
  vc.pdfurl =notification.object;
  [self.nav pushViewController:vc animated:YES];
  
  
}
- (void)deletepdfview:(NSNotification *)notification{
  
  
  NSLog(@"---接收到通知---");
  if ([[NSFileManager defaultManager] removeItemAtPath:notification.object error:nil]) {
    KLToast(@"删除成功")
  }else{
    KLToast(@"删除失败")
  }
 ;
  
  
}
#pragma mark 广告页
- (void)setUpAd_show
{
  [XHLaunchAd setWaitDataDuration:3];//请求广告数据前,必须设置
  [CommenHttpAPI klgetguidepageParemeters:nil os:@"1" prod:@"1" res:@"2" progress:^(NSProgress * _Nonnull progress) {
    
  } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseobject) {
    JKLog(@"%@", responseobject);
    
    if ([[NSString stringWithFormat:@"%@",[responseobject valueForKey:@"code"]] isEqualToString:@"0"]) {
      NSDictionary *urlDic = [responseobject valueForKey:@"data"];
      _actionUrl = [urlDic valueForKey:@"actionUrl"];
      //配置广告数据
      XHLaunchImageAdConfiguration *imageAdconfiguration = [XHLaunchImageAdConfiguration new];
      //广告停留时间
      imageAdconfiguration.duration = 1;
      //广告frame
      imageAdconfiguration.frame = CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, self.window.bounds.size.height*0.82);
      //广告图片URLString/或本地图片名(.jpg/.gif请带上后缀)
      imageAdconfiguration.imageNameOrURLString = [urlDic valueForKey:@"imgUrl"];
      //缓存机制(仅对网络图片有效)
      imageAdconfiguration.imageOption = XHLaunchAdImageDefault;
      //图片填充模式
      imageAdconfiguration.contentMode = UIViewContentModeScaleToFill;
      //广告点击打开链接
      imageAdconfiguration.openURLString = _actionUrl;
      //广告显示完成动画
      imageAdconfiguration.showFinishAnimate =ShowFinishAnimateFlipFromLeft;
      //跳过按钮类型
      imageAdconfiguration.skipButtonType = SkipTypeNone;
      //后台返回时,是否显示广告
      imageAdconfiguration.showEnterForeground = NO;
      //显示开屏广告
      [XHLaunchAd imageAdWithImageAdConfiguration:imageAdconfiguration delegate:self];
      
      
    }
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
    JKLog(@"%@", error);
    
  }];
}


-(void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)(void))completionHandler{
  NSLog(@"%s", __func__);
  [[JKDownloadSession downloadSession] addCompletionHandler:completionHandler identifier:identifier];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [JKDownloadManager saveDownloadStatus];
}


#pragma mark - test code
- (void)applicationWillResignActive:(UIApplication *)application{
  [JKDownloadManager saveDownloadStatus];

  NSLog(@"%s",__func__);
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [JKDownloadManager saveDownloadStatus];
  
}



#pragma mark 合并增量后jsbundle文件出现部分错误调试发现当加载jsbundle出现异常时
- (BOOL)backToPreVersion
{
  // rollback
  JKLog(@"这个js版本有问题");
  
  return YES;
}
#pragma mark 检查更新
-(void)checkupdateSuccess:(nonnull void (^)(id _Nullable responseobject))success failure:(nonnull void (^)(NSError * _Nonnull error))failure{
  JKLog(@"%@",self.jslistStr);
  [CommenHttpAPI klUpgradeParemeters:nil version:AppCFversion channel:@"" os:@"1" jsVersionList:self.jslistStr progress:^(NSProgress * _Nonnull progress) {
    
  } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseobject) {
    
    success(responseobject);
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
   
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

  NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent:@"18031500"];
  // jsCodeLocation = [NSURL URLWithString:txtPath];
  NSString *txtPath2 = [txtPath stringByAppendingPathComponent:@"main.jsbundle"];

  return [NSURL URLWithString:txtPath2];
  //#endif
}
@end
