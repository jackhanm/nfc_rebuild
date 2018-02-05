//
//  JKRnUpdateModel.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2018/1/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CTBaseModel.h"

@interface JKRnUpdateModel : CTBaseModel
@property(nonatomic, retain)NSString *incrementVersion;
@property(nonatomic, retain)NSString *version;
@property(nonatomic, retain)NSString *versionSign;
@property(nonatomic, retain)NSString *versionUrl;
@end
