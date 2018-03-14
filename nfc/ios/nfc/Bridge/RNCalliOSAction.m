//
//  RNCalliOSAction.m
//  RNAndiOSCallEachOther
//
//  Created by Mac on 2017/5/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RNCalliOSAction.h"

#import <UIKit/UIKit.h>

#import "SVProgressHUD.h"

#import "RCSubEventEmitter.h"

#import "JKRnUpdateModel.h"
#import <React/RCTEventDispatcher.h>

@interface RNCalliOSAction ()



@end
static RNCalliOSAction *_instance=nil;
@implementation RNCalliOSAction

@synthesize bridge = _bridge;



+(instancetype)shareManager{
  
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    
    _instance=[[super allocWithZone:NULL] init];
  });
  
  return _instance;
}

+(id) allocWithZone:(struct _NSZone *)zone
{
  return [RNCalliOSAction shareManager];
}

-(id) copyWithZone:(struct _NSZone *)zone
{
  return [RNCalliOSAction shareManager];
}

-(void)senddata{
//  dispatch_sync(dispatch_get_main_queue(), ^{
//  RCSubEventEmitter *emitter=[[RCSubEventEmitter alloc]init];
  //
  //[emitter Callback:@"123" result:@"456"];
  [self.bridge.eventDispatcher sendAppEventWithName:@"getSelectData" body:@{@"SelectDate":@"222222"}];
//  });
}

//导出模块
RCT_EXPORT_MODULE();    //此处不添加参数即默认为这个OC类的名字


//导出方法，桥接到js的方法返回值类型必须是void


/*
 
 iOS支持方法名一样但是参数不一样的方法，视为两个不同的方法
 但是RN调用iOS这样的方法会出错的
 所以最好别把方法名声明成一样的
 
 */

/**************************************** RN Call iOS ***************************************************/

//一个参数
RCT_EXPORT_METHOD(calliOSActionWithOneParams:(id)name)
{
  dispatch_sync(dispatch_get_main_queue(), ^{
    JKLog(@"%@",name);
    [[NSNotificationCenter defaultCenter] postNotificationName:@"OpenWebview" object:name];
//    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
//    [SVProgressHUD showSuccessWithStatus:[NSString stringWithFormat:@"参数：%@",name]];
   
    
  });
  
  
  
}


//一个参数
RCT_EXPORT_METHOD(calliOStopdfView:(id)name)
{
  dispatch_sync(dispatch_get_main_queue(), ^{
    JKLog(@"%@",name);
    [[NSNotificationCenter defaultCenter] postNotificationName:@"OpenWebview" object:name];
    //    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
    //    [SVProgressHUD showSuccessWithStatus:[NSString stringWithFormat:@"参数：%@",name]];
    
    
  });
  
  
  
}


