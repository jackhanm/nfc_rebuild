//
//  UILabel+setLabel.h
//  zhiboProject
//
//  Created by yuhao on 16/7/19.
//  Copyright © 2016年 yuhao. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface UILabel (setLabel)

//设置字体大小,颜色,位置
+(UILabel *)setMyLabel:(UIFont *)font andColor:(UIColor *)color andTextAlignment:(NSTextAlignment )textAlignment;


//单行获取label的frame
-(CGSize)getSize:(CGSize)size andFont:(UIFont *)font andText:(NSString *)str;

//多行行获取label的frame
-(CGSize)getmultSize:(CGSize)size andFont:(UIFont *)font andText:(NSString *)str;

@property (nonatomic) NSString *verticalText;
@end
