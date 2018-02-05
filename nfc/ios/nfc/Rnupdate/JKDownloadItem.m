//
//  JKDownloadItem.m
//  nfc
//
//  Created by 余浩 on 2018/2/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKDownloadItem.h"
#import <objc/runtime.h>
#import "JKDownloadSession.h"

@implementation JKDownloadItem

#pragma mark - init
-(instancetype)initWithUrl:(NSString *)url fileId:(NSString *)fileId {
  if (self = [super init]) {
    _downloadUrl = url;
    _fileId = fileId;
    _taskId = [JKDownloadTask taskIdForUrl:url fileId:fileId];
    _compatibleKey = [JKDownloadSession downloadSession].downloadVersion;
  }
  return self;
}
+(instancetype)itemWithUrl:(NSString *)url fileId:(NSString *)fileId {
  return [[JKDownloadItem alloc] initWithUrl:url fileId:fileId];
}

#pragma mark - JKDownloadSessionDelegate
- (void)downloadProgress:(JKDownloadTask *)task downloadedSize:(NSUInteger)downloadedSize fileSize:(NSUInteger)fileSize {
  self.downloadedSize = downloadedSize;
  if ([self.delegate respondsToSelector:@selector(downloadItem:downloadedSize:totalSize:)]) {
    [self.delegate downloadItem:self downloadedSize:downloadedSize totalSize:fileSize];
  }
}

- (void)downloadStatusChanged:(JKDownloadStatus)status downloadTask:(JKDownloadTask *)task {
  
  if (status == JKDownloadStatusFinished) {
    self.downloadedSize = self.fileSize;
  }
  self.downloadStatus = status;
  if ([self.delegate respondsToSelector:@selector(downloadItemStatusChanged:)]) {
    [self.delegate downloadItemStatusChanged:self];
  }
  //通知优先级最后，不与上面的finished重合
  if (status == JKDownloadStatusFinished) {
    [[NSNotificationCenter defaultCenter] postNotificationName:kDownloadTaskFinishedNoti object:self];
  }
}

- (void)downloadCreated:(JKDownloadTask *)task {
  self.downloadStatus = JKDownloadStatusDownloading;
  if(task.fileSize > 0){
    self.fileSize = task.fileSize;
  }
  _saveName = task.saveName;
  [[NSNotificationCenter defaultCenter] postNotificationName:kDownloadNeedSaveDataNoti object:nil userInfo:nil];
}


#pragma mark - public

- (NSString *)savePath {
  return [JKDownloadTask savePathWithSaveName:self.saveName];
}



#pragma mark - private



///  解档
- (instancetype)initWithCoder:(NSCoder *)coder
{
  if (self = [super init]) {
    
    unsigned int count = 0;
    
    Ivar *ivars = class_copyIvarList([self class], &count);
    
    for (NSInteger i=0; i<count; i++) {
      
      Ivar ivar = ivars[i];
      NSString *name = [[NSString alloc] initWithUTF8String:ivar_getName(ivar)];
      if([name isEqualToString:@"_delegate"]) continue;
      id value = [coder decodeObjectForKey:name];
      if(value) [self setValue:value forKey:name];
    }
    
    free(ivars);
  }
  return self;
}

///  归档
- (void)encodeWithCoder:(NSCoder *)coder
{
  
  unsigned int count = 0;
  
  Ivar *ivars = class_copyIvarList([self class], &count);
  
  for (NSInteger i=0; i<count; i++) {
    
    Ivar ivar = ivars[i];
    NSString *name = [[NSString alloc] initWithUTF8String:ivar_getName(ivar)];
    if([name isEqualToString:@"_delegate"]) continue;
    id value = [self valueForKey:name];
    if(value) [coder encodeObject:value forKey:name];
  }
  
  free(ivars);
}

@end

