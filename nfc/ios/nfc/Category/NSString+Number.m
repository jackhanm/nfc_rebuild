//
//  NSString+Number.m
//  工具类
//
//  Created by yuhao on 16/10/31.
//  Copyright © 2016年 desunire. All rights reserved.
//

#import "NSString+Number.h"
#import "CommonCrypto/CommonDigest.h"
#import <CommonCrypto/CommonCrypto.h>
#import <sys/utsname.h>

@implementation NSString (Number)

//判断是不是邮箱
- (BOOL)isEmail {
    
    NSString *emailRegex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}";
    
    NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES%@",emailRegex];
    
    return [emailTest evaluateWithObject:self];
}

#pragma mark - 判断是不是手机号
//判断是不是手机号
- (BOOL)isPhone {
    
    NSString *pattern = @"^1[3578]\\d{9}$";
    
    NSRegularExpression *regex = [[NSRegularExpression alloc] initWithPattern:pattern options:0 error:nil];
    
    NSArray *results = [regex matchesInString:self options:0 range:NSMakeRange(0, self.length)];
    
    return results.count > 0;
}

#pragma mark - 判断是不是固定电话
//判断是不是固定电话
- (BOOL)isLandlinePhone {
    
    NSString *mobile = @"0\\d{2,3}-\\d{5,9}|0\\d{2,3}-\\d{5,9}";
    
    NSPredicate *regextestmobile = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",mobile];
    
    return [regextestmobile evaluateWithObject:self];
}

#pragma mark - 判断是不是身份证号
//判断是不是身份证号
- (BOOL)isPersonID {
    
    NSString *person = @"(\\d{14}[0-9a-zA-Z])|(\\d{17}[0-9a-zA-Z])";
    
    NSPredicate *regextestmobile = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",person];

    return [regextestmobile evaluateWithObject:self];
}

#pragma mark - 判断是不是纯数字
//通过『正则表达式』判断
- (BOOL)isNumberByRegExp {
     BOOL isValid = YES;
     NSUInteger len = self.length;
     if (len > 0) {
         NSString *numberRegex = @"^[0-9]*$";
         NSPredicate *numberPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", numberRegex];
         isValid = [numberPredicate evaluateWithObject:self];
     }
     return isValid;
}

//通过『ASCII码』判断
- (BOOL)isNumberByASCII {
    BOOL isValid = YES;
     NSUInteger len = self.length;
     if (len > 0) {
         for (NSUInteger i=0; i<len; i++) {
             NSUInteger asciiCode = [self characterAtIndex:i];
             if (asciiCode < 48 || asciiCode > 57) {
                 isValid = NO;
                 break;
             }
         }
    }
    return isValid;
}

//通过『字符范围』判断
- (BOOL)isNumberByRange {
     BOOL isValid = YES;
     NSUInteger len = self.length;
     if (len > 0) {
         NSCharacterSet *validNumberCS = [NSCharacterSet characterSetWithCharactersInString:@"0123456789"];
         NSUInteger singleStrIndex = 0;
         do {
             NSString *singleStr = [self substringWithRange:NSMakeRange(singleStrIndex, 1)];
             NSRange range = [singleStr rangeOfCharacterFromSet:validNumberCS];
             if (range.length == 0) {
                 isValid = NO;
                 break;
             }
             singleStrIndex++;
         } while (singleStrIndex < len);
     }
     return isValid;
}

//是否是6-20个字符(数字和英文)
+(BOOL)passwordIsCoorrect:(NSString *)text{
    NSString * regex = @"^[A-Za-z0-9]{6,20}$";
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    BOOL isMatch = [pred evaluateWithObject:text];
    return isMatch;
}

