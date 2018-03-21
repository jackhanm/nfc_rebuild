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
    Keyboard,
} from 'react-native';
import ScreenUtil from '../../util/ScreenUtil'

let winWidth = Dimensions.get('window').width;
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import { Toast} from 'antd-mobile';
import {commonStyle} from '../../../res/styles/commonStyle'
import { InputItem, List, Button } from 'antd-mobile';
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
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            value1: '',
            value2: '',

        };
    }

    componentDidMount(){
        super.componentDidMount();
    }

    _render(){
        return(

            <View style={{flex:1, backgroundColor:'#F0F0F2', flexDirection:'column', alignItems:'center'}}>
                <View style={{backgroundColor:'#fff',width:winWidth-ScreenUtil.scaleSize(160), Left:ScreenUtil.scaleSize(80)
                    ,marginTop:ScreenUtil.scaleSize(80),height:ScreenUtil.scaleSize(100),flexDirection:'row'
                    ,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{marginLeft:ScreenUtil.scaleSize(30),fontSize:15}}>
                        原密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15}]}
                        placeholder="请输入原密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value:text})}
                        secureTextEntry={false}
                    />
                </View>


                <View style={{backgroundColor:'#fff',width:winWidth-ScreenUtil.scaleSize(160)
                    , Left:ScreenUtil.scaleSize(80),marginTop:ScreenUtil.scaleSize(80),height:ScreenUtil.scaleSize(100)
                    ,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{marginLeft:ScreenUtil.scaleSize(30),fontSize:ScreenUtil.scaleSize(30)}}>
                        新密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15}]}
                        placeholder="请输入新密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value2:text})}
                        secureTextEntry={false}
                    />
                </View>

                <View style={{backgroundColor:'#fff',width:winWidth-ScreenUtil.scaleSize(160), Left:ScreenUtil.scaleSize(80)
                    ,marginTop:ScreenUtil.scaleSize(80),height:ScreenUtil.scaleSize(100),flexDirection:'row'
                    ,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{marginLeft:ScreenUtil.scaleSize(30),fontSize:15}}>
                        确认密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15}]}
                        placeholder="再次输入新密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value1:text})}
                        secureTextEntry={false}
                    />
                </View>

                <TouchableOpacity style={{marginTop:ScreenUtil.scaleSize(160)
                    ,width:winWidth - ScreenUtil.scaleSize(160), height:ScreenUtil.scaleSize(88)
                    , backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center', borderRadius: ScreenUtil.scaleSize(8),}} onPress={()=>this._onPress()}>
                    <View style={{ height:ScreenUtil.scaleSize(88), backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center'
                        , borderRadius: ScreenUtil.scaleSize(8),}}>
                        <Text style={{fontSize:16, color:'#ffffff'}}>
                            确认修改
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>);
    }
    _onPress() {

        if (this.state.value!=''&&this.state.value1!=''&&this.state.value2!=''){
            if (this.state.value1 != this.state.value2) {
                Toast.info('两次密码输入不一致',1)
                return;
            }else {
                NetUtils.postJson(NetAPI.serverUrl, NetAPI.CHANGE_PASSWORD, {
                        'newPassword': this.state.value1,
                        'oldPassword': this.state.value,
                        'confirmPassword': this.state.value2
                    }, '1.0', '', false, (result) => {

                        console.log(result)
                        if (result.code === 0) {
                            //修改成功
                            Toast.info('修改成功',1);
                        }

                    }
                );
            }
        }else {
            Toast.info('请输入完整信息',1)
        }




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
        marginLeft:ScreenUtil.scaleSize(40),
    },
    viewRight:{
        flex:4,
        flexDirection:'row',
        alignItems:'center'
    },
    edit: {
        flex:1,
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#fff',
        marginRight: ScreenUtil.scaleSize(20),
        marginLeft:ScreenUtil.scaleSize(40),
        padding: 0
    },

});