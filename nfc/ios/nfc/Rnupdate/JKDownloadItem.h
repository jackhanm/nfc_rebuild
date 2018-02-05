//
//  JKDownloadItem.h
//  nfc
//
//  Created by 余浩 on 2018/2/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JKDownloadTask.h"
@class JKDownloadItem;

/**某一的任务下载完成的通知*/
static NSString * const kDownloadTaskFinishedNoti = @"kDownloadTaskFinishedNoti";
/**保存下载数据通知*/
static NSString * const kDownloadNeedSaveDataNoti = @"kDownloadNeedSaveDataNoti";

@protocol JKDownloadItemDelegate <NSObject>

@optional
- (void)downloadItemStatusChanged:(JKDownloadItem *)item;
- (void)downloadItem:(JKDownloadItem *)item downloadedSize:(int64_t)downloadedSize totalSize:(int64_t)totalSize;

@end

@interface JKDownloadItem : NSObject<JKDownloadTaskDelegate>

-(instancetype)initWithUrl:(NSString *)url fileId:(NSString *)fileId;
+(instancetype)itemWithUrl:(NSString *)url fileId:(NSString *)fileId;

/**下载任务标识*/
@property (nonatomic, copy,readonly) NSString *fileId;
@property (nonatomic, copy,readonly) NSString *downloadUrl;
@property (nonatomic, copy, readonly) NSString *taskId;
@property (nonatomic, weak) id <JKDownloadItemDelegate> delegate;
@property (nonatomic, copy) NSString *fileName;
@property (nonatomic, copy) NSString *thumbImageUrl;
/**下载完成后保存在本地的路径*/
@property (nonatomic, readonly) NSString *savePath;
@property (nonatomic, assign) NSUInteger fileSize;
@property (nonatomic, assign) NSUInteger downloadedSize;
@property (nonatomic, assign) JKDownloadStatus downloadStatus;
@property (nonatomic, copy, readonly) NSString *saveName;
@property (nonatomic, copy) NSString *compatibleKey;


@end

