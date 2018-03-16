//
//  JKRnupdateManage.m
//  kuaichecaifuRn
//
//  Created by 余浩 on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKRnupdateManage.h"

#import "JKDownloadManager.h"
static JKRnupdateManage *_instance=nil;

@implementation JKRnupdateManage

+(instancetype)shareManager{
  
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    
    _instance=[[super allocWithZone:NULL] init];
  });
  
  return _instance;
}

+(id) allocWithZone:(struct _NSZone *)zone
{
  return [JKRnupdateManage shareManager];
}

-(id) copyWithZone:(struct _NSZone *)zone
{
  return [JKRnupdateManage shareManager];
}
/*******************************************加载逻辑***************************************************************/
#pragma mark 处理加载逻辑
-(NSURL *_Nullable)bundlePathWithresponseobject:(id  _Nullable )responseobject  jsListArr:(NSMutableArray *_Nullable)jsListArr
{
  __block bool Isbackgrounddown=false;
  __block bool IsloadlocalPackage = false;
  JKLog(@"%@ %@",responseobject, jsListArr);
  //原则 加载逻辑在前，更新逻辑在后
 
  NSInteger tactics = 1;
  if ([[NSString stringWithFormat:@"%@", responseobject] isEqualToString:@"failuer"]) {
    tactics =1;
  }else{
  if ([[NSString stringWithFormat:@"%@",[responseobject objectForKey:@"code"]] isEqualToString:@"0"]) {
    Isbackgrounddown = false;
    //网络请求成功
   for (int i = 0; i<jsListArr.count; i++) {
      JKLog(@"%@", [jsListArr objectAtIndex:i]);
      JKLog(@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"loadRnVersion"]);
      
   if ([[NSString stringWithFormat:@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"loadRnVersion"]] isEqualToString:[jsListArr objectAtIndex:i]]) {
        IsloadlocalPackage = YES;
      }else{
        
      }
    }
    if (IsloadlocalPackage) {
      tactics = 0;
    }else{
      tactics = 1;
    }
  }else{
    tactics = 1;
  }
  }
  switch (tactics) {
    case RnLoadbyInternet:
      return  [self getjsCodeLocationWithresponseobject:responseobject];
      break;
    case RnLoadbyLocaltactics:
      return [self getjsCodeLocationWithresponseobject2:responseobject list:jsListArr];
    default:
      return [self getjsCodeLocationWithresponseobject2:responseobject list:jsListArr];
      break;
  }
}

