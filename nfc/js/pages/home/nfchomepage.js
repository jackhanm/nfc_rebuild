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
    Keyboard,
    StatusBar,
    Platform,
    NativeAppEventEmitter,NativeEventEmitter,NativeModules
} from 'react-native';

import ScreenUtil from '../../util/ScreenUtil'

import Icon from 'react-native-vector-icons/Ionicons';

import { List } from 'antd-mobile';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
const Item = List.Item;

export default class nfchomepage extends Component{

    //网络请求
    fetchData(data) {
        //这个是js的访问网络的方法


        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_REPORT_ALL, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //复制数据源
                    });
                }
            }
        );
    }

    componentDidMount() {
        //请求数据

        this.fetchData();

    }

    constructor(props){
        super(props);
        this.state={
            user_photo:'',
            user_name:'余浩',
            searchText:'',
            searchRecord:[{"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'}],
        }
    }

    render(){
        return(<View style={styles.searchepage}>
            <StatusBar backgroundColor={'#1B52A2'} />
            {this._renderHead()}
            {this._renderMid()}
            {this._renderFoot()}
        </View>);
    }



    _renderHead() {
        let height;
        if(Platform.OS === 'ios'){
            //ios相关操作
            height=10
        }else{
            console.log('Andorid')
            //android相关操作
            height=0
        }
        return (
            <View style={styles.container_head}>
            <View style={{height:ScreenUtil.scaleSize(128),
                width:windowWidth, flexDirection:'row',
                alignItems:'center',
                backgroundColor:'#2554A2',
                paddingTop:ScreenUtil.scaleSize(50),
                paddingBottom:ScreenUtil.scaleSize(50)}}>
                <View style={{top:height,flex:1, flexDirection:'row', marginLeft:ScreenUtil.scaleSize(20), alignItems:'center',}}>
                    <Image source={this.state.user_photo == ''? require('../../img/Mine/avatar.png'):{uri:this.state.user_photo}}
                           style={{width:ScreenUtil.scaleSize(44), height:ScreenUtil.scaleSize(44), borderRadius:ScreenUtil.scaleSize(22)}}/>
                    <Text style={{marginLeft:ScreenUtil.scaleSize(20),fontSize:12, color:'#ffffff'}}>
                        {this.state.user_name + ',您好'}
                    </Text>
                </View>

                <View style={{top:height,flex:1, flexDirection:'row', marginRight:ScreenUtil.scaleSize(20), alignItems:'center', justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MineRecored')}}>
                        <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#ffffff'}}>
                            我的记录
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1, width:windowWidth, justifyContent:'center', marginTop:ScreenUtil.scaleSize(60), marginBottom:ScreenUtil.scaleSize(50), alignItems:'center'}}>
                <Text style={{fontSize:23}}>
                    快速查询
                </Text>
            </View>

            <View style={{height:ScreenUtil.scaleSize(90), width:ScreenUtil.scaleSize(690), borderWidth:ScreenUtil.scaleSize(2), borderColor:"#ea5404"
                , alignSelf:'center', backgroundColor:'white', flexDirection:'row',}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    returnKeyLabel='search'
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder='请输入人名,身份证，企业名等关键字'
                    onChangeText={(searchText) => this.setState({searchText})}
                    style={{height: ScreenUtil.scaleSize(90), width:ScreenUtil.scaleSize(560), marginLeft: ScreenUtil.scaleSize(20),}}>

                </TextInput>

                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchList', this.state.searchText)}} >
                    <Image style={{width:ScreenUtil.scaleSize(109), height:ScreenUtil.scaleSize(88), padding:0}} source={require('../../nfcimg/search.png')}/>
                </TouchableOpacity>

            </View>

            <View style={{flex:1, width:windowWidth, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:12, color:'#666666'}}>
                    tip:如无结果，请使用精确查询
                </Text>
            </View>

        </View>);
    }

    _renderMid(){
        return(<View style={styles.container_mid}>
            <View style={{flex:2, flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:18, color:'#003f98', marginLeft:ScreenUtil.scaleSize(20)}}>
                    查询记录
                </Text>
            </View>
            <View style={{flex:1, flexDirection:'row', height:ScreenUtil.scaleSize(200), justifyContent:'flex-end', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('homeMorelist')}} >
                    <Text style={{color:'#003f98', marginRight:ScreenUtil.scaleSize(20)}}>
                        更多
                    </Text>
                </TouchableOpacity>
            </View>
        </View>);
    }

    _renderFoot(){
        return(<FlatList
            data={this.state.searchRecord}
            renderItem={({item}) => this._renderItem(item)}
        />);
    }

    _renderItem(item){
        return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('WebViewCommunication')}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={styles.item}>
                        <View style={{flex:3, flexDirection:'row',
                            alignItems:'center',}}>
                            <Text style={{color:'#4352B2', marginRight:ScreenUtil.scaleSize(10)}}>
                                {item.type}
                            </Text>

                            <Text style={{color:'black', marginRight:ScreenUtil.scaleSize(10)}}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <Text>
                                {item.time}
                            </Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#F0F0F2', height:ScreenUtil.scaleSize(1), width:windowWidth}}/>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    searchepage:{
        flex:1,
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'#F0F0F2',
        flexDirection:'column'
    },
    container_head:{
        width:windowWidth,
        height:ScreenUtil.scaleSize(560),
        backgroundColor:'white',
        flexDirection:'column',
    },
    container_mid:{
        height:ScreenUtil.scaleSize(114),
        width:windowWidth,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f7f7f7'
    },

    item:{
        flex:1,
      width:windowWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:ScreenUtil.scaleSize(20),
        paddingLeft:ScreenUtil.scaleSize(20),
        height:ScreenUtil.scaleSize(100)
    }
});