//两个参数
RCT_EXPORT_METHOD(calliOSActionWithSecondParams:(NSString *)params1 params2:(NSString *)params2)
{
  
  [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
  [SVProgressHUD showSuccessWithStatus:[NSString stringWithFormat:@"参数1：%@\n参数2:%@",params1,params2]];
  
}

//一个参数，类型为字典类型
RCT_EXPORT_METHOD(calliOSActionWithDictionParams:(NSDictionary *)diction)
{
  
  [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
  [SVProgressHUD showSuccessWithStatus:[NSString stringWithFormat:@"参数：%@",diction]];
  
}

//一个参数，类型为数组类型
RCT_EXPORT_METHOD(calliOSActionWithArrayParams:(NSArray *)array)
{
  
  [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
  [SVProgressHUD showSuccessWithStatus:[NSString stringWithFormat:@"参数：%@",array]];
  
}
RCT_EXPORT_METHOD(calliOSActionWithBack)
{
  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"noti1" object:nil];
  
}

//无参数并弹出iOS原生组件
RCT_EXPORT_METHOD(calliOSActionWithActionSheet) {
  
  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"noti2" object:@"yuhao"];
  
  
}





/**************************************** RN Call iOS 回调 ***************************************************/

//RCTResponseSenderBlock
//RCTResponseSenderBlock只接受一个参数,为数组，把需要回调的参数加入到数组中，回调回去
RCT_EXPORT_METHOD(calliOSActionWithCallBack:(RCTResponseSenderBlock)callBack) {
  //    NSString *timeStamps         = [CTUUID getTimeStamp];
  //    NSString *parameters = [NSString stringWithFormat:@"pageIndex=%ld&pageSize=10",1];
  //    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
  //    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
  //    NSString *Str = [NSString stringWithFormat:@"%@?%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLgetartcleList_v_1_0],parameters,ASConfigAPPID,[key do16MD5],timeStamps,deToken,AppCFversion];
  //
  //    JKLog(@"%@",Str);
  //
  //
  
    NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"down"];
    NSFileManager *manager =[NSFileManager defaultManager];
    BOOL Exist = [manager fileExistsAtPath:jsversionCachePath];
   NSMutableArray *listarr = [NSMutableArray array];
    if (Exist) {
      //js文件存在
      listarr =[manager contentsOfDirectoryAtPath:jsversionCachePath error:nil];
    }
  JKLog(@"%@",listarr);
  JKRnUpdateModel *model = [[JKRnUpdateModel alloc]init];
  NSMutableArray *Arr= [NSMutableArray array];
  model.incrementVersion = @"1232";
  model.version = @"dsdsdsd";
  
  for (int i =0 ; i < listarr.count; i++) {
    NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithObjectsAndKeys:@"123",@"path",@"456",@"name",@"789",@"type",@"10",@"title",@"",@"time", nil];
    [dic setValue:[NSString stringWithFormat:@"%@/%@",jsversionCachePath,listarr[i]]  forKey:@"path"];
    [dic setValue:@"baidu" forKey:@"name"];
   
    [Arr addObject:dic];
    
  }
  JKLog(@"%@",Arr);
  
      NSString *string=@"1234";
  
      NSArray *array=Arr;
  
      NSString *end=@"goodbay";
  
  
//  更多参数放到数组中进行回调
  callBack(@[string,Arr,end]);
  
  
}


//Promises
//最后两个参数是RCTPromiseResolveBlock（成功block）和RCTPromiseRejectBlock（失败block）

RCT_EXPORT_METHOD(calliOSActionWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  
  //    NSString *timeStamps         = [CTUUID getTimeStamp];
  //    NSString *parameters = [NSString stringWithFormat:@"pageIndex=%ld&pageSize=10",1];
  //    NSString *deToken =[NSString stringWithFormat:@"%@@%@",[CTUUID getIPAddress],[CTUUID getIDFA]];
  //    NSString *key =[NSString stringWithFormat:@"%@!@##@!%@%@",ASConfigAPPSecret,deToken,timeStamps];
  //    NSString *Str = [NSString stringWithFormat:@"%@?%@&appId=%@&key=%@&ts=%@&deviceId=%@&appVer=%@",[serverUrl stringByAppendingString:KLgetartcleList_v_1_0],parameters,ASConfigAPPID,[key do16MD5],timeStamps,deToken,AppCFversion];
  //
  //    JKLog(@"%@",Str);
  //    JKLog(@"%@",key);
  //    NSString *string=Str;
  
  
  
  //    if (string) {
  //
  //        /*
  //         //正确回调，传递参数2
  //
  //         typedef void (^RCTPromiseResolveBlock)(id result);
  //
  //         */
  //
  //        resolve(string);
  //
  //    }else{
  //
  //        NSError *error=[NSError errorWithDomain:@"errorMsg" code:101 userInfo:nil];
  //
  //        /*
  //         //错误回调，传三个参数
  //
  //         typedef void (^RCTPromiseRejectBlock)(NSString *code, NSString *message, NSError *error);
  //
  //         */
  //        reject(@"code",@"message",error);
  //    }
  
}


/**************************************** RN get iOS Static Value ***************************************************/


/*
 
 原生模块可以导出一些常量，这些常量在JavaScript端随时都可以访问。用这种方法来传递一些静态数据，可以避免通过bridge进行一次来回交互。
 
 
 注意，在 JS 中调用获取值，只获取一次，如果在运行期间改变了值  JS  中获取的值还是原来的值不会改变
 
 
 实现此方法，里面的 key  可以在 JS 里面直接访问得到 value
 
 
 例：
 RNCalliOSAction.age
 RNCalliOSAction.sex
 
 */
