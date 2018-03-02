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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BaseComponent} from  '../../base/BaseComponent'
import { List } from 'antd-mobile';
const Item = List.Item;

let winWidth = Dimensions.get('window').width;

export default class AccountInfo extends BaseComponent{
    navigationBarProps() {

        return {
            title: '账户信息',
            hiddenLeftItem: true
        }
    }

    constructor(){
        super();
        this.state={
            imageUrl:'',
            name:'谢敏',
            telPhone:'13382056043',
            loginName:'xmsky2018',
            company:'长天好车贷',
        }
    }

    _render(){
        return(<View style={{flex:1, backgroundColor:'#F0F0F2', flexDirection:'column'}}>

            <TouchableOpacity onPress={()=>{}}>
                <View style={{width:winWidth, backgroundColor:'white', flexDirection:'row'}}>
                    <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                        <Text style={styles.textStyle}>头像</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center' , flexDirection:'row',justifyContent:'flex-end', marginTop:10, marginBottom:10, marginRight:10}}>
                        <Image style={{width:80, height:60}}
                               source={this.state.imageUrl == '' ?
                                   require('../../img/Mine/avatar.png') : {uri:this.state.imageUrl}}/>

                        <Icon
                            color='black'
                            size={25}
                            backgroundColor={'white'}
                            name="ios-arrow-dropright"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{width:winWidth, height:0.5, backgroundColor:'#F0F0F2'}}/>

            <View style={{width:winWidth, height:40, backgroundColor:'white', flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>姓名</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{this.state.name}</Text>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'#F0F0F2'}}/>

            <View style={{width:winWidth, height:40, backgroundColor:'white', flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>手机号</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{this.state.telPhone}</Text>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'#F0F0F2'}}/>

            <View style={{width:winWidth, height:40, backgroundColor:'white', flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>登录名</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{this.state.loginName}</Text>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'#F0F0F2'}}/>

            <View style={{width:winWidth, height:40, backgroundColor:'white', flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>所属机构</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                    <Text style={styles.textStyle}>{this.state.company}</Text>
                </View>
            </View>


        </View>);
    }
}

const styles = StyleSheet.create({
    textStyle:{
        marginLeft:20,
        fontWeight:'900',
        marginRight:20,
    }
});