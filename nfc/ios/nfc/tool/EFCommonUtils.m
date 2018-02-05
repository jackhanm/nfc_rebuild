//
//  EFCommonUtils.m
//  joymegameguide
//
//  Created by Antony on 3/28/14.
//  Copyright (c) 2014 EF. All rights reserved.
//

#import "EFCommonUtils.h"
#import <objc/runtime.h>
#import <AssetsLibrary/AssetsLibrary.h>

@implementation EFCommonUtils

+ (BOOL)isEmpty:(id)obj
{
    if (obj == nil || [obj isKindOfClass:[NSNull class]]) {
        return YES;
    }
    if ([obj isKindOfClass:[NSString class]]) {
        NSString *str = (NSString *)obj;
        NSString *formatedStr = [str stringByReplacingOccurrencesOfString:@" " withString:@""];
        if (formatedStr.length <= 0) {
            return YES;
        }
    }
    
    
    if ([obj isKindOfClass:[NSDictionary class]]) {
        NSDictionary* temp=(NSDictionary*)obj;
        return [temp allKeys].count <= 0?YES:NO;
    }
    
    if ([obj isKindOfClass:[NSArray class]]) {
        NSArray* temp=(NSArray*)obj;
        return temp.count <= 0?YES:NO;
    }
    
    if ([obj isKindOfClass:[NSSet class]]) {
        NSArray* temp=(NSArray*)obj;
        return temp.count <= 0?YES:NO;
    }
    
    return NO;
}

+ (BOOL)isWhatever:(id)obj
{
    if (obj == nil || [obj isKindOfClass:[NSNull class]]) {
        return YES;
    }
    return NO;
}


+ (NSString *)safeStringFromObj:(id)obj
{
    if ([obj isKindOfClass:[NSNull class]]) {
        return @"";
    }else if([obj isKindOfClass:[NSString class]]){
        return obj;
    }
    return [obj description];
}
+ (NSString *) jsonStringFromObject:(id) obj
{
    if ([NSJSONSerialization isValidJSONObject:obj]) {
        NSError *error = nil;
        NSData *data = [NSJSONSerialization dataWithJSONObject:obj options:NSJSONWritingPrettyPrinted error:&error];
        if (error) {
            return nil;
        }else{
            NSString *json = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            return json;
        }
    }else{
        return nil;
    }
}

+ (id) objectFromJsonString:(NSString *) json
{
    if ([[self class] isEmpty:json]) {
        return nil;
    }
    NSError *error = nil;
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    id obj = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
    return obj;
}


+(void)savePicToLocalWithAppName:(NSString *)albumName targetImage:(UIImage *)targetImage onCompletionBlock:(EFSavePicCompleteionBlock)completionBlock{
    ALAssetsLibrary *assetsLibrary = [[ALAssetsLibrary alloc] init];
    [assetsLibrary writeImageToSavedPhotosAlbum:targetImage.CGImage orientation:(ALAssetOrientation)targetImage.imageOrientation completionBlock:^(NSURL *assetURL, NSError *error) {
//        [self addAssetURL:assetURL toAlbum:appname withCompletionBlock:completionBlock];
        //相册存在标示
        __block BOOL albumWasFound = NO;
        
        ALAssetsLibrary *assetsLibrary = [[ALAssetsLibrary alloc] init];
        //search all photo albums in the library
        [assetsLibrary enumerateGroupsWithTypes:ALAssetsGroupAlbum usingBlock:^(ALAssetsGroup *group, BOOL *stop)
         {
             
             //判断相册是否存在
             if ([albumName compare: [group valueForProperty:ALAssetsGroupPropertyName]]==NSOrderedSame) {
                 
                 //存在
                 albumWasFound = YES;
                 [assetsLibrary assetForURL:assetURL resultBlock:^(ALAsset *asset) {
                     [group addAsset:asset];
                     completionBlock(asset, nil);
                 } failureBlock:^(NSError *error) {
                     completionBlock(nil, error);
                 }];
                 return;
             }
             
             //如果不存在该相册创建
             if (group==nil && albumWasFound==NO)
             {
                 __weak ALAssetsLibrary* weakSelf = assetsLibrary;
                 
                 //创建相册
                 [assetsLibrary addAssetsGroupAlbumWithName:albumName resultBlock:^(ALAssetsGroup *group)
                  {
                      [weakSelf assetForURL: assetURL
                                resultBlock:^(ALAsset *asset)
                       {
                           [group addAsset: asset];
                           completionBlock(asset,nil);
                           
                       } failureBlock: ^(NSError *error){
                           completionBlock(nil, error);
                       }];
                      
                  } failureBlock: ^(NSError *error){
                      completionBlock(nil, error);
                  }];
                 return;
             }
             
         }failureBlock:^(NSError *error){
             completionBlock(nil, error);
         }];

    }];
}


@end