- (NSDictionary *)constantsToExport {
  
  return @{@"age":@"18",
           @"sex":@"男",
           @"job":@"IT",
           @"tel":@"123456789"};
  
}


/**************************************** iOS Call RN  ***************************************************/





RCT_EXPORT_METHOD(RNCalliOSToShowDatePicker) {
  
  
  /*
   
   耗时操作在子线程中完成
   
   dispatch_sync(dispatch_queue_create(@"com.RNCalliOS.queue", NULL), ^{
   
   });
   
   */
  
  
  //注意，关于 UI 的 都要在主线程进行操作，不然会非常非常非常的慢，还不一定能出来 UI
  dispatch_sync(dispatch_get_main_queue(), ^{
    
    
    UIDatePicker *picker=[[UIDatePicker alloc]initWithFrame:CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, 216)];
    picker.tag=100;
    picker.date=[NSDate date];
    picker.datePickerMode=UIDatePickerModeDateAndTime;
    picker.backgroundColor=[UIColor whiteColor];
    
    NSDate* minDate = [[NSDate alloc]initWithTimeIntervalSinceNow:-24*60*60*10];
    picker.minimumDate=minDate;
    picker.maximumDate=[NSDate date];
    
    [picker addTarget:self action:@selector(dateChane:) forControlEvents:UIControlEventValueChanged];
    
    [[self topViewController].view addSubview:picker];
    
    
    
    
    
    UIView *topView=[[UIView alloc]initWithFrame:CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, 44)];
    topView.tag=101;
    topView.backgroundColor=[UIColor lightGrayColor];
    [[UIApplication sharedApplication].keyWindow.rootViewController.view addSubview:topView];
    
    
    UIButton *button=[[UIButton alloc]initWithFrame:CGRectMake(topView.frame.size.width-60, 0, 60, 44)];
    [button setTitle:@"关闭" forState:UIControlStateNormal];
    [button addTarget:self action:@selector(dismissView) forControlEvents:UIControlEventTouchUpInside];
    [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [topView addSubview:button];
    
    
    
    [UIView animateWithDuration:.25 animations:^{
      picker.frame=CGRectMake(0, [UIScreen mainScreen].bounds.size.height-216, [UIScreen mainScreen].bounds.size.width, 216);
      topView.frame=CGRectMake(0, [UIScreen mainScreen].bounds.size.height-216-44, [UIScreen mainScreen].bounds.size.width, 44);
      
    }];
    
    
  });
  
}

- (void)dateChane:(UIDatePicker *)picker {
  
  NSDateFormatter *formatter=[[NSDateFormatter alloc]init];
  [formatter setDateFormat:@"yyyy-MM-dd"];
  
  NSString *str_date = [formatter stringFromDate:picker.date];
  
  //  RCSubEventEmitter *emitter=[[RCSubEventEmitter alloc]init];
  //
  //  [emitter Callback:@"123" result:@"456"];
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"getSelectDate" body:@{@"SelectDate":str_date}];
  
}
- (void)dismissView {
  
  UIDatePicker *picker=(UIDatePicker *)[[UIApplication sharedApplication].keyWindow.rootViewController.view viewWithTag:100];
  UIDatePicker *topview=(UIDatePicker *)[[UIApplication sharedApplication].keyWindow.rootViewController.view viewWithTag:101];
  
  [UIView animateWithDuration:.25 animations:^{
    picker.frame=CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, 216);
    topview.frame=CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, 44);
    
  } completion:^(BOOL finished) {
    if (finished) {
      [picker removeFromSuperview];
      [topview removeFromSuperview];
    }
  }];
}
- (UIViewController *)topViewController {
  UIViewController *resultVC;
  resultVC = [self _topViewController:[[UIApplication sharedApplication].keyWindow rootViewController]];
  while (resultVC.presentedViewController) {
    resultVC = [self _topViewController:resultVC.presentedViewController];
  }
  return resultVC;
}

- (UIViewController *)_topViewController:(UIViewController *)vc {
  if ([vc isKindOfClass:[UINavigationController class]]) {
    return [self _topViewController:[(UINavigationController *)vc topViewController]];
  } else if ([vc isKindOfClass:[UITabBarController class]]) {
    return [self _topViewController:[(UITabBarController *)vc selectedViewController]];
  } else {
    return vc;
  }
  return nil;
}


@end

