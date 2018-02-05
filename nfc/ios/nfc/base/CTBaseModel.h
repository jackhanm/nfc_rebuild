//
//  CTBaseModel.h
//  ChangTianDemo
//
//  Created by yuhao on 2017/9/21.
//  Copyright © 2017年 uhqsh. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CTBaseModel : NSObject

- (instancetype)initWithDic:(NSMutableDictionary *)dic;
+ (instancetype)baseModelWithDic:(NSMutableDictionary *)dic;
+ (NSMutableArray *)baseModelWithArr:(NSMutableArray *)arr;
@property (nonatomic,copy)NSString *mId;
@end
