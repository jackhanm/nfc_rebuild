//
//  JKpdfview.m
//  nfc
//
//  Created by 余浩 on 2018/3/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKpdfview.h"
#import "NDHTMLtoPDF.h"
@interface JKpdfview ()<NDHTMLtoPDFDelegate,UIWebViewDelegate>
@property (nonatomic, strong) NDHTMLtoPDF *PDFCreator;
@property (nonatomic, retain) UIWebView *webview;
@end

@implementation JKpdfview
-(void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  self.navigationController.navigationBarHidden=NO;
}
-(void)viewWillDisappear:(BOOL)animated
{
    self.navigationController.navigationBarHidden=YES;
}
- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  [self createview];
    // Do any additional setup after loading the view.
}
-(void)createview
{
  
  
  self.webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 64, 375, 400)];
  self.webview.backgroundColor = [UIColor whiteColor];
  self.webview.delegate= self;
  [self.webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://www.baidu.com"]]];
  [self.view addSubview:self.webview];
  
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