#pragma mark - 16位 小写
+(NSString *)MD5ForLower16Bate:(NSString *)str{
    
    const char* input = [str UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(input, (CC_LONG)strlen(input), result);
    NSMutableString *digest = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for (NSInteger i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
        [digest appendFormat:@"%02x", result[i]];
    }
    
    return digest;
}
#pragma mark
//图片地址处理 ip修改http://183.166.59.102:8086 为 http://api.uhuiq.com:8086

    
   
+(NSString *)getDeviceName

{
    
    struct utsname systemInfo;
    
    uname(&systemInfo);
    
    NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    
    if ([deviceString isEqualToString:@"iPhone3,1"]) return @"iPhone 4";
    
    if ([deviceString isEqualToString:@"iPhone3,2"]) return @"iPhone 4";
    
    if ([deviceString isEqualToString:@"iPhone3,3"]) return @"iPhone 4";
    
    if ([deviceString isEqualToString:@"iPhone4,1"])  return @"iPhone 4S";
    
    if ([deviceString isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
    
    if ([deviceString isEqualToString:@"iPhone5,2"])    return @"iPhone 5 ";
    
    if ([deviceString isEqualToString:@"iPhone5,3"])    return @"iPhone 5c ";
    
    if ([deviceString isEqualToString:@"iPhone5,4"])    return @"iPhone 5c ";
    
    if ([deviceString isEqualToString:@"iPhone6,1"])    return @"iPhone 5s ";
    
    if ([deviceString isEqualToString:@"iPhone6,2"])    return @"iPhone 5s ";
    
    if ([deviceString isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
    
    if ([deviceString isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
    
    if ([deviceString isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
    
    if ([deviceString isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
    
    if ([deviceString isEqualToString:@"iPhone8,4"])    return @"iPhone SE";
    
    // 日行两款手机型号均为日本独占，可能使用索尼FeliCa支付方案而不是苹果支付
    
    if ([deviceString isEqualToString:@"iPhone9,1"])    return @"iPhone 7";
    
    if ([deviceString isEqualToString:@"iPhone9,2"])    return @"iPhone 7 Plus";
    
    if ([deviceString isEqualToString:@"iPhone9,3"])    return @"iPhone 7";
    
    if ([deviceString isEqualToString:@"iPhone9,4"])    return @"iPhone 7 Plus";
    
    if ([deviceString isEqualToString:@"iPod1,1"])      return @"iPod Touch 1G";
    
    if ([deviceString isEqualToString:@"iPod2,1"])      return @"iPod Touch 2G";
    
    if ([deviceString isEqualToString:@"iPod3,1"])      return @"iPod Touch 3G";
    
    if ([deviceString isEqualToString:@"iPod4,1"])      return @"iPod Touch 4G";
    
    if ([deviceString isEqualToString:@"iPod5,1"])      return @"iPod Touch ";
    
    if ([deviceString isEqualToString:@"iPad1,1"])      return @"iPad";
    
    if ([deviceString isEqualToString:@"iPad1,2"])      return @"iPad 3G";
    
    if ([deviceString isEqualToString:@"iPad2,1"])      return @"iPad 2";
    
    if ([deviceString isEqualToString:@"iPad2,2"])      return @"iPad 2";
    
    if ([deviceString isEqualToString:@"iPad2,3"])      return @"iPad 2 ";
    
    if ([deviceString isEqualToString:@"iPad2,4"])      return @"iPad 2";
    
    if ([deviceString isEqualToString:@"iPad2,5"])      return @"iPad Mini ";
    
    if ([deviceString isEqualToString:@"iPad2,6"])      return @"iPad Mini";
    
    if ([deviceString isEqualToString:@"iPad2,7"])      return @"iPad Mini ";
    
    if ([deviceString isEqualToString:@"iPad3,1"])      return @"iPad 3 ";
    
    if ([deviceString isEqualToString:@"iPad3,2"])      return @"iPad 3 ";
    
    if ([deviceString isEqualToString:@"iPad3,3"])      return @"iPad 3";
    
    if ([deviceString isEqualToString:@"iPad3,4"])      return @"iPad 4 ";
    
    if ([deviceString isEqualToString:@"iPad3,5"])      return @"iPad 4";
    
    if ([deviceString isEqualToString:@"iPad3,6"])      return @"iPad 4 ";
    
    if ([deviceString isEqualToString:@"iPad4,1"])      return @"iPad Air ";
    
    if ([deviceString isEqualToString:@"iPad4,2"])      return @"iPad Air ";
    
    if ([deviceString isEqualToString:@"iPad4,4"])      return @"iPad Mini 2 ";
    
    if ([deviceString isEqualToString:@"iPad4,5"])      return @"iPad Mini 2 ";
    
    if ([deviceString isEqualToString:@"iPad4,6"])      return @"iPad Mini 2";
    
    if ([deviceString isEqualToString:@"iPad4,7"])      return @"iPad Mini 3";
    
    if ([deviceString isEqualToString:@"iPad4,8"])      return @"iPad Mini 3";
    
    if ([deviceString isEqualToString:@"iPad4,9"])      return @"iPad Mini 3";
    
    if ([deviceString isEqualToString:@"iPad5,1"])      return @"iPad Mini 4 ";
    
    if ([deviceString isEqualToString:@"iPad5,2"])      return @"iPad Mini 4 ";
    
    if ([deviceString isEqualToString:@"iPad5,3"])      return @"iPad Air 2";
    
    if ([deviceString isEqualToString:@"iPad5,4"])      return @"iPad Air 2";
    
    if ([deviceString isEqualToString:@"iPad6,3"])      return @"iPad Pro 9.7";
    
    if ([deviceString isEqualToString:@"iPad6,4"])      return @"iPad Pro 9.7";
    
    if ([deviceString isEqualToString:@"iPad6,7"])      return @"iPad Pro 12.9";
    
    if ([deviceString isEqualToString:@"iPad6,8"])      return @"iPad Pro 12.9";
    
    if ([deviceString isEqualToString:@"i386"])        return @"Simulator";
    
    if ([deviceString isEqualToString:@"x86_64"])      return @"Simulator";
    
    return deviceString;
    
}


//获取设备类型和版本
+(NSString *)iphoneType{
    
    struct utsname systemInfo;
    
    uname(&systemInfo);
    
    NSString* phoneVersion = [[UIDevice currentDevice] systemVersion];
    
    NSString *platform = [NSString stringWithCString:systemInfo.machine encoding:NSASCIIStringEncoding];
    
    if ([platform isEqualToString:@"iPhone1,1"]) return [@"iPhone 2G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone1,2"]) return [@"iPhone 3G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone2,1"]) return [@"iPhone 3GS 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone3,1"]) return [@"iPhone 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone3,2"]) return [@"iPhone 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone3,3"]) return [@"iPhone 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone4,1"]) return [@"iPhone 4S 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone5,1"]) return [@"iPhone 5 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone5,2"]) return [@"iPhone 5 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone5,3"]) return [@"iPhone 5c 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone5,4"]) return [@"iPhone 5c 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone6,1"]) return [@"iPhone 5s 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone6,2"]) return [@"iPhone 5s 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone7,1"]) return [@"iPhone 6 Plus 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone7,2"]) return [@"iPhone 6 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone8,1"]) return [@"iPhone 6s 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone8,2"]) return [@"iPhone 6s Plus 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone8,4"]) return [@"iPhone SE 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone9,1"]) return [@"iPhone 7 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPhone9,2"]) return [@"iPhone 7 Plus 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPod1,1"])   return [@"iPod Touch 1G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPod2,1"])   return [@"iPod Touch 2G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPod3,1"])   return [@"iPod Touch 3G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPod4,1"])   return [@"iPod Touch 4G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPod5,1"])   return [@"iPod Touch 5G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad1,1"])   return [@"iPad 1G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,1"])   return [@"iPad 2 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,2"])   return [@"iPad 2 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,3"])   return [@"iPad 2 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,4"])   return [@"iPad 2 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,5"])   return [@"iPad Mini 1G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,6"])   return [@"iPad Mini 1G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad2,7"])   return [@"iPad Mini 1G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,1"])   return [@"iPad 3 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,2"])   return [@"iPad 3 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,3"])   return [@"iPad 3 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,4"])   return [@"iPad 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,5"])   return [@"iPad 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad3,6"])   return [@"iPad 4 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,1"])   return [@"iPad Air 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,2"])   return [@"iPad Air 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,3"])   return [@"iPad Air 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,4"])   return [@"iPad Mini 2G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,5"])   return [@"iPad Mini 2G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"iPad4,6"])   return [@"iPad Mini 2G 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"i386"])      return [@"iPhone Simulator 系统版本:" stringByAppendingString:phoneVersion];
    
    if ([platform isEqualToString:@"x86_64"])    return [@"iPhone Simulator 系统版本:" stringByAppendingString:phoneVersion];
       
    return platform;
    
   
}
//获取当地时间
+ (NSString *)getCurrentTime {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSString *dateTime = [formatter stringFromDate:[NSDate date]];
    return dateTime;
}

//手机号获取验证码，手机号加密
//+(NSString *)getChptchaRSAPhone:(NSString *)phone{
//    RSAEncryptor* rsaEncryptor = [[RSAEncryptor alloc] init];
//    NSString* publicKeyPath = [[NSBundle mainBundle] pathForResource:@"public_sun_key" ofType:@"der"];
//    NSString* privateKeyPath = [[NSBundle mainBundle] pathForResource:@"private_key" ofType:@"p12"];
//    [rsaEncryptor loadPublicKeyFromFile: publicKeyPath];
//    [rsaEncryptor loadPrivateKeyFromFile: privateKeyPath password:@"s1234567"];    // 这里，请换成你生成p12时的密码
//    NSString* restrinBASE64STRING = [rsaEncryptor rsaEncryptString:phone];
//    KLLog(@"手机号加密：Encrypted: %@", restrinBASE64STRING);
//    return restrinBASE64STRING;
//    //NSString* decryptString = [rsaEncryptor rsaDecryptString: restrinBASE64STRING];
//    //NSLog(@"Decrypted: %@", decryptString);
//}




@end
