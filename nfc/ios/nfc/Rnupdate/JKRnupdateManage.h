//
//  JKRnupdateManage.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//


//
//  JKRnupdate.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef  NS_ENUM(NSInteger, RNLOADTACTICS){
  RnLoadbyInternet = 0,//根据网络策略加载(非强制)   网络请求成功
  RnLoadbyInternetWithAllForce,
   RnLoadbyInternetWithpatchForce,
  RnLoadbyLocaltactics,//根据本地策略加载   网络请求失败，超时，服务器返回信息错误
  RnLoadbyUnknown, //未知预留字段
} ;
//默认加载策略

//RNLOADTACTICS  state = RnLoadbyLocaltactics;
typedef  NS_ENUM(NSInteger, RNUPDATEWAY){
  RnupdateStructurebyNone = 0,//不更新
  RnupdateStructurebyAPP,//App更新 无弹窗
  RnupdateStructurebyAlertCanmove,//App更新 有弹窗 可取消
  RnupdateStructurebyAlertCannotmove, //App更新 有弹窗 不可取消
  RnupdateStructurebyJS, //js更新 无弹窗
  RnupdateStructurebyJSAlertCanmove, //Rn更新 有弹窗 可取消
  RnupdateStructurebyJSAlertCannotmove, //Rn更新 有弹窗 不可取消
  RNupdateStructurebyNoneAppWithRN, //App不强制更新，rn更新
};
//RNUPDATEWAY  stateway = RnupdateStructurebyNone;


@interface JKRnupdateManage : NSObject


+(instancetype _Nullable )shareManager;
// 加载
-(NSURL *_Nullable)bundlePathWithresponseobject:(id  _Nullable )responseobject  jsListArr:(NSMutableArray *_Nullable)jsListArr;
//更新
-(void)updateWithres:(id _Nullable)responseobject jsListArr:(NSMutableArray *_Nullable)jsListArr;

@end
