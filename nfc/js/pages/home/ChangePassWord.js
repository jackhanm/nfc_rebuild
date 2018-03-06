import React, { Component } from 'react';
import {BaseComponent} from  '../../base/BaseComponent'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    FlatList,
} from 'react-native';

let winWidth = Dimensions.get('window').width;
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import { Toast} from 'antd-mobile';
import {commonStyle} from '../../../js/util/commonStyle'

export default class ChangePassWord extends BaseComponent{

    navigationBarProps() {

        return {
            title: '修改密码',
            titleStyle: {
                color: commonStyle.navTitleColor,
            },
            leftIcon: {
                name: 'nav_back_o',
                size: 20,
                color: commonStyle.navTitleColor,
            },
            navBarStyle: {
                backgroundColor: commonStyle.navThemeColor,
            }
        }
    }
    constructor(){
        super();
    }

    _render(){
        return(<View style={{flex:1, backgroundColor:'#F0F0F2', flexDirection:'column', alignItems:'center'}}>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        原密码：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        新密码：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        再次确认：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{this._onPress()}}>
                <View style={{width:winWidth-120, backgroundColor:'white', justifyContent:'center', alignItems:'center', marginTop:100}}>

                    <Text style={{fontWeight:'900', fontSize:15, padding:15}}>
                    确认修改
                     </Text>

            </View>
            </TouchableOpacity>
        </View>);
    }
    _onPress() {
        NetUtils.postJson(NetAPI.serverUrl, NetAPI.CHANGE_PASSWORD, {
                'newPassword': "111111",
                'oldPassword': "123456",
                'confirmPassword': "123456"
            }, '1.0', '', false, (result) => {

                console.log(result)
                if (result.code === 0) {
                  //修改成功
                    Toast.info('修改成功');
                }

            }
        );
    }
}

const styles = StyleSheet.create({
    textStyle:{
        fontWeight:'900',
    },

    viewLeft:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:20,
    },
    viewRight:{
        flex:4,
        flexDirection:'row',
        alignItems:'center'
    },
    edit: {
        height: 40,
        width:200,
        backgroundColor: '#fff',
        marginRight: 10,
        marginLeft:20
    },

});