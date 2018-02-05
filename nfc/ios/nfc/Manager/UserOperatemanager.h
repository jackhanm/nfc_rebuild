//
//  UserOperatemanager.h
//  kuaichecaifu
//
//  Created by 余浩 on 2017/9/26.
//  Copyright © 2017年 ct. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UserOperatemanager : NSObject
+(instancetype _Nullable )shareManager;
-(void)updateAcctokensuccess:(NSString * _Nullable (^_Nullable)(NSString * _Nullable str))successBlock;
-(NSString *_Nullable)returnAccessToken:(NSString *_Nullable)AccessToken;
-(NSString *_Nullable)returnRefreshToken:(NSString *_Nullable)RefreshToken;
-(NSString *_Nullable)returnUserId:(NSString *_Nullable)UserId;
-(BOOL)IsLoad;
-(void)LoadOut;
-(void)CollectingInfotype:(NSNumber *_Nullable)type appro:(NSString *_Nullable)appro;
- (BOOL)isFirstLoad;
- (id _Nullable )updateAppVersion;
-(NSString *_Nullable)last_run_version_of_application;



@end
