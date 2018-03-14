//
//  JKpdfview.m
//  nfc
//
//  Created by 余浩 on 2018/3/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JKpdfview.h"
#import "NDHTMLtoPDF.h"
#import "CTUUID.h"
#import "RNCalliOSAction.h"
@interface JKpdfview ()<NDHTMLtoPDFDelegate,UIWebViewDelegate>
@property (nonatomic, strong) NDHTMLtoPDF *PDFCreator;
@property (nonatomic, retain) UIWebView *webview;
@property (nonatomic ,retain) NSMutableArray *listarr;
@end

@implementation JKpdfview
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
  UIBarButtonItem *rightBtn = [[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"下载"] style:UIBarButtonItemStylePlain target:self action:@selector(rightAct)];
  self.navigationItem.rightBarButtonItem = rightBtn;
  self.navigationController.navigationBar.barTintColor=UIColorFromRGB(0x1B53A5);
  NSDictionary * dict=[NSDictionary dictionaryWithObject:UIColorFromRGB(0xffffff) forKey:NSForegroundColorAttributeName];
  self.navigationController.navigationBar.titleTextAttributes = dict;
  self.navigationItem.title=@"查询结果";
  self.navigationController.navigationBar.tintColor=UIColorFromRGB(0xffffff);
}
-(void)leftAct{
  [self.navigationController popViewControllerAnimated:YES];
}
-(void)rightAct
{
  JKLog(@"下载");
  JKLog(@"%@",self.objectDic);
  NSString *patchCachePath = [NSString stringWithFormat:@"%@/\%@",NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0],@"down"];
  BOOL jsversionExist = [[NSFileManager defaultManager] fileExistsAtPath:patchCachePath];
  if (!jsversionExist) {
     [[NSFileManager defaultManager] createDirectoryAtPath:patchCachePath withIntermediateDirectories:YES attributes:nil error:nil];
  }else{
    
  }
  NSString *pdfDownloadpath;
  if ([[self.objectDic objectForKey:@"companyId"] isEqualToString: @""]|| [[self.objectDic objectForKey:@"companyName"] isEqualToString:@""]) {
     pdfDownloadpath= [NSString stringWithFormat:@"%@/=%@=%@=%@=%@=.pdf",patchCachePath,@"PERSON",[self.objectDic objectForKey:@"name"],[self.objectDic objectForKey:@"typeTag"],[CTUUID getPhoneTime]];
  }else{
     pdfDownloadpath = [NSString stringWithFormat:@"%@/=%@=%@=%@=%@=.pdf",patchCachePath,@"NOPERSON",@"公司",[self.objectDic objectForKey:@"typeTag"],[CTUUID getPhoneTime]];
  }
  
   BOOL downloadurl = [[NSFileManager defaultManager] fileExistsAtPath:pdfDownloadpath];
  
  if (downloadurl) {
    KLToast(@"文件已下载");
  }else{
    self.PDFCreator = [NDHTMLtoPDF createPDFWithURL:[NSURL URLWithString:@"http://www.baidu.com"] pathForPDF:pdfDownloadpath pageSize:kPaperSizeA4 margins:UIEdgeInsetsMake(10, 5, 10, 5) successBlock:^(NDHTMLtoPDF *htmlToPDF) {
      NSString *result = [NSString stringWithFormat:@"HTMLtoPDF did succeed (%@ / %@)", htmlToPDF, htmlToPDF.PDFpath];
      NSLog(@"%@",result);
       KLToast(@"文件下载成功");
      
    } errorBlock:^(NDHTMLtoPDF *htmlToPDF) {
      NSString *result = [NSString stringWithFormat:@"HTMLtoPDF did fail (%@)", htmlToPDF];
      NSLog(@"%@",result);
      KLToast(@"文件下载失败");
      
    }];
  }
  
  

}
-(void)createview
{
  
  
  self.webview = [[UIWebView alloc] initWithFrame:CGRectMake(0, 64, self.view.frame.size.width, self.view.frame.size.height)];
  self.webview.backgroundColor = [UIColor whiteColor];
  self.webview.delegate= self;
  [self.webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://www.baidu.com"]]];
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
