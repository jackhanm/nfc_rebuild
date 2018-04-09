import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import ScreenUtil from '../../util/ScreenUtil'

import { NavigationActions} from "react-navigation";
import GetSetStorge from '../publicState/GetSetStorg';
import NetUtils from '../Network/NetUtils'
import NetAPI from '../Network/NetAPI'
import { Toast} from 'antd-mobile';
let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').height;
var TimerMixin = require('react-timer-mixin');

UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

// let reastAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({ routeName: 'TabBar'})
//     ]
// });

export default class NfcLogin extends Component{
    mixins: [TimerMixin]
    constructor(){
        super();
        this.state={
            user_name:'',
            pass_word:'',
        }
    }

    _showToast() {
        Toast.info('好车贷NFC风控系统暂未开放注\n册功能，如需注册，请联系客服\n          QQ：1156068241');
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>

            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                <Image
                    style={{width:ScreenUtil.scaleSize(140), height:ScreenUtil.scaleSize(140), marginTop:ScreenUtil.scaleSize(140)}}
                    source={require('../../imgResouce/logo.png')}/>
                <Text style={{fontSize:18, color:'#004098'}}>
                    好车贷NFC风控系统
                </Text>
            </View>
            <View style={{flex:1.5, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                            style={{width:ScreenUtil.scaleSize(50), height:ScreenUtil.scaleSize(50)}}
                            source={require('../../imgResouce/user.png')}/>
                        <View style={{flexDirection:'column', marginLeft:ScreenUtil.scaleSize(40),}}>
                            <TextInput style={{width:ScreenUtil.scaleSize(420), color:'#194697', padding:0,marginBottom:ScreenUtil.scaleSize(10)}}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text)=>this.setState({user_name:text})}
                                       placeholder='账户'
                                       placeholderTextColor='#194697'/>
                            <View style={{width:ScreenUtil.scaleSize(420), height:ScreenUtil.scaleSize(1), backgroundColor:'#dbdbdb'}}></View>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                            style={{width:ScreenUtil.scaleSize(50), height:ScreenUtil.scaleSize(50)}}
                            source={require('../../imgResouce/pass.png')}/>
                        <View style={{flexDirection:'column', marginLeft:ScreenUtil.scaleSize(40)}}>
                            <TextInput style={{width:ScreenUtil.scaleSize(420), color:'#194697', padding:0, marginBottom:ScreenUtil.scaleSize(10)}}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.setState({pass_word:text})}
                                       placeholder='密码'
                                       placeholderTextColor='#194697'
                                       secureTextEntry={true}/>
                            <View style={{width:ScreenUtil.scaleSize(420), height:ScreenUtil.scaleSize(1), backgroundColor:'#dbdbdb'}}></View>
                        </View>
                    </View>
                </View>

                <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:ScreenUtil.scaleSize(60)}}>
                    <TouchableOpacity onPress={()=>{this._onPress()}}>
                        <View style={{width:winWidth - ScreenUtil.scaleSize(240), height:ScreenUtil.scaleSize(88), backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center', borderRadius: 4,}}>
                            <Text style={{fontSize:16, color:'#ffffff'}}>
                                登录
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this._showToast()}}>
                        <Text style={{marginTop:ScreenUtil.scaleSize(24), fontSize:ScreenUtil.scaleSize(24), color:'#999999'}}>
                            立即注册
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
                <Image
                    style={{width:winWidth, height:ScreenUtil.scaleSize(140)}} source={require('../../imgResouce/loginbuttom.png')}/>
            </View>
            {/*<ActivityIndicator*/}
                {/*animating={false}*/}
                {/*style={[{  alignItems: 'center',*/}
                    {/*justifyContent: 'center',*/}
                    {/*padding: 8,}, {height: 80}]}*/}
                {/*size="large"*/}
            {/*/>*/}


             </View>
            </TouchableWithoutFeedback>
        );
    }

    _onPress() {
        if (this.state.user_name!='' && this.state.pass_word !=''){
            NetUtils.postJson(NetAPI.serverUrl, NetAPI.USER_LOGIN, {
                    'username': this.state.userName,
                    'password': this.state.passWrod
                }, '1.0', '', false, (result) => {

                    console.log(result)

                    if (result.code === 0) {
                        GetSetStorge.setStorgeAsync('isLogin', 'true');
                        GetSetStorge.setStorgeAsync('username','yuhao');
                        GetSetStorge.setStorgeAsync('accessToken',result.data.accessToken);
                        GetSetStorge.setStorgeAsync('refreshToken',result.data.refreshToken);
                        Toast.success('登录成功', 1, ()=>this.props.navigation.navigate('TabBar',{ transition: 'forVertical' }));

                    }else {
                        Toast.fail(result.message, 1);
                    }

                }
            );
        }else {
            Toast.info('请输入完整信息', 1);
        }







    }
}

const styles = StyleSheet.create({
    container:{
        width:winWidth,
        height:winHeight,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
});