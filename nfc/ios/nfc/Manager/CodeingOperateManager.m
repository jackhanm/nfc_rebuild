//
//  CodeingOperateManager.m
//  kuaichecaifu
//
//  Created by 余浩 on 2017/10/7.
//  Copyright © 2017年 ct. All rights reserved.
//

#import "CodeingOperateManager.h"

//全局变量
static CodeingOperateManager *_instance=nil;
@implementation CodeingOperateManager
+(instancetype)shareManager{
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        _instance=[[super allocWithZone:NULL] init];
    });
    
    return _instance;
}

+(id) allocWithZone:(struct _NSZone *)zone
{
    return [CodeingOperateManager shareManager];
}

-(id) copyWithZone:(struct _NSZone *)zone
{
    return [CodeingOperateManager shareManager];
}
//分享到微信
-(void)shareToWx:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content{
    NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];
    
//    //设置微信好友和微信朋友圈的分享数据
//
//
//    if (picture) {
//
//
//
//        [UMSocialData defaultData].extConfig.wechatSessionData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.wechatSessionData.title = name;
//        //     UMSocialUrlResource * imgUrl = [[UMSocialUrlResource alloc] initWithSnsResourceType:(UMSocialUrlResourceTypeImage) url:self.shareImage];
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToWechatSession]
//                                                            content:content
//                                                              image:picture
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//
//
//    }else {
//        [UMSocialData defaultData].extConfig.wechatSessionData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.wechatSessionData.title = name;
//        //     UMSocialUrlResource * imgUrl = [[UMSocialUrlResource alloc] initWithSnsResourceType:(UMSocialUrlResourceTypeImage) url:self.shareImage];
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToWechatSession]
//                                                            content:content
//                                                              image:shareImg
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }
}
//分享到微信朋友圈
-(void)shareToWechatTimeline:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content{
    
    
//    if (picture) {
//
//        NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];
//        [UMSocialData defaultData].extConfig.wechatTimelineData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.wechatTimelineData.title = name;
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToWechatTimeline]
//                                                            content:content
//                                                              image:picture
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//
//
//    }else{
//
//        NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];
//        [UMSocialData defaultData].extConfig.wechatTimelineData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.wechatTimelineData.title = name;
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToWechatTimeline]
//                                                            content:content
//                                                              image:shareImg
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }
    
}

//分享到qq
-(void)shareToQq:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture pictureurl:(NSString *)str content:(NSString *)content{
    NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];    JKLog(@"%@",sharelinkUrl);
    JKLog(@"%@",picture);
    //    NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:picture]];
    //    UIImage * image = [UIImage imageWithData:data];
    //    if (!image) {
    //        image =  [UIImage imageNamed:@"180"];
    //    }
//    if (picture) {
//
//
//        [UMSocialData defaultData].extConfig.qqData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.qqData.title = name;
//
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToQQ]
//                                                            content:content
//                                                              image:picture
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }else{
//
//        [UMSocialData defaultData].extConfig.qqData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.qqData.title = name;
//
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToQQ]
//                                                            content:content
//                                                              image:shareImg
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }
}


//分享到qq空间
-(void)shareToQqZone:(UIViewController *)wself andLinkUrl:(NSString *)linkUrl name:(NSString *)name picture:(NSData *)picture content:(NSString *)content{
    
    
//    if (picture) {
//
//
//        NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];
//        [UMSocialData defaultData].extConfig.qzoneData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.qzoneData.title = name;
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToQzone]
//                                                            content:content
//                                                              image:picture
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }else{
//
//        NSString *sharelinkUrl=[NSString stringWithFormat:@"%@",linkUrl];
//        [UMSocialData defaultData].extConfig.qzoneData.url = sharelinkUrl;
//        [UMSocialData defaultData].extConfig.qzoneData.title = name;
//        [[UMSocialDataService defaultDataService]  postSNSWithTypes:@[UMShareToQzone]
//                                                            content:content
//                                                              image:shareImg
//                                                           location:nil
//                                                        urlResource:nil
//                                                presentedController:wself completion:^(UMSocialResponseEntity *response){
//                                                    if (response.responseCode == UMSResponseCodeSuccess) {
//                                                        if ([self.delegate respondsToSelector:@selector(shareSuccess)]) {
//                                                            [self.delegate shareSuccess];
//                                                        }
//                                                    }
//                                                    else{
//                                                        if ([self.delegate respondsToSelector:@selector(shareFailed)]) {
//                                                            [self.delegate shareFailed];
//                                                        }
//                                                    }
//                                                }];
//    }
}

//复制链接
-(void)copyLink:(NSString *)string{
//    NSString *sharelinkUrl=[NSString stringWithFormat:@"%@%@%@",shareUrl,string,sharesuffix];
//    //NSString *sharelinkUrl=[NSString stringWithFormat:@"%@%@",shareUrl,string];
//    UIPasteboard*pasteboard = [UIPasteboard generalPasteboard];
//    pasteboard.string=sharelinkUrl;
//    [[UnReadShopCarInfoSingleton shareInstance] showTitle:@"复制成功" andFrameWidth:200];
    
}

@end
