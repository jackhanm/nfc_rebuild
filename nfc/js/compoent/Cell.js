/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

import React, {PureComponent} from 'react'
import { SwipeAction, List } from 'antd-mobile';
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio,Dimensions} from 'react-native'
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class Cell extends PureComponent {

    render() {
        const right = [

            {
                text: 'Delete',
                onPress: () => console.log('delete'),
                style: { backgroundColor: 'red', color: 'white' },
            },
        ];

        console.log('render cell')
        let {info} = this.props

        info.imageUrl = info.imageUrl.replace('w.h', '160.0')

        return (
            <List>
                <SwipeAction autoClose style={{ backgroundColor: 'transparent' }} right={right}  onOpen={() => console.log('open')} onClose={() => console.log('close')}>

                    <TouchableOpacity onPress={() => this.props.onPress()}>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={styles.item}>
                                <View style={{flex:4, flexDirection:'row',
                                    alignItems:'center',}}>
                                    <Text style={{color:'#4352B2', marginRight:5}}>
                                        个人
                                    </Text>
                                    <Text style={{color:'black', marginRight:5}}>
                                        韩梅梅
                                    </Text>
                                    <Image source={require('../nfcimg/anti_fraud_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/car_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/company_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/credit_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/home_estimate_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/home_small.png')} style={{alignSelf:'center'}}/>
                                    <Image source={require('../nfcimg/personal_small.png')} style={{alignSelf:'center'}}/>
                                </View>
                                <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                                    <Text>
                                        2018/02/23
                                    </Text>
                                    <Image style={{width:10, height:10}} source={require('../nfcimg/backicon.png')}/>
                                </View>
                            </View>
                            <View style={{backgroundColor:'#F0F0F2', height:0.5, width:windowWidth}}/>
                        </View>
                    </TouchableOpacity>
                </SwipeAction>
            </List>


        )
    }
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        width:windowWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        height:50
    }
})

export default Cell
