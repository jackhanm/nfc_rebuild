



//
//  JKReadview.m
//  nfc
//
//  Created by 余浩 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKReadview.h"

@interface JKReadview ()<UIWebViewDelegate>

@property (nonatomic, retain) UIWebView *webview;
@property (nonatomic ,retain) NSMutableArray *listarr;
@end

@implementation JKReadview

-(void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  self.navigationController.navigationBarHidden=NO;
  //   [[RNCalliOSAction shareManager] senddata];
}
-(void)senddata
{
  NSString *jsversionCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"down"];
  NSFileManager *manager =[NSFileManager defaultManager];
  BOOL Exist = [manager fileExistsAtPath:jsversionCachePath];
  self.listarr = [NSMutableArray array];
  if (Exist) {
    //js文件存在
    self.listarr =[manager contentsOfDirectoryAtPath:jsversionCachePath error:nil];
  }
  // [self.bridge.eventDispatcher sendAppEventWithName:@"getdownloaddata" body:@{@"downloaddata":str_date}];
  
}
-(void)viewWillDisappear:(BOOL)animated
{
  self.navigationController.navigationBarHidden=YES;
}
- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  [self createview];
  [self setNav];
  // Do any additional setup after loading the view.
}
-(void)setNav
{
  
  UIBarButtonItem *leftbtn = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"返回"] style:UIBarButtonItemStylePlain target:self action:@selector(leftAct)];
  self.navigationItem.leftBarButtonItem = leftbtn;
  self.navigationController.navigationBar.barTintColor=UIColorFromRGB(0x1B53A5);
  NSDictionary * dict=[NSDictionary dictionaryWithObject:UIColorFromRGB(0xffffff) forKey:NSForegroundColorAttributeName];
  self.navigationController.navigationBar.titleTextAttributes = dict;
  self.navigationItem.title=@"报告结果";
  self.navigationController.navigationBar.tintColor=UIColorFromRGB(0xffffff);
}
-(void)leftAct{
  [self.navigationController popViewControllerAnimated:YES];
}

-(void)createview
{
  
  
  self.webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 64, self.view.frame.size.width, self.view.frame.size.height)];
  self.webview.backgroundColor = [UIColor whiteColor];
  self.webview.delegate= self;
  [self.webview loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:self.pdfurl]]];
  [self.view addSubview:self.webview];
  
}
- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}
//1.网页开始加载的时候调用
- (void )webViewDidStartLoad:(UIWebView  *)webView
{
  
}
//2.网页加载完成的时候调用
- (void )webViewDidFinishLoad:(UIWebView  *)webView
{
  
}
//3.网页加载错误的时候调用
- (void)webView:(UIWebView *)webView  didFailLoadWithError:(NSError *)error
{
  
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
