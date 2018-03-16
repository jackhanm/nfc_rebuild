//
//  JKDownloadManager.m
//  nfc
//
//  Created by 余浩 on 2018/2/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKDownloadManager.h"
#import <DiffMatchPatch.h>
#define kCommonUtilsGigabyte (1024 * 1024 * 1024)
#define kCommonUtilsMegabyte (1024 * 1024)
#define kCommonUtilsKilobyte 1024

@interface JKDownloadManager ()

@property (nonatomic, strong) NSMutableDictionary *itemsDictM;
/**本地通知开关，默认关,一般用于测试。可以根据通知名称，自定义*/
@property (nonatomic, assign) BOOL localPushOn;

@end

@implementation JKDownloadManager

static id _instance;

#pragma mark - init

+ (instancetype)manager {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [[self alloc] init];
  });
  return _instance;
}

- (instancetype)init {
  if (self = [super init]) {
    [self getDownloadItems];
    if(!self.itemsDictM) self.itemsDictM = [NSMutableDictionary dictionary];
    [self addNotification];
    __block BOOL isNeedSave = false;
    //waing async callback
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      //get cached file size
      [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, JKDownloadItem *  _Nonnull item, BOOL * _Nonnull stop) {
        if (item.downloadStatus == JKDownloadStatusFailed || item.downloadStatus == JKDownloadStatusPaused) {
          JKDownloadTask *task = [JKDownloadSession.downloadSession taskForTaskId:item.taskId];
          item.downloadedSize = task.downloadedSize;
          item.downloadStatus = task.downloadStatus;
          isNeedSave = true;
        }
      }];
      if(isNeedSave) [self saveDownloadItems];
    });
  }
  return self;
}

- (void)saveDownloadItems {
  [NSKeyedArchiver archiveRootObject:self.itemsDictM toFile:[self downloadItemSavePath]];
}

- (void)getDownloadItems {
  NSMutableDictionary *items = [NSKeyedUnarchiver unarchiveObjectWithFile:[self downloadItemSavePath]];;
  
  //app闪退或者手动杀死app，会继续下载。APP再次启动默认暂停所有下载
  [items enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *item = obj;
    //app重新启动，将等待和下载的任务的状态变成暂停
    if (item.downloadStatus == JKDownloadStatusDownloading || item.downloadStatus == JKDownloadStatusWaiting) {
      item.downloadStatus = JKDownloadStatusPaused;
    }
  }];
  
  self.itemsDictM = items;
  
}

- (NSString *)downloadItemSavePath {
  NSString *saveDir = [JKDownloadTask saveDir];
  return [saveDir stringByAppendingPathComponent:@"items.data"];
}

- (void)addNotification {
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(saveDownloadItems) name:kDownloadStatusChangedNoti object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(downloadAllTaskFinished) name:kDownloadAllTaskFinishedNoti object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(downloadTaskFinishedNoti:) name:kDownloadTaskFinishedNoti object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(saveDownloadItems) name:kDownloadNeedSaveDataNoti object:nil];
}


#pragma mark - public


+ (void)setMaxTaskCount:(NSInteger)count {
  [[JKDownloadManager manager] setMaxTaskCount: count];
}


