//
//  EFCommonUtils.h
//  joymegameguide
//
//  Created by Antony on 3/28/14.
//  Copyright (c) 2014 EF. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^EFSavePicCompleteionBlock)(id obj, NSError *error);


@interface EFCommonUtils : NSObject

/**
 *  check obj is empty or not
 *
 *  @param obj data to check
 *
 *  @return YES:(is empty),NO:(is not empty)
 */
+ (BOOL)isWhatever:(id)obj;
+ (BOOL)isEmpty:(id)obj;


+ (NSString *)safeStringFromObj:(id)obj;

/**
 *  convert obj to json string
 *
 *  @param obj obj to convert
 *
 *  @return json string
 */
+ (NSString *) jsonStringFromObject:(id) obj;

/**
 *  convert json string to obj
 *
 *  @param json json string
 *
 *  @return obj
 */
+ (id) objectFromJsonString:(NSString *) json;

/**
 *  save pic to local
 *
 *  @param appname
 *  @param targetImage
 *  @param completionBlock 
 */
+ (void)savePicToLocalWithAppName:(NSString *)appname targetImage:(UIImage *)targetImage onCompletionBlock:(EFSavePicCompleteionBlock)completionBlock;


@end
