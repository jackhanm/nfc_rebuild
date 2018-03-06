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
} from 'react-native';

import { NavigationActions} from "react-navigation";
import GetSetStorge from '../publicState/GetSetStorg';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import { Toast} from 'antd-mobile';

let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').height;
let reastAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'TabBar'})
    ]
});

export default class NfcLogin extends Component{

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
        return(<View style={styles.container}>

            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                <Image
                    style={{width:70, height:70, marginTop:90}}
                    source={require('../../nfcimg/logo.png')}/>
                <Text style={{fontSize:18, color:'#004098'}}>
                    好车贷NFC风控系统
                </Text>
            </View>
            <View style={{flex:1.5, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                            style={{width:25, height:25}}
                            source={require('../../nfcimg/user.png')}/>
                        <View style={{flexDirection:'column', marginLeft:20,}}>
                            <TextInput style={{width:210, color:'#194697', padding:0,marginBottom:5}}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text)=>this.setState({user_name:text})}
                                       placeholder='账户'
                                       placeholderTextColor='#194697'/>
                            <View style={{width:210, height:0.5, backgroundColor:'#dbdbdb'}}></View>
                        </View>
                    </View>
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                            style={{width:25, height:25}}
                            source={require('../../nfcimg/pass.png')}/>
                        <View style={{flexDirection:'column', marginLeft:20}}>
                            <TextInput style={{width:210, color:'#194697', padding:0, marginBottom:5}}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.setState({pass_word:text})}
                                       placeholder='密码'
                                       placeholderTextColor='#194697'
                                       secureTextEntry={true}/>
                            <View style={{width:210, height:0.5, backgroundColor:'#dbdbdb'}}></View>
                        </View>
                    </View>
                </View>

                <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:30}}>
                    <TouchableOpacity onPress={()=>{this._onPress()}}>
                        <View style={{width:winWidth - 120, height:44, backgroundColor:'#1b54a5', alignItems:'center', justifyContent:'center', borderRadius: 4,}}>
                            <Text style={{fontSize:16, color:'#ffffff'}}>
                                登录
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this._showToast()}}>
                        <Text style={{marginTop:12, fontSize:12, color:'#999999'}}>
                            立即注册
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
                <Image
                    style={{width:winWidth, height:70}} source={require('../../nfcimg/loginbuttom.png')}/>
            </View>

        </View>);
    }

    _onPress() {
        NetUtils.postJson(NetAPI.serverUrl, NetAPI.USER_LOGIN, {
                'username': this.state.userName,
                'password': this.state.passWrod
            }, '1.0', '', false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    GetSetStorge.setStorgeAsync('isLogin', 'true');
                    this.props.navigation.dispatch(reastAction);



                }

            }
        );





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