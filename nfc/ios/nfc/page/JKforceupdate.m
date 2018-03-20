//
//  JKforceupdate.m
//  nfc
//
//  Created by 余浩 on 2018/3/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKforceupdate.h"
#import "JKforceupdateroot.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
@interface JKforceupdate ()

@end

@implementation JKforceupdate

-(void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
 
}
- (void)load_last_vision
{
  RCTRootView *rootView ;
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"jsversion"];

 NSString *txtPath = [jsversionCachePath stringByAppendingPathComponent: self.filename];
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
- (void)viewDidLoad {
    [super viewDidLoad];
  JKLog(@"%@",self.responseobject);
  self.view.backgroundColor = [UIColor whiteColor];
  [self load_last_vision];
  // Do any additional setup after loading the view.
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
