//
//  UIImage+ColorChange.m
//  KuaiCheCaiFu
//
//  Created by 叶秋 on 16/2/23.
//  Copyright © 2016年 ChangTian. All rights reserved.
//

#import "UIImage+ColorChange.h"

@implementation UIImage (ColorChange)

+(UIImage*) createImageWithColor:(UIColor*) color
{
    CGRect rect=CGRectMake(0.0f, 0.0f, 1.0f, 1.0f);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}    

@end
