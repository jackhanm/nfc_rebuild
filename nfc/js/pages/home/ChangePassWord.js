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

    _render(){
        return(

            <View style={{flex:1, backgroundColor:'#F0F0F2', flexDirection:'column', alignItems:'center'}}>
                <View style={{backgroundColor:'#fff',width:winWidth-80, Left:40,marginTop:40,height:50,flexDirection:'row'}}>
                    <Text style={{marginTop:16,left:15,fontSize:15}}>
                        原密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15,marginTop:5,}]}
                        placeholder="请输入原密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value:text})}
                        secureTextEntry={false}
                    />
                </View>


                <View style={{backgroundColor:'#fff',width:winWidth-80, Left:40,marginTop:40,height:50,flexDirection:'row'}}>
                    <Text style={{marginTop:16,left:15,fontSize:15}}>
                        新密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15,marginTop:5,}]}
                        placeholder="请输入新密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value2:text})}
                        secureTextEntry={false}
                    />
                </View>

                <View style={{backgroundColor:'#fff',width:winWidth-80, Left:40,marginTop:40,height:50,flexDirection:'row'}}>
                    <Text style={{marginTop:16,left:15,fontSize:15}}>
                        确认密码：
                    </Text>
                    <TextInput
                        style={[styles.edit,{fontSize:15,marginTop:5,}]}
                        placeholder="再次输入新密码"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({value1:text})}
                        secureTextEntry={false}
                    />
                </View>

                <TouchableOpacity style={{marginTop:80,width:winWidth - 80, height:44, backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center', borderRadius: 4,}} onPress={()=>this._onPress()}>
                    <View style={{ height:44, backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center', borderRadius: 4,}}>
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
                Toast.info('两次密码输入不一致')
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
            Toast.info('请输入完整信息')
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
        marginLeft:20,
    },
    viewRight:{
        flex:4,
        flexDirection:'row',
        alignItems:'center'
    },
    edit: {
        height: 40,
        backgroundColor: '#fff',
        marginRight: 10,
        marginLeft:20
    },

});