+ (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl{
  [[JKDownloadManager manager] startDownloadWithUrl:downloadURLString fileName:fileName imageUrl:imagUrl];
}

+ (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl fileId:(NSString *)fileId{
  [[JKDownloadManager manager] startDownloadWithUrl:downloadURLString fileName:fileName imageUrl:imagUrl fileId:fileId];
}

+ (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl fileId:(NSString *)fileId md5:(NSString *)md5 destinPath:(NSString *)destinPath type:(NSString *)type{
  [[JKDownloadManager manager] startDownloadWithUrl:downloadURLString fileName:fileName imageUrl:imagUrl fileId:fileId md5:md5 destinPath:destinPath type:type];
}


+ (void)pauseDownloadWithItem:(JKDownloadItem *)item {
  [[JKDownloadManager manager] pauseDownloadWithItem:item];
}


+ (void)resumeDownloadWithItem:(JKDownloadItem *)item {
  [[JKDownloadManager manager] resumeDownloadWithItem:item];
}

+ (void)stopDownloadWithItem:(JKDownloadItem *)item {
  [[JKDownloadManager manager] stopDownloadWithItem:item];
}

/**
 暂停所有的下载
 */
+ (void)pauseAllDownloadTask {
  [[JKDownloadManager manager] pauseAllDownloadTask];
}

+ (void)resumeAllDownloadTask {
  [[JKDownloadManager manager] resumeAllDownloadTask];
}

+ (void)removeAllCache {
  [[JKDownloadManager manager] removeAllCache];
}

+ (NSArray *)downloadList {
  return [[JKDownloadManager manager] downloadList];
}
+ (NSArray *)finishList {
  return [[JKDownloadManager manager] finishList];
}

+ (BOOL)isDownloadWithId:(NSString *)downloadId {
  return [[self manager] isDownloadWithId:downloadId];
}

+ (JKDownloadStatus)downloasStatusWithId:(NSString *)downloadId {
  return [[self manager] downloasStatusWithId:downloadId];
}

+ (JKDownloadItem *)downloadItemWithId:(NSString *)downloadId {
  return [[self manager] itemWithIdentifier:downloadId];
}

+(void)allowsCellularAccess:(BOOL)isAllow {
  [[JKDownloadManager manager] allowsCellularAccess:isAllow];
}

+(void)localPushOn:(BOOL)isOn {
  [[JKDownloadManager manager] localPushOn:isOn];
}

#pragma mark tools
+(BOOL)isAllowsCellularAccess{
  return [[JKDownloadManager manager] isAllowsCellularAccess];
}


+ (NSUInteger)videoCacheSize {
  NSUInteger size = 0;
  NSArray *downloadList = [self downloadList];
  NSArray *finishList = [self finishList];
  for (JKDownloadTask *task in downloadList) {
    size += task.downloadedSize;
  }
  for (JKDownloadTask *task in finishList) {
    size += task.fileSize;
  }
  return size;
  
}
+ (NSUInteger)fileSystemFreeSize {
  NSUInteger totalFreeSpace = 0;
  NSError *error = nil;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSDictionary *dictionary = [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: &error];
  
  if (dictionary) {
    NSNumber *freeFileSystemSizeInBytes = [dictionary objectForKey:NSFileSystemFreeSize];
    totalFreeSpace = [freeFileSystemSizeInBytes unsignedIntegerValue];
  }
  return totalFreeSpace;
}

+ (void)saveDownloadStatus {
  [[JKDownloadManager manager] saveDownloadItems];
}
+ (NSString *)fileSizeStringFromBytes:(uint64_t)byteSize {
  if (kCommonUtilsGigabyte <= byteSize) {
    return [NSString stringWithFormat:@"%@GB", [self numberStringFromDouble:(double)byteSize / kCommonUtilsGigabyte]];
  }
  if (kCommonUtilsMegabyte <= byteSize) {
    return [NSString stringWithFormat:@"%@MB", [self numberStringFromDouble:(double)byteSize / kCommonUtilsMegabyte]];
  }
  if (kCommonUtilsKilobyte <= byteSize) {
    return [NSString stringWithFormat:@"%@KB", [self numberStringFromDouble:(double)byteSize / kCommonUtilsKilobyte]];
  }
  return [NSString stringWithFormat:@"%zdB", byteSize];
}


+ (NSString *)numberStringFromDouble:(const double)num {
  NSInteger section = round((num - (NSInteger)num) * 100);
  if (section % 10) {
    return [NSString stringWithFormat:@"%.2f", num];
  }
  if (section > 0) {
    return [NSString stringWithFormat:@"%.1f", num];
  }
  return [NSString stringWithFormat:@"%.0f", num];
}

#pragma mark - private

- (void)setMaxTaskCount:(NSInteger)count{
  [JKDownloadSession downloadSession].maxTaskCount = count;
}

- (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl {
  
  [self startDownloadWithUrl:downloadURLString fileName:fileName imageUrl:imagUrl fileId:downloadURLString];
}

//下载文件时候的保存名称，如果没有fileid那么必须 savename = nil
- (NSString *)saveNameForItem:(JKDownloadItem *)item {
  
  NSString *saveName = [item.downloadUrl isEqualToString:item.fileId] ? nil : item.fileId;
  return saveName;
}


- (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl fileId:(NSString *)fileId{
  
  if (downloadURLString.length == 0 && fileId.length == 0) return;
  NSString *taskId = [JKDownloadTask taskIdForUrl:downloadURLString fileId:fileId];
  JKDownloadItem *item = [self.itemsDictM valueForKey:taskId];
  if (item == nil) {
    
    item = [[JKDownloadItem alloc] initWithUrl:downloadURLString fileId:fileId];
    item.downloadStatus = JKDownloadStatusDownloading;
    item.fileName = fileName;
    item.thumbImageUrl = imagUrl;
    [self.itemsDictM setValue:item forKey:taskId];
  }
  [JKDownloadSession.downloadSession startDownloadWithUrl:downloadURLString fileId:fileId delegate:item];
}
- (void)startDownloadWithUrl:(NSString *)downloadURLString fileName:(NSString *)fileName imageUrl:(NSString *)imagUrl fileId:(NSString *)fileId md5:(NSString *)md5 destinPath:(NSString *)destinPath type:(NSString *)type{
  
  if (downloadURLString.length == 0 && fileId.length == 0) return;
  NSString *taskId = [JKDownloadTask taskIdForUrl:downloadURLString fileId:fileId];
  JKDownloadItem *item = [self.itemsDictM valueForKey:taskId];
  if (item == nil) {
    item = [[JKDownloadItem alloc] initWithUrl:downloadURLString fileId:fileId];
  }
    
  
    item.downloadStatus = JKDownloadStatusDownloading;
    item.fileName = fileName;
    item.thumbImageUrl = imagUrl;
    item.md5=md5;
    item.destinPath = destinPath;
    item.type = type;
    [self.itemsDictM setValue:item forKey:taskId];
  
  [JKDownloadSession.downloadSession startDownloadWithUrl:downloadURLString fileId:fileId delegate:item];
}


- (void)resumeDownloadWithItem:(JKDownloadItem *)item{
  item.downloadStatus = JKDownloadStatusDownloading;
  
  if(item.compatibleKey.length>0){
    JKDownloadTask *task = [JKDownloadSession.downloadSession taskForTaskId:item.taskId];
    task.delegate = item;
    [JKDownloadSession.downloadSession resumeDownloadWithTaskId:item.taskId];
  }else{
    JKDownloadTask *task = [JKDownloadSession.downloadSession taskForTaskId:item.downloadUrl];
    task.delegate = item;
    //TODO: compatiable 1.0.0
    [JKDownloadSession.downloadSession resumeDownloadWithTaskId:item.taskId.length==0 ? item.downloadUrl : item.taskId];
  }
  [self saveDownloadItems];
}


- (void)pauseDownloadWithItem:(JKDownloadItem *)item {
  item.downloadStatus = JKDownloadStatusPaused;
  
  if(item.compatibleKey.length>0){
    [JKDownloadSession.downloadSession pauseDownloadWithTaskId:item.taskId];
  }else{
    //TODO: compatiable 1.0.0
    [JKDownloadSession.downloadSession pauseDownloadWithTaskId:item.taskId.length==0 ? item.downloadUrl : item.taskId];
  }
  [self saveDownloadItems];
}

- (void)stopDownloadWithItem:(JKDownloadItem *)item {
  if (item == nil )  return;
  [JKDownloadSession.downloadSession stopDownloadWithTaskId:item.taskId.length == 0 ? item.downloadUrl : item.taskId];
  //TODO: compatiable 1.0.0 [self.itemsDictM removeObjectForKey: item.taskId];
  [self.itemsDictM removeObjectForKey:item.taskId.length == 0 ? item.downloadUrl : item.taskId];
  [self saveDownloadItems];
}

- (void)pauseAllDownloadTask {
  [[JKDownloadSession downloadSession] pauseAllDownloadTask];
}

- (void)removeAllCache {
  [self.itemsDictM.copy enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, JKDownloadItem *  _Nonnull obj, BOOL * _Nonnull stop) {
    [self stopDownloadWithItem:obj];
  }];
}

- (void)resumeAllDownloadTask{
  [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *item = obj;
    if (item.downloadStatus == JKDownloadStatusPaused || item.downloadStatus == JKDownloadStatusFailed) {
      [self resumeDownloadWithItem:item];
    }
  }];
}

-(NSArray *)downloadList {
  NSMutableArray *arrM = [NSMutableArray array];
  
  [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *item = obj;
    if(item.downloadStatus != JKDownloadStatusFinished){
      [arrM addObject:item];
    }
  }];
  
  return arrM;
}
- (NSArray *)finishList {
  NSMutableArray *arrM = [NSMutableArray array];
  [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *item = obj;
    if(item.downloadStatus == JKDownloadStatusFinished){
      [arrM addObject:item];
    }
  }];
  return arrM;
}

/**id 可以是downloadUrl，也可以是fileId，首先从fileId开始找，然后downloadUrl*/

- (JKDownloadItem *)itemWithIdentifier:(NSString *)identifier {
  
  __block  JKDownloadItem *item = nil;
  [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *dItem = obj;
    if([dItem.fileId isEqualToString:identifier]){
      item = dItem;
      *stop = true;
    }
  }];
  
  if(item) return item;
  
  [self.itemsDictM enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
    JKDownloadItem *dItem = obj;
    if([dItem.downloadUrl isEqualToString:identifier]){
      item = dItem;
      *stop = true;
    }
  }];
  
  return item;
}

