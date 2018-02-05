//
//  CodeingOperateManager.h
//  kuaichecaifu
//
//  Created by 余浩 on 2017/10/7.
//  Copyright © 2017年 ct. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CodeingOperateManager : NSObject
+(instancetype)shareManager;

//分享到微信
-(void)shareToWx:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content;

//分享到微信朋友圈
-(void)shareToWechatTimeline:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content;

//分享到qq
-(void)shareToQq:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture pictureurl:(NSString *)str content:(NSString *)content;

//分享到qq空间
-(void)shareToQqZone:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content;

//复制链接
-(void)copyLink:(NSString *)string;
@end