-(NSURL *)getjsCodeLocationWithresponseobject:(id  _Nullable )responseobject
{
  //本地存在要加载的js文件
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent:[NSString stringWithFormat:@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"loadRnVersion"]]];
  NSString *txtPath2 = [txtPath stringByAppendingPathComponent:@"main.jsbundle"];
  JKLog(@"%@",txtPath2);
  @try{
    [[NSUserDefaults standardUserDefaults] setObject:[NSString stringWithFormat:@"%@",[[responseobject objectForKey:@"data"] valueForKey:@"loadRnVersion"]] forKey:LAST_RUN_RN_KEY] ;
  }
  @catch(NSException *exception){
    //捕获的异常
    JKLog(@"捕获的异常，js版本有问题");
    JKLog(@"%@",exception);
  }
  @finally{
    //结果处理
    JKLog(@"js版本有问题,删除了加载好的");
    
  }
  return [NSURL URLWithString:txtPath2];
}
-(NSURL *)getjsCodeLocationWithresponseobject2:(id  _Nullable )responseobject list:(NSMutableArray *)listArr
{
  //本地不存在要加载的js文件 加载上次加载的，加载一个不是活动页的js版本
  [[NSUserDefaults standardUserDefaults] setObject:[self Loadlocalbundle:listArr] forKey:LAST_RUN_RN_KEY] ;
  
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent:[self Loadlocalbundle:listArr]];
  // jsCodeLocation = [NSURL URLWithString:txtPath];
  NSString *txtPath2 = [txtPath stringByAppendingPathComponent:@"main.jsbundle"];
  return  [NSURL URLWithString:txtPath2];
}
#pragma mark 本地加载策略
-(NSString *)Loadlocalbundle:(NSMutableArray *)listArr
{
  
  //剔除活动
  for (int i = 0; i < listArr.count; i++) {
    if ([[listArr objectAtIndex:i] hasSuffix:@"Y"] || [[listArr objectAtIndex:i] isEqualToString:@".DS_Store"]) {
      [listArr removeObjectAtIndex:i];
    }
  }
  //找到最新
  NSString *version =@"";
  
  int versionMax  = 0;
  for (int i = 0; i < listArr.count; i++) {
    int version = [[listArr objectAtIndex:i] intValue];
    if (version > versionMax) {
      versionMax = version;
    }
  }
  if (versionMax == 0) {
    //加载内置
    [self getBundlePath];
    NSMutableArray *Arr = [NSMutableArray arrayWithArray:listArr];
    version = [NSString stringWithFormat:@"%@", [Arr objectAtIndex:0]];
  }else{
    version = [NSString stringWithFormat:@"%d",versionMax];
    
  }
  return version;
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
#pragma mark 处理更新逻辑
/*******************************************更新逻辑***************************************************************/
-(void)updateWithres:(id _Nullable)responseobject jsListArr:(NSMutableArray *_Nullable)jsListArr
{
    NSInteger updateWay = 0;
  
  NSMutableDictionary *AppUpdateInfo = [NSMutableDictionary dictionary];
  NSArray *RnUpdateInfo = [NSArray array];
  if ([[NSString stringWithFormat:@"%@",[responseobject objectForKey:@"code"]] isEqualToString:@"0"])
  {
    //检查更新操作 1.是否要更新。app更新还是js更新（js是增量更新还是全量更新）
  
    AppUpdateInfo =[[responseobject objectForKey:@"data"] valueForKey:@"appVersion"];
   
    RnUpdateInfo = [JKRnUpdateModel baseModelWithArr:[[responseobject objectForKey:@"data"] valueForKey:@"rnVersionList"]];
    JKLog(@"%@ ====%@",[AppUpdateInfo valueForKey:@"upgrade"],[AppUpdateInfo valueForKey:@"forceUpgrade"]);
    if ([[NSString stringWithFormat:@"%@",[AppUpdateInfo valueForKey:@"upgrade"]] isEqualToString:@"1"])
    {
      //App更新 的情况下 rn更新情况不做判断， 一种情况除外 。App非强制更新
      
      
      if ([[NSString stringWithFormat:@"%@",[AppUpdateInfo valueForKey:@"forceUpgrade"]] isEqualToString:@"1"]) {
        //App是强制更新，弹窗展示更新信息，无取消按钮，升级跳转Appstore（是否需要和苹果服务器做校验）
        updateWay = 3;
      }else{
        updateWay = 7;

      }
    }else{
       //App不更新, 检查rn是否需要更新
      updateWay = 4;
    }
    
    
    //App更新 的情况下 rn更新情况不做判断， 一种情况除外 。App非强制更新，下次枚举有几个没有用
    
    switch (updateWay) {
        //App不更新
      case RnupdateStructurebyNone:
        break;
        //App更新 无弹窗
      case RnupdateStructurebyAPP:
        break;
        //App更新 有弹窗可取消
      case RnupdateStructurebyAlertCanmove:
        break;
        //App更新 有弹窗不可取消 (App强制更新)
      case RnupdateStructurebyAlertCannotmove:
#pragma  待完善 传入标题信息 ，APPstore信息校验，跳转Appstore
        [self AppForeceUpdate];
        [self deleteWithdic:responseobject];
        break;
        //App不更新 js更新 无弹窗
      case RnupdateStructurebyJS:
        [self AppNoneupdateWithRnupdate:RnUpdateInfo jsListArr:jsListArr];
        [self deleteWithdic:responseobject];
        break;
        //App不更新 Rn更新 (有弹窗)可取消
      case RnupdateStructurebyJSAlertCanmove:
        break;
        //App不更新 Rn更新 (有弹窗) 不可取消
      case RnupdateStructurebyJSAlertCannotmove:
        break;
        //App不强制更新，rn检查rn是否需要更新:
      case RNupdateStructurebyNoneAppWithRN:
        [self AppNoneForceupdateWithRnupdate:RnUpdateInfo jsListArr:jsListArr];
        [self deleteWithdic:responseobject];
      default:
        break;

  }
  
  }
  

}
//删除操作
-(void)deleteWithdic:(id _Nullable)responseobject
{
  NSString *jslist = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSMutableArray *deletelist = [NSMutableArray arrayWithArray:[[responseobject objectForKey:@"data"] valueForKey:@"deleteRnVersionList"]];
  for (int i =0 ; i<deletelist.count ; i++) {
    NSString *jsversion = [NSString stringWithFormat:@"%@/\%@",jslist,[deletelist objectAtIndex:i]];
    [[NSFileManager defaultManager] removeItemAtPath:jsversion error:nil];
  }
}


//App 强制更新
-(void)AppForeceUpdate
{
  [self presentAlertWithtitle:@"要更新咯" message:@"" leftbutton:@"确定" rightbutton:@"升级" leftAct:^{
    
  } rightAct:^{
    
  }];
}
// App 不强制更新 rn更新
-(void)AppNoneForceupdateWithRnupdate:(NSArray *)RnUpdateInfo jsListArr:(NSArray *)jsListArr
{
  //App不强制更新， 展示弹窗
  [self presentAlertWithtitle:@"要更新咯" message:@"" leftbutton:@"取消" rightbutton:@"确定" leftAct:^{
    //App不更新, 检查rn是否需要更新
    for (int i = 0; i < RnUpdateInfo.count; i++) {
      JKRnUpdateModel *updatemodel = [RnUpdateInfo objectAtIndex:i];
      if (!klObjectisEmpty([updatemodel version]) ) {
        //需要更新
        if (!klObjectisEmpty([updatemodel incrementVersion])) {
          if ([[updatemodel incrementVersion] isEqualToString:@"all"]) {
            //后台更新全量包
            
            [self getBackFullPackageDownurl:[updatemodel versionUrl] packageName:[updatemodel version] zipmd5:[updatemodel versionSign]];
            
            
            
            
          }else{
            //后台更新增量包
            [self getBackpatchPackageWithBaseversion:[updatemodel incrementVersion] shouldUpdatedVersion:[updatemodel version] url:[updatemodel versionUrl] zipMd5:[updatemodel versionSign] jslistArr:jsListArr];
            
          }
        }
        
      }else{
        //不需要更新
        
      }
    }
    
  } rightAct:^{
    
  }];
}
//App 不更新 rn处理
-(void)AppNoneupdateWithRnupdate:(NSArray *)RnUpdateInfo jsListArr:(NSArray *)jsListArr
{
  //App不更新, 检查rn是否需要更新
  for (int i = 0; i < RnUpdateInfo.count; i++) {
    JKRnUpdateModel *updatemodel = [RnUpdateInfo objectAtIndex:i];
    if (!klObjectisEmpty([updatemodel version]) ) {
      //需要更新
      if (!klObjectisEmpty([updatemodel incrementVersion])) {
        if ([[updatemodel incrementVersion] isEqualToString:@"all"]) {
          //后台更新全量包
        
          [self getBackFullPackageDownurl:[updatemodel versionUrl] packageName:[updatemodel version] zipmd5:[updatemodel versionSign]];
          
        }else{
          //后台更新增量包
          [self getBackpatchPackageWithBaseversion:[updatemodel incrementVersion] shouldUpdatedVersion:[updatemodel version] url:[updatemodel versionUrl] zipMd5:[updatemodel versionSign] jslistArr:jsListArr];
        }
      }
    }else{
      //不需要更新
      
    }
    
    
  }
}


#pragma mark后台下载全量包
-(void)getBackFullPackageDownurl:(NSString *)url packageName:(NSString *)packageName zipmd5:(NSString *)zipmd5 {
  
  NSString *docsDir = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  
  NSString *filePath = [NSString stringWithFormat:@"%@/\%@",docsDir,[NSString stringWithFormat:@"%@",packageName]];
  
  [JKDownloadManager startDownloadWithUrl:url fileName:packageName imageUrl:nil fileId:packageName md5:zipmd5 destinPath:filePath type:@"1"];
  
  
  
}
#pragma mark 后台下载补丁包
-(void)getBackpatchPackageWithBaseversion:(NSString *)baseVersion shouldUpdatedVersion:(NSString *)shouldUpdatedVersion url:(NSString *)downUrl zipMd5:(NSString *)zipmd5 jslistArr:(NSArray *)jslistArr
{
  //先找到baseVersion版本
  
  [self findBaseWithCopyWithbaseVersion:baseVersion jslistArr:jslistArr];
  
  
  JKLog(@"++++++++++++++++++++++++++++++++++++++++++++++++++后台下载补丁包+++++++++++++++++++++++++++++++++++++++++++++");
  NSString *patchCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"patch"];
  NSString *filePath = [NSString stringWithFormat:@"%@/\%@",patchCachePath,[NSString stringWithFormat:@"%@",shouldUpdatedVersion]];
  [[NSFileManager defaultManager] createDirectoryAtPath:patchCachePath withIntermediateDirectories:YES attributes:nil error:nil];
  
 [JKDownloadManager startDownloadWithUrl:downUrl fileName:shouldUpdatedVersion imageUrl:baseVersion fileId:shouldUpdatedVersion md5:zipmd5 destinPath:filePath type:@"2"];
 
  JKLog(@"++++++++++++++++++++++++++++++++++++++++++++++++++后台下载补丁包结束+++++++++++++++++++++++++++++++++++++++++++++");
  
}
#pragma mark 后台下载补丁包 先找到baseVersion版本 拷贝到沙盒
-(void)findBaseWithCopyWithbaseVersion:(NSString *)baseVersion jslistArr:(NSArray *)jslistArr
{
  //jsversion文件夹地址
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSString *doc = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  NSFileManager *manager =[NSFileManager defaultManager];
  NSString *filePath = [NSString stringWithFormat:@"%@/\%@",jsversionCachePath,[NSString stringWithFormat:@"%@",baseVersion]];
  BOOL jsversionExist = [manager fileExistsAtPath:jsversionCachePath];
  BOOL IsBaseversion=NO;
  if (jsversionExist) {
    //js文件存在
     jslistArr =[manager contentsOfDirectoryAtPath:jsversionCachePath error:nil];
    
    for (int i = 0; i < jslistArr.count; i++) {
     
      if ([baseVersion isEqualToString:[NSString stringWithFormat:@"%@",[jslistArr objectAtIndex:i]]]) {
        IsBaseversion = YES;
      }else{
        
      }
      
    }
   
    if (IsBaseversion) {
      NSString *jsversionCachePath1 = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],baseVersion];
      BOOL jsversionExist = [[NSFileManager defaultManager] fileExistsAtPath:jsversionCachePath1];
      //如果已存在
      if(jsversionExist){
        NSLog(@"jsversionCachePath1已存在: %@",jsversionCachePath);
        
        //如果不存在
      }else{
        NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
        NSString *filePath = [NSString stringWithFormat:@"%@/\%@",jsversionCachePath,[NSString stringWithFormat:@"%@",baseVersion]];
        [[NSFileManager defaultManager] copyItemAtPath:filePath toPath:jsversionCachePath1 error:nil];
        NSLog(@"file已拷贝至Document: %@",jsversionCachePath1);
      }
      
      
      [[NSFileManager defaultManager] moveItemAtPath:filePath toPath:doc error:nil];
    }
    
    
  }else{
    
    
  }
}




#pragma mark 弹窗展现
-(void)presentAlertWithtitle:(NSString *)title message:(NSString *)message leftbutton:(NSString *)leftbutton rightbutton:(NSString *)rightbutton leftAct:(void(^)())leftAction rightAct:(void(^)())rightAct{
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:leftbutton style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    leftAction();
  }];
  UIAlertAction *sureAction = [UIAlertAction actionWithTitle:rightbutton style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    
    rightAct();
  }];
  
  [alertController addAction:cancelAction];
  [alertController addAction:sureAction];
  
  //显示弹出框
  
  [ [UIApplication sharedApplication].windows[0].rootViewController presentViewController:alertController animated:YES completion:nil];
  
  
}
@end
