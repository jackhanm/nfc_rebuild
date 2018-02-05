//
//  JkFileHelper.h
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void(^FinishBlock) (NSInteger status,id data);
@interface JkFileHelper : NSObject<NSURLSessionDelegate,NSURLSessionDownloadDelegate,NSURLSessionTaskDelegate>
+(JkFileHelper*)shared;


-(void)downloadFileWithURLString:(NSString*)urlString zipName:(NSString *)zipName CacheLocal:(NSString *)localtion finish:(FinishBlock)finish;
@end
