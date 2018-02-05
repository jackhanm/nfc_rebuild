//
//  NSString+Number.h
//  工具类
//
//  Created by yuhao on 16/10/31.
//  Copyright © 2016年 desunrie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (Number)
#pragma mark - 判断是不是邮箱
//判断是不是邮箱
- (BOOL)isEmail;

#pragma mark - 判断是不是手机号
//判断是不是手机号
- (BOOL)isPhone;

#pragma mark - 判断是不是固定电话
//判断是不是固定电话
- (BOOL)isLandlinePhone;

#pragma mark - 判断是不是身份证号
//判断是不是身份证号
- (BOOL)isPersonID;

#pragma mark - 判断是不是纯数字
//通过『正则表达式』判断
- (BOOL)isNumberByRegExp;

//通过『ASCII码』判断
- (BOOL)isNumberByASCII;

//通过『字符范围』判断
- (BOOL)isNumberByRange;

//是否是5-24个字符(数字和英文)
+(BOOL)passwordIsCoorrect:(NSString *)text;

#pragma mark - 16位 小写
+(NSString *)MD5ForLower16Bate:(NSString *)str;

//图片地址处理
+(NSString *)klimageUrl:(NSString *)imgUrl;

//获取设备类型和版本
+(NSString *)iphoneType;
+(NSString *)getDeviceName;
//手机号获取验证码，手机号加密
+(NSString *)getChptchaRSAPhone:(NSString *)phone;
+ (NSString *)getCurrentTime;
@end
