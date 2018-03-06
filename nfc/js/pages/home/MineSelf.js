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
    StatusBar
} from 'react-native';

import { List } from 'antd-mobile';
import GetSetStorge from '../publicState/GetSetStorg';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
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
    //网络请求
    fetchData(data) {
        //这个是js的访问网络的方法
        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_INFO, "1.0", "", false, (result) => {

            console.log(result)
            if (result.code === 0) {
                this.setState({
                    //复制数据源
                    avatar: result.data.avatar,
                    name: result.data.name,
                    organizationName: result.data.organizationName,
                    phone: result.data.phone,
                    username: result.data.username,

                });

            }


            }
        );

        NetUtils.get(NetAPI.serverUrl, NetAPI.PLATFORM_DATA, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //复制数据源
                        allReportLogCount: result.data.allReportLogCount,
                        myReportLogCount: result.data.myReportLogCount,
                        selectUserCount: result.data.selectUserCount,

                    });

                }


            }
        );

    }

    componentDidMount() {
        //请求数据

        console.log('sss');
        console.log('url =========='+this.props.url);
        this.fetchData();

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
           //网络请求数据
            avatar:'',
            name:'',
            organizationName:'',
            phone:'',
            username:'',
            allReportLogCount:'',
            myReportLogCount:'',
            selectUserCount:''

        }
    }
    _onPress(){

    }
    _render(){
        return(<ScrollView
            style={{ flex: 1, backgroundColor: '#f7f7f7' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>

            <StatusBar barStyle={'light-content'} />
            <StatusBar backgroundColor={'white'} />
            <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:10}}>

                <View style={{width:winWidth, backgroundColor:'white'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AccountInfo')}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Image source={this.state.imageUrl == ''
                                    ? require('../../img/Mine/avatar.png') : {uri:this.state.imageUrl}}
                                       style={{width:80, height:80, borderRadius:40, margin:10}}/>
                            </View>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{ marginBottom:10}}>
                                    {this.state.user_name}
                                </Text>
                                <Text style={{ marginTop:10}}>
                                    {this.state.user_company}
                                </Text>
                            </View>
                            <View style={{flex:0.5, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Image style={{width:10, height:16}} source={require('../../nfcimg/backicon.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor:"#f7f7f7", width:winWidth, height:10}}/>

                <View style={{flexDirection:'row', alignItems:'center', width:winWidth, backgroundColor:'white'}}>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{ marginTop:28, marginBottom:10}}>
                            机构用户数
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.allReportLogCount + "次"}
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{ marginTop:28, marginBottom:10}}>
                            累计查询次数
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.myReportLogCount + "次"}
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <Text style={{ marginTop:28, marginBottom:10}}>
                            我的查询次数
                        </Text>
                        <Text style={{color:"#4352B2", marginTop:10, marginBottom:20}}>
                            {this.state.selectUserCount + "次"}
                        </Text>
                    </View>
                </View>

                <View style={{backgroundColor:"#f7f7f7", width:winWidth, height:10}}/>

                <List style={{width:winWidth}}>
                    <Item arrow="horizontal" onClick={() => {this.props.navigation.navigate('MineRecored')}}>
                        <View style={{width:winWidth, flexDirection:'row', alignItems:'center'}}>
                            <Image style={{width:20, height:20}} source={require('../../nfcimg/iconrecord.png')}/>
                            <Text style={{marginLeft:10}}>
                                我的记录
                            </Text>
                        </View>
                    </Item>

                    <Item arrow="horizontal" onClick={() => {this.props.navigation.navigate('MineDownload')}}>
                        <View style={{width:winWidth, flexDirection:'row', alignItems:'center'}}>
                            <Image style={{width:20, height:20}} source={require('../../nfcimg/download.png')}/>
                            <Text style={{marginLeft:10}}>
                                下载管理
                            </Text>
                        </View>
                    </Item>

                    <Item arrow="horizontal" onClick={() => {this.props.navigation.navigate('ChangePassWord')}}>
                        <View style={{width:winWidth, flexDirection:'row', alignItems:'center'}}>
                            <Image style={{width:20, height:20}} source={require('../../nfcimg/changepass.png')}/>
                            <Text style={{marginLeft:10}}>
                                修改密码
                            </Text>
                        </View>
                    </Item>
                    <Item arrow="horizontal" onClick={() => {this.props.navigation.navigate('MineAbout')}}>
                        <View style={{width:winWidth, flexDirection:'row', alignItems:'center'}}>
                            <Image style={{width:20, height:20}} source={require('../../nfcimg/aboutus.png')}/>
                            <Text style={{marginLeft:10}}>
                                关于我们
                            </Text>
                        </View>
                    </Item>
                </List>

                <View style={{backgroundColor:"#f7f7f7", width:winWidth, height:25}}/>

                <View style={{backgroundColor:'white'
                    , width:winWidth, alignItems:'center', justifyContent:'center', marginBottom:30}}>
                    <Text style={{ marginTop:15, marginBottom:15, fontSize:15}}>
                        退出登录
                    </Text>
                </View>

            </View>

        </ScrollView>);
    }
}