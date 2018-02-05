//
//  JKupdateHelper.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void (^FinishBlock) (NSInteger status,id data);

@interface JKupdateHelper : NSObject
+(void)checkUpdate:(FinishBlock)finihs;
@end
