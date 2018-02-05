//
//  changtianColor.h
//  ChangTianDemo
//
//  Created by yuhao on 2017/9/21.
//  Copyright © 2017年 uhqsh. All rights reserved.
//

#ifndef changtianColor_h
#define changtianColor_h
#define random(r, g, b, a) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:(a)/255.0]

#define randomColor random(arc4random_uniform(256), arc4random_uniform(256), arc4random_uniform(256), arc4random_uniform(256))


#endif /* changtianColor_h */