-(void)allowsCellularAccess:(BOOL)isAllow {
  [[JKDownloadSession downloadSession] allowsCellularAccess:isAllow];
}

- (BOOL)isAllowsCellularAccess {
  return [[JKDownloadSession downloadSession] isAllowsCellularAccess];
}

- (BOOL)isDownloadWithId:(NSString *)downloadId {
  
  JKDownloadItem *item = [self itemWithIdentifier:downloadId];
  return item != nil;
}

- (JKDownloadStatus)downloasStatusWithId:(NSString *)downloadId {
  JKDownloadItem *item = [self itemWithIdentifier:downloadId];
  if (!item) {
    return -1;
  }
  return item.downloadStatus;
}

- (void)localPushOn:(BOOL)isOn {
  self.localPushOn = isOn;
}

#pragma mark notificaton

- (void)downloadAllTaskFinished{
  
  JKLog(@"所有的下载任务已完成");
  [self localPushWithTitle:@"JKDownloadSession" detail:@"所有的下载任务已完成！"];
}

- (void)downloadTaskFinishedNoti:(NSNotification *)noti{
   JKLog(@"下载任务已完成");
  JKDownloadItem *item = noti.object;
  if (item) {
    NSString *detail = [NSString stringWithFormat:@"%@ item.fileName，！", item.fileName];
     NSString *detail1 = [NSString stringWithFormat:@"%@  item.thumbImageUrl，！", item.thumbImageUrl];
     NSString *detail2 = [NSString stringWithFormat:@"%@ item.md5，！", item.md5];
     NSString *detail3 = [NSString stringWithFormat:@"%@ destinPath，！", item.destinPath];
     NSString *detail4 = [NSString stringWithFormat:@"%@ savePath，！", item.savePath];
     NSString *detail5 = [NSString stringWithFormat:@"%@ saveName！", item.saveName];
     NSString *detail6 = [NSString stringWithFormat:@"%@ 全量还是增量 ",item.type];
    JKLog(@"%@ %@ %@ %@ %@",detail,detail1,detail2,detail3,detail4,detail5);
    
    
  
    if ([item.type isEqualToString:@"1"] ) {
        [self checkZipwithMd5:item.md5 filename:item.fileName destinpath:item.destinPath savePath:item.savePath savename:item.saveName];
      
    }else{
      [self  checkPatchZipwithMd5:item.md5 filename:item.fileName destinpath:item.destinPath savePath:item.savePath savename:item.saveName baseVersion:item.thumbImageUrl];
    }
    
  }
}
#pragma mark checkmd5 And openzip Full zip
-(void)checkZipwithMd5:(NSString *)md5 filename:(NSString *)filename destinpath:(NSString *)destinpath savePath:(NSString *)savepath savename:(NSString *)savename
{
 
#pragma mark 校验下载文件完整性
      NSString *zipPath =savepath;
      JKLog(@"%@",zipPath);
      JKLog(@"%@", [zipPath getFileMD5WithPath:zipPath]);
      JKLog(@"下载完整");
      if ([md5 isEqualToString:[zipPath getFileMD5WithPath:zipPath]]) {
        
        NSError *error;
        // 解压
  
        
        [SSZipArchive unzipFileAtPath:zipPath toDestination:destinpath overwrite:YES password:nil error:&error];
        if(!error){
          NSLog(@"解压成功");

          
        }else{
          NSLog(@"解压失败");
          [[NSFileManager defaultManager] removeItemAtPath:destinpath error:nil];
          JKLog(@"%@",error);
          
        }
      }else{
#pragma mark 校验失败处理？？？？？
        JKLog(@"校验不成功");
      }
      [[NSFileManager defaultManager] removeItemAtPath:zipPath error:nil];
    }
