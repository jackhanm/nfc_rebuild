//
//  JKforceupdateroot.m
//  nfc
//
//  Created by 余浩 on 2018/3/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKforceupdateroot.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SCLAlertView.h"
#import "JKforceupdate.h"
#import "JKDownloadItem.h"
#import "JKDownloadManager.h"
@interface JKforceupdateroot ()<JKDownloadItemDelegate>
@property (nonatomic, strong)NSArray *jslistArr;
@property (nonatomic, strong)NSString *jslistStr;
@property (nonatomic, strong) NSMutableArray *cacheVideoList;
@end

@implementation JKforceupdateroot
-(void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  [self gotoUpdate];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changetonextpage:) name:@"changetonextpage" object:nil];

  
}
- (void)changetonextpage:(NSNotification *)notification{
  
  
  NSLog(@"---接收到通知---");
  JKforceupdate *vc= [[JKforceupdate alloc]init];
  vc.filename = @"18031901";
  [self.navigationController pushViewController:vc animated:YES];
  
  
}

-(void)gotoUpdate
{
   [[JKRnupdateManage shareManager]updateWithres:self.responseobject jsListArr:[self getJslist]];
}
- (void)load_last_vision
{
  RCTRootView *rootView ;
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent: [[NSUserDefaults standardUserDefaults] objectForKey: LAST_RUN_RN_KEY]];
  // jsCodeLocation = [NSURL URLWithString:txtPath];
  NSString *txtPath2 = [txtPath stringByAppendingPathComponent:@"main.jsbundle"];
  NSURL *jsCodeLocation = [NSURL URLWithString:txtPath2] ;
  rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                         moduleName:@"nfc"
                                  initialProperties:nil
                                      launchOptions:nil];
  rootView.backgroundColor = [UIColor whiteColor];
  rootView.contentView.backgroundColor = [UIColor whiteColor];
  self.view = rootView;
  
  
}
-(void)addBlackView
{
  SCLAlertView *alert = [[SCLAlertView alloc] init];
  [alert addTimerToButtonIndex:0 reverse:YES];
  [alert showInfo:self title:@"有更新"
         subTitle:@"更新内容等等等等等，相关提示，不影响使用等的"
 closeButtonTitle:@"Dismiss" duration:10.0f];
}
- (void)viewDidLoad {
  
    [super viewDidLoad];
  JKLog(@"%@", self.responseobject);
    self.view.backgroundColor = [UIColor whiteColor];
  [self load_last_vision];
  [self addBlackView];
  [self.cacheVideoList addObjectsFromArray:[JKDownloadManager downloadList]];
  [self.cacheVideoList addObjectsFromArray:[JKDownloadManager finishList]];
//   JKDownloadItem *item =[[JKDownloadManager downloadList] objectAtIndex:0];
//  item.delegate = self;
//

    // Do any additional setup after loading the view.
}
- (void)setDownloadStatus:(JKDownloadStatus)status {
  
  switch (status) {
    case JKDownloadStatusWaiting:
    //  self.statusLbl.text = @"正在等待";
      break;
    case JKDownloadStatusDownloading:
    //  self.statusLbl.text = @"正在下载";
      break;
    case JKDownloadStatusPaused:
  //    self.statusLbl.text = @"暂停下载";
      break;
    case JKDownloadStatusFinished:
 //     self.statusLbl.text = @"下载成功";
   //   self.progressView.progress = 1;
      break;
    case JKDownloadStatusFailed:
   //   self.statusLbl.text = @"下载失败";
      break;
      
    default:
      break;
  }
}



- (void)changeSizeLblDownloadedSize:(int64_t)downloadedSize totalSize:(int64_t)totalSize {
  
  NSString *lalala = [NSString stringWithFormat:@"%@ / %@",[JKDownloadManager fileSizeStringFromBytes:downloadedSize], [JKDownloadManager fileSizeStringFromBytes:totalSize]];
  
  float progress = 0;
  if (totalSize != 0) {
    progress = (float)downloadedSize / totalSize;
  }
  
}

- (void)downloadItemStatusChanged:(JKDownloadItem *)item {
  [self setDownloadStatus:item.downloadStatus];
}

- (void)downloadItem:(JKDownloadItem *)item downloadedSize:(int64_t)downloadedSize totalSize:(int64_t)totalSize {
  
  [self changeSizeLblDownloadedSize:downloadedSize totalSize:totalSize];
}

- (void)downloadItem:(JKDownloadItem *)item speed:(NSUInteger)speed speedDesc:(NSString *)speedDesc {
  NSLog(@"%zd ----- %@", speed, speedDesc);
}


#pragma mark 获取本地js列表
-(NSMutableArray *)getJslist
{
  //jsversion文件夹地址
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];
  NSFileManager *manager =[NSFileManager defaultManager];
  BOOL jsversionExist = [manager fileExistsAtPath:jsversionCachePath];
  self.jslistArr = [NSMutableArray array];
  if (jsversionExist) {
    //js文件存在
    self.jslistArr =[manager contentsOfDirectoryAtPath:jsversionCachePath error:nil];
    JKLog(@"%@",self.jslistArr);
    NSString *str = @"";
    self.jslistStr = @"";
    for (int i = 0; i < self.jslistArr.count; i++) {
      if ( self.jslistArr.count == 1) {
        str = [self.jslistArr objectAtIndex:0];
        
      }else{
        if (i == 0) {
          if ([[self.jslistArr objectAtIndex:i] isEqualToString:@".DS_Store"]||[[self.jslistArr objectAtIndex:i] hasSuffix:@".zip"]) {
            str= [NSString stringWithFormat:@"%@",@""];
          }else{
            str= [NSString stringWithFormat:@"%@",[self.jslistArr objectAtIndex:i]];
          }
        }else{
          
          if ([[self.jslistArr objectAtIndex:i] isEqualToString:@".DS_Store"] ||[[self.jslistArr objectAtIndex:i] hasSuffix:@".zip"]) {
            
          }else{
            if ([[self.jslistArr objectAtIndex:i-1] isEqualToString:@".DS_Store"]||[[self.jslistArr objectAtIndex:i-1] hasSuffix:@".zip"]) {
              str= [NSString stringWithFormat:@"%@",[self.jslistArr objectAtIndex:i]];
            }else{
              str= [NSString stringWithFormat:@",%@",[self.jslistArr objectAtIndex:i]];
            }
            
          }
        }
        
        
      }
      
      self.jslistStr = [NSString stringWithFormat:@"%@%@",self.jslistStr,str];
      JKLog(@"%@",self.jslistStr);
    }
    
  }else{
    
    
  }
  return self.jslistArr;
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
