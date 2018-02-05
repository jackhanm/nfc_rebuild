//
//  UserOperatemanager.m
//  kuaichecaifu
//
//  Created by 余浩 on 2017/9/26.
//  Copyright © 2017年 ct. All rights reserved.
//

#import "UserOperatemanager.h"


//全局变量
static UserOperatemanager *_instance=nil;
@implementation UserOperatemanager
+(instancetype)shareManager{
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        _instance=[[super allocWithZone:NULL] init];
    });
    
    return _instance;
}

+(id) allocWithZone:(struct _NSZone *)zone
{
    return [UserOperatemanager shareManager];
}

-(id) copyWithZone:(struct _NSZone *)zone
{
    return [UserOperatemanager shareManager];
}
-(BOOL)IsLoad
{
    if (!klObjectisEmpty([[NSUserDefaults standardUserDefaults]objectForKey:@"AccessToken"])) {
        return YES;
    }else {
        return NO;
    }
}
-(void)LoadOut
{
    [[NSUserDefaults standardUserDefaults] setObject:@"" forKey:@"AccessToken"];
    [[NSUserDefaults standardUserDefaults] setObject:@"" forKey:@"RefreshToken"];
}
-(NSString *)returnUserId:(NSString *)UserId
{
    if (!KlStringisEmpty(UserId)) {
         [[NSUserDefaults standardUserDefaults] setObject:UserId forKey:@"UserId"];
    }
    return [[NSUserDefaults standardUserDefaults]objectForKey:@"UserId"];
}
-(NSString *)returnAccessToken:(NSString *)AccessToken
{
    if (!klObjectisEmpty(AccessToken)) {
        [[NSUserDefaults standardUserDefaults] setObject:AccessToken forKey:@"AccessToken"];
    }
    return [[NSUserDefaults standardUserDefaults]objectForKey:@"AccessToken"];
}
-(NSString *)returnRefreshToken:(NSString *)RefreshToken
{
    if (!klObjectisEmpty(RefreshToken)) {
        [[NSUserDefaults standardUserDefaults] setObject:RefreshToken forKey:@"RefreshToken"];
    }
    return [[NSUserDefaults standardUserDefaults]objectForKey:@"RefreshToken"];
}
-(void)updateAcctokensuccess:(NSString * (^)(NSString *str))successBlock
{
    JKLog(@"!!!!!!!!!!!!!!!!!!刷新tokne");
    NSString *refrshtoken =  [[UserOperatemanager shareManager] returnRefreshToken:nil];
    NSString *Accesstoken = [[UserOperatemanager shareManager]returnAccessToken:nil];
    if (!klObjectisEmpty(refrshtoken) ) {
        [CommenHttpAPI klUpdateAccessTokenWithParemeters:[CommonRequestModel AccessTokeb:refrshtoken] Version:ASConfigAPPVersion accessToken:NoNeedtoken progress:^(NSProgress * _Nonnull progress) {


        } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseobject) {
            JKLog(@"%@",responseobject);
           
            if (!klObjectisEmpty([responseobject objectForKey:@"code"])) {
                if (![[NSString stringWithFormat:@"%@",[responseobject objectForKey:@"code"] ] isEqualToString:@"0"]) {
                     successBlock(@"success");
                    NSString *Acctoken = [[responseobject objectForKey:@"data"] objectForKey:@"accessToken"];
                    NSString *userId = [[responseobject objectForKey:@"data"] objectForKey:@"userId"];
                    [[UserOperatemanager shareManager] returnAccessToken:Acctoken];
                    [[UserOperatemanager shareManager]returnUserId: userId];
                  
                }
            }else{
                 successBlock(@"fail");
                [self gotoLogin];
            }

        } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
            successBlock(@"fail");
            JKLog(@"%@", error);
        }];
    }else{
         successBlock(@"fail");
        return;
    }
}
-(void)gotoLogin
{
    JKLog(@"快去登陆");
}
-(void)CollectingInfotype:(NSNumber *)type appro:(NSString *)appro
{
    NSString *Str =@"";
    JKLog(@"%@",type);
    if (!klObjectisEmpty([[NSUserDefaults standardUserDefaults] objectForKey:@"UMtoken"])) {
        Str = [[NSUserDefaults standardUserDefaults] objectForKey:@"UMtoken"];
    }
    [CommenHttpAPI klgetServerPareWithParemeters:nil Version:ASConfigAPPVersion uploadPhoneInfo:type uid:@"11" uname:@"yuhao" model:[NSString getDeviceName] osver:[UIDevice currentDevice].systemVersion imei:@""  imsi:@""  mac:[[DeviceInfoManager sharedManager] getMacAddress] udid:[CTUUID getUUID] ip:[[NetWorkInfoManager sharedManager] getDeviceIPAddresses] devid:[[DeviceInfoManager sharedManager] getIDFA] tokid:Str plat:@"1" appver:AppCFversion appro:appro time:[NSString getCurrentTime] accessToken:@"" progress:^(NSProgress * _Nonnull progress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseobject) {
//        NSLog(@"%@", responseobject);
        NSHTTPURLResponse *response = (NSHTTPURLResponse *)task.response;
        NSDictionary *allHeaders = response.allHeaderFields;
//        JKLog(@"%@",allHeaders);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
//        JKLog(@"%@",error);
//        JKLog(@"%@", task.currentRequest.URL);
        NSHTTPURLResponse *response = (NSHTTPURLResponse *)task.response;
        NSDictionary *allHeaders = response.allHeaderFields;
//        JKLog(@"%@",allHeaders);
    }];
    
    
    
}
#pragma mark 判断app是否第一次启动或者更新后第一次启动
- (BOOL) isFirstLoad{
    NSString *currentVersion = [[[NSBundle mainBundle] infoDictionary]
                                objectForKey:@"CFBundleShortVersionString"];
  
  
  
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    NSString *lastRunVersion = [defaults objectForKey:LAST_RUN_VERSION_KEY];
  
    if (!lastRunVersion) {
        [defaults setObject:currentVersion forKey:LAST_RUN_VERSION_KEY];
  
    
        return YES;
    }
    else if (![lastRunVersion isEqualToString:currentVersion]) {
        [defaults setObject:currentVersion forKey:LAST_RUN_VERSION_KEY];
    
        return YES;
    }
    return NO;
}
-(NSString *)last_run_version_of_application{
  
  NSString *currentVersion = [[[NSBundle mainBundle] infoDictionary]
                              objectForKey:@"CFBundleShortVersionString"];
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *lastRunRN = [defaults objectForKey:LAST_RUN_RN_KEY];
  if ([self isFirstLoad]) {
    lastRunRN = @"0";
  }else{
    if (!lastRunRN) {
      [defaults setObject:@"0" forKey:LAST_RUN_RN_KEY];
      lastRunRN =[defaults objectForKey:LAST_RUN_RN_KEY];
    }else{
       lastRunRN =[defaults objectForKey:LAST_RUN_RN_KEY];
    }
  }
  NSString *RNwithApp = [NSString stringWithFormat:@"%@.%@",currentVersion,lastRunRN];
 
  return RNwithApp;
  
  
}




@end