#pragma mark checkpatchZip And openzip
-(void)checkPatchZipwithMd5:(NSString *)md5 filename:(NSString *)filename destinpath:(NSString *)destinpath savePath:(NSString *)savepath savename:(NSString *)savename baseVersion:(NSString *)baseVersion
{
 
      NSLog(@"下载完成");
      
      NSString *zipPath =savepath;
  JKLog(@"%@",[zipPath getFileMD5WithPath:zipPath]);
      NSError *error;
      // 解压
      if ([md5 isEqualToString:[zipPath getFileMD5WithPath:zipPath]]) {
        //校验zip包成功
        
        [SSZipArchive unzipFileAtPath:zipPath toDestination:destinpath overwrite:YES password:nil error:&error];
        if(!error){
          NSLog(@"解压成功");
          
          [self combinepatchpackage:destinpath baseVersion:baseVersion shouldUpdatedVersion:filename];
          
          
        }else{
          NSLog(@"解压失败");
          JKLog(@"%@",error);
        }
      }else{
        
        
      }
      
      
      
      [[NSFileManager defaultManager] removeItemAtPath:zipPath error:nil];
      JKLog(@"%@",NSHomeDirectory());
  
}

#pragma mark后台合并patch包
-(void)combinepatchpackage:(NSString *)directryPath baseVersion:(NSString *)baseVersion shouldUpdatedVersion:(NSString *)shouldUpdatedVersion{
  
  
  NSString *patchCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"patch"];
  NSString *filePath = [NSString stringWithFormat:@"%@/\%@",patchCachePath,[NSString stringWithFormat:@"%@",shouldUpdatedVersion]];
  NSString *jsversionCachePath1 = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],baseVersion];
  
  NSString *txtPath = [jsversionCachePath1 stringByAppendingPathComponent:@"main.jsbundle"];
  NSString *assetPath = [jsversionCachePath1 stringByAppendingPathComponent:@"assets"];
  NSString *imagePath = [filePath stringByAppendingPathComponent:@"images"];
  // 此时仅存在路径，文件并没有真实存在
  
  //json文件
  NSString *jsonpath = [filePath stringByAppendingPathComponent:@"Detailed.json"];
  if ([[NSFileManager defaultManager] fileExistsAtPath:jsonpath]) {
    NSData *data = [NSData dataWithContentsOfFile:jsonpath];
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
    
    NSString *text1 = [NSString stringWithContentsOfFile:txtPath encoding:NSUTF8StringEncoding error:nil];
    
    
    DiffMatchPatch *dmp = [DiffMatchPatch new];
    //输出差异文件地址
    NSString *patchPath = [filePath stringByAppendingPathComponent:@"patch.txt"];
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:patchPath]) {
      // 读取差异文件
      NSString *resultStr = [NSString stringWithContentsOfFile:patchPath encoding:NSUTF8StringEncoding error:nil];
      // 读取差异文件
      NSMutableArray *patchDataArr =[dmp patch_fromText:resultStr error:nil];
      // 差异文件和原始文件合并生成新的文件
      NSArray *ResultData= [dmp patch_apply:patchDataArr toString:text1];
      NSString *txtPath3 = [filePath stringByAppendingPathComponent:@"main.jsbundle"]; // 此时仅存在路径，文件并没有真实存在
      for (int i =0; i < ResultData.count; i ++) {
        if (i ==0) {
          //bundle文件已经合成 ，下一步
          [ResultData[i] writeToFile:txtPath3 atomically:YES encoding:NSUTF8StringEncoding error:nil];
#pragma mark  读取json文件校验md5
          if ([self readjsonWithDocPath:filePath zipPath:txtPath3]) {
            JKLog(@"patch bundle md5 校验成功");
            [self createJSlistIndoc:txtPath3 baseVersion:baseVersion shouldUpdatedVersion:shouldUpdatedVersion assets:assetPath];
            
          }else{
#pragma mark 合并过后的bundle校验失败
            JKLog(@"patch bundle md5 校验失败");
          }
        }
        
        
        
        //图片资源  将解压后的图片资源插入到doc的文件
        [self movePicwithDic:dic withPath:assetPath OriPath:imagePath];
        
        
        
        
        
        
        
        
        
        
      }
      
    }else{
      JKLog(@"no patch.tex");
    }
    
  }else{
    JKLog(@" no detail.json");
  }
  
  
}
#pragma mark 读取配置文件json 校验md5 返回结果 true为成功 有问题！！！！！
-(BOOL)readjsonWithDocPath:(NSString *)Docpath zipPath:(NSString *)zipPath
{
  
  NSString *jsonpath = [Docpath stringByAppendingPathComponent:@"Detailed.json"];
  
  NSData *data = [NSData dataWithContentsOfFile:jsonpath];
  if (!klObjectisEmpty(data)) {
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
    JKLog(@"%@ == %@",[zipPath getFileMD5WithPath:zipPath],[dic valueForKey:@"bundleMd5"]);
    if ( [[zipPath getFileMD5WithPath:zipPath] isEqualToString:[dic valueForKey:@"bundleMd5"]]) {
      return YES;
    }else{
      return NO;
    }
    
  }else{
    
    return NO;
  }
  
  
  
}
#pragma mark 在沙盒生成将要移动的全部文件
-(void)createJSlistIndoc:(NSString*)bundlepath baseVersion:(NSString *)baseVersion shouldUpdatedVersion:(NSString *)shouldUpdatedVersion assets:(NSString *)assetpath
{
  NSString *patchCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],shouldUpdatedVersion];
  NSString *txtPath3 = [patchCachePath stringByAppendingPathComponent:@"main.jsbundle"];
  NSString *txtPath2 = [patchCachePath stringByAppendingPathComponent:@"assets"];
  
  NSString *jslist = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSString *jsversion = [NSString stringWithFormat:@"%@/\%@",jslist,[NSString stringWithFormat:@"%@",shouldUpdatedVersion]];;
  
  //判断assets是否存在
  BOOL jsversionExist = [[NSFileManager defaultManager] fileExistsAtPath:patchCachePath];
  //如果已存在,删除
  if(jsversionExist){
    NSLog(@"jsversion已存在: %@",patchCachePath);
    [[NSFileManager defaultManager] removeItemAtPath:patchCachePath error:nil];
    
    [[NSFileManager defaultManager] createDirectoryAtPath:patchCachePath withIntermediateDirectories:YES attributes:nil error:nil];
    NSLog(@"jsversion已生成Document: %@",patchCachePath);
    //将合并后的js文件和图片移动到该目录下
    
    [[NSFileManager defaultManager] copyItemAtPath:bundlepath toPath:txtPath3 error:nil];
    [[NSFileManager defaultManager] copyItemAtPath:assetpath toPath:txtPath2 error:nil];
    
    
  }else{
    [[NSFileManager defaultManager] createDirectoryAtPath:patchCachePath withIntermediateDirectories:YES attributes:nil error:nil];
    NSLog(@"jsversion已生成Document: %@",patchCachePath);
    //将合并后的js文件和图片移动到该目录下
    
    [[NSFileManager defaultManager] copyItemAtPath:bundlepath toPath:txtPath3 error:nil];
    [[NSFileManager defaultManager] copyItemAtPath:assetpath toPath:txtPath2 error:nil];
    
  }
  //移动文件夹到jslist
  NSString *patch = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"patch"];
  [[NSFileManager defaultManager] moveItemAtPath:patchCachePath toPath:jsversion error:nil];
  

}
#pragma mark 移动图片资源
-(void)movePicwithDic:(NSDictionary *)dic withPath:(NSString *)path OriPath:(NSString *)OriPath
{
  JKLog(@"%@ == %@",path,OriPath);
  NSString *txtPath3 = [path stringByAppendingPathComponent:@"js"];
  NSString *txtPath2 = [txtPath3 stringByAppendingPathComponent:@"nfcimg"];
  [[NSFileManager defaultManager] contentsOfDirectoryAtPath:OriPath error:nil];
  NSMutableArray *imagearr = [NSMutableArray arrayWithArray:[[NSFileManager defaultManager] contentsOfDirectoryAtPath:OriPath error:nil]];
  
  for (int i = 0; i < imagearr.count; i++) {
    NSString *oriImage=@"";
    NSString *destinImage = @"";
    if (![[imagearr objectAtIndex:i] isEqualToString:@".DS_Store"]) {
      oriImage = [OriPath stringByAppendingPathComponent:[imagearr objectAtIndex:i]];
      destinImage = [txtPath2 stringByAppendingPathComponent:[imagearr objectAtIndex:i]];
      [[NSFileManager defaultManager] moveItemAtPath:oriImage toPath:destinImage error:nil];
    }
  }
 // [[NSFileManager defaultManager] removeItemAtPath:patch error:nil];
  
  
  JKLog(@"%ld 是否成功",[[NSFileManager defaultManager] moveItemAtPath:OriPath toPath:txtPath2 error:nil]);
  
  
}
#pragma mark local push

