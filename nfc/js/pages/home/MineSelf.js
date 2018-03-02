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
    ScrollView
} from 'react-native';

import { List } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';

const Item = List.Item;
const Brief = Item.Brief;

let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').height;
import {BaseComponent} from  '../../base/BaseComponent'
export default class MineSelf extends BaseComponent{
    navigationBarProps() {

        return {
            title: '账号',
            hiddenLeftItem: true
        }
    }

    constructor(){
        super();
        this.state={
            imageUrl:'',
            user_name:'快车财富技术部',
            user_company:'长天金服有限公司',
            user_number:'0',
            search_number:'0',
            my_search:'0',
        }
    }

    _render(){
        return(<ScrollView
            style={{ flex: 1, backgroundColor: '#F0F0F2' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>


            <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:10}}>

                <View style={{width:winWidth-20, backgroundColor:'white'}}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Image source={this.state.imageUrl == ''
                                    ? require('../../img/Mine/avatar.png') : {uri:this.state.imageUrl}}
                                       style={{width:80, height:80, borderRadius:40, margin:10}}/>
                            </View>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{fontWeight:'900', marginBottom:10}}>
                                    {this.state.user_name}
                                </Text>
                                <Text style={{ marginTop:10}}>
                                    {this.state.user_company}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor:"#F0F0F2", width:winWidth, height:25}}/>

                <View style={{flexDirection:'row', alignItems:'center', width:winWidth-20, backgroundColor:'white'}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontWeight:'900', marginTop:20, marginBottom:10}}>
                            机构用户
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.user_number + "次"}
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontWeight:'900', marginTop:20, marginBottom:10}}>
                            累计查询次数
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.search_number + "次"}
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontWeight:'900', marginTop:20, marginBottom:10}}>
                            我的查询次数
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.my_search + "次"}
                        </Text>
                    </View>
                </View>

                <View style={{backgroundColor:"#F0F0F2", width:winWidth, height:25}}/>

                <List style={{width:winWidth-20}}>
                    <Item arrow="horizontal" onClick={() => {}}>
                        <View style={{width:winWidth-20, flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                color='black'
                                size={25}
                                backgroundColor={'white'}
                                name="ios-search"
                            />
                            <Text style={{marginLeft:10}}>
                                我的记录
                            </Text>
                        </View>
                    </Item>

                    <Item arrow="horizontal" onClick={() => {}}>
                        <View style={{width:winWidth-20, flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                color='black'
                                size={25}
                                backgroundColor={'white'}
                                name="ios-cloud-download"
                            />
                            <Text style={{marginLeft:10}}>
                                下载管理
                            </Text>
                        </View>
                    </Item>

                    <Item arrow="horizontal" onClick={() => {}}>
                        <View style={{width:winWidth-20, flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                color='black'
                                size={25}
                                backgroundColor={'white'}
                                name="ios-lock"
                            />
                            <Text style={{marginLeft:10}}>
                                修改密码
                            </Text>
                        </View>
                    </Item>
                    <Item arrow="horizontal" onClick={() => {}}>
                        <View style={{width:winWidth-20, flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                color='black'
                                size={25}
                                backgroundColor={'white'}
                                name="ios-more"
                            />
                            <Text style={{marginLeft:10}}>
                                关于我们
                            </Text>
                        </View>
                    </Item>
                </List>

                <View style={{backgroundColor:"#F0F0F2", width:winWidth, height:80}}/>

                <View style={{backgroundColor:'white'
                    , width:winWidth-20, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontWeight:'900', marginTop:10, marginBottom:10, fontSize:15}}>
                        退出登录
                    </Text>
                </View>

            </View>

        </ScrollView>);
    }
}