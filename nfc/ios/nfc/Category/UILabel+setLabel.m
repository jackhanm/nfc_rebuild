//
//  UILabel+setLabel.m
//  zhiboProject
//
//  Created by yuhao on 16/7/19.
//  Copyright © 2016年 yuhao. All rights reserved.
//

#import "UILabel+setLabel.h"

@implementation UILabel (setLabel)

+(UILabel *)setMyLabel:(UIFont *)font andColor:(UIColor *)color andTextAlignment:(NSTextAlignment)textAlignment{
    UILabel *label=[[UILabel alloc]init];
    label.font=font;
    label.textColor=color;
    label.textAlignment=textAlignment;
    return label;
    
}
- (NSString *)verticalText{
    // 利用runtime添加属性
    return objc_getAssociatedObject(self, @selector(verticalText));
}

- (void)setVerticalText:(NSString *)verticalText{
    objc_setAssociatedObject(self, &verticalText, verticalText, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    NSMutableString *str = [[NSMutableString alloc] initWithString:verticalText];
    NSInteger count = str.length;
    for (int i = 1; i < count; i ++) {
        [str insertString:@"\n" atIndex:i*2-1];
    }
    self.text = str;
    self.numberOfLines = 0;
}




//单行获取
-(CGSize)getSize:(CGSize)size andFont:(UIFont *)font andText:(NSString *)str{
    NSDictionary *attributes1 = @{NSFontAttributeName:font,
                                  NSForegroundColorAttributeName:[UIColor blackColor]
                                  };
    CGSize titleSize = [str boundingRectWithSize:size options:NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading attributes:attributes1 context:nil].size;
    CGSize resultSize=CGSizeMake(titleSize.width+5, titleSize.height);
    return resultSize;

}

//多行获取
-(CGSize)getmultSize:(CGSize)size andFont:(UIFont *)font andText:(NSString *)str{
    
    NSDictionary *attributes1 = @{NSFontAttributeName:font,
                                  NSForegroundColorAttributeName:[UIColor blackColor]
                                  };
    self.numberOfLines = 0;//多行显示，计算高度
    CGSize titleSize = [str boundingRectWithSize:size options:NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading attributes:attributes1 context:nil].size;
    return titleSize;
}

@end