- (void)localPushWithTitle:(NSString *)title detail:(NSString *)body  {
  
  if (!self.localPushOn) return;
  
  // 1.创建本地通知
  UILocalNotification *localNote = [[UILocalNotification alloc] init];
  
  // 2.设置本地通知的内容
  // 2.1.设置通知发出的时间
  localNote.fireDate = [NSDate dateWithTimeIntervalSinceNow:3.0];
  // 2.2.设置通知的内容
  localNote.alertBody = body;
  // 2.3.设置滑块的文字（锁屏状态下：滑动来“解锁”）
  localNote.alertAction = @"滑动来“解锁”";
  // 2.4.决定alertAction是否生效
  localNote.hasAction = NO;
  // 2.5.设置点击通知的启动图片
  //    localNote.alertLaunchImage = @"123Abc";
  // 2.6.设置alertTitle
  localNote.alertTitle = title;
  // 2.7.设置有通知时的音效
  localNote.soundName = @"default";
  // 2.8.设置应用程序图标右上角的数字
  localNote.applicationIconBadgeNumber = 0;
  
  // 2.9.设置额外信息
  localNote.userInfo = @{@"type" : @1};
  
  // 3.调用通知
  [[UIApplication sharedApplication] scheduleLocalNotification:localNote];
  
}

-(void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end

