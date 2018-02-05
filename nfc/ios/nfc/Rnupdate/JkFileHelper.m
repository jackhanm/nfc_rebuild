//
//  JkFileHelper.m
//  kuaichecaifuRn
//
//  Created by 余浩 on 2017/12/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "JkFileHelper.h"

@implementation JkFileHelper
+(JkFileHelper*)shared{
  static JkFileHelper *sharedMyManager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedMyManager = [[[self class] alloc] init];
  });
  return sharedMyManager;
}

-(void)downloadFileWithURLString:(NSString*)urlString zipName:(NSString *)zipName CacheLocal:(NSString *)localtion finish:(FinishBlock)finish 
{
 
  NSURL * url = [NSURL URLWithString:urlString];
  //默认ConfigObject
  NSURLSessionConfiguration *defaultConfigObject = [NSURLSessionConfiguration defaultSessionConfiguration];
  //支持后台下载的ConfigObject
 // NSURLSessionConfiguration *sessionCon = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:self.downloadUrl];
  NSURLSession *defaultSession = [NSURLSession sessionWithConfiguration: defaultConfigObject delegate:self delegateQueue: [NSOperationQueue mainQueue]];
  NSURLSessionDownloadTask * downloadTask =[defaultSession downloadTaskWithURL:url completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error)
                                            {
                                             
                                              if(error == nil)
                                              {
                                                NSLog(@"Temporary file =%@",location);
                                                NSError *err = nil;
                                                NSFileManager *fileManager = [NSFileManager defaultManager];
                                                NSString *docsDir = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],localtion];
                            
                                                NSString *filePath = [NSString stringWithFormat:@"%@/\%@",docsDir,[NSString stringWithFormat:@"%@.zip",zipName]];
                                                NSURL *docsDirURL = [NSURL fileURLWithPath:filePath];
                                                if([fileManager fileExistsAtPath:filePath]){
                                                  [fileManager removeItemAtURL:docsDirURL error:nil];
                                                }
                                                if ([fileManager moveItemAtURL:location
                                                                         toURL:docsDirURL
                                                                         error: &err])
                                                {
                                                  NSLog(@"File is saved to =%@",docsDirURL.absoluteString);
                                                  finish(1,filePath);
                                                }
                                                else
                                                {
                                                  NSLog(@"failed to move: %@",[err userInfo]);
                                                  finish(0,nil);
                                                }
                                              }
                                            }];
  [downloadTask resume];
}


- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
{
  NSLog(@"下载过程中会多次调用, 每次下载不一定多大的数据");
  NSLog(@"本次下载大小:%.2fKB, 已经下载大小:%.2fKB, 总大小:%.2fKB", bytesWritten / 1024.0, totalBytesWritten / 1024.0, totalBytesExpectedToWrite / 1024.0);
  
  
  //  self.progressv.progress = (float)totalBytesWritten / totalBytesExpectedToWrite;
  
  
  
}
- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location
{
  
  NSLog(@"下载完毕时调用");
  NSString *cach = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject];
  
  //自定义名字
//  NSString *file = [cach stringByAppendingPathComponent:@"waning"];
  //系统命名推荐
  //    NSString *file = [cach stringByAppendingPathComponent:downloadTask.response.suggestedFilename];
  
//  NSFileManager *mrc = [NSFileManager defaultManager];
  
//  [mrc moveItemAtPath:location.path toPath:file error:nil];
  
  
}
@end
