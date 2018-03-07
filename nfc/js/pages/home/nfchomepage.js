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

        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_REPORT, "1.0", "", false, (result) => {

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
            user_name:'',
            searchText:'',
            searchRecord:[{"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'},
                {"time":'2018/02/23', "title":'韩美美', "type":'个人'}],
        }
    }

    render(){
        return(<View style={styles.searchepage}>
            {this._renderHead()}
            {this._renderMid()}
            {this._renderFoot()}
        </View>);
    }



    _renderHead() {
        return (
            <View style={styles.container_head}>
            <View style={{height:60, width:windowWidth, flexDirection:'row', alignItems:'center', backgroundColor:'#2554A2'}}>
                <View style={{flex:1, flexDirection:'row', marginLeft:10, alignItems:'center',}}>
                    <Image source={this.state.user_photo == ''? require('../../img/Mine/avatar.png'):{uri:this.state.user_photo}}
                           style={{width:22, height:22, borderRadius:13}}/>
                    <Text style={{fontSize:12, color:'#ffffff'}}>
                        {this.state.user_name + ',您好'}
                    </Text>
                </View>

                <View style={{flex:1, flexDirection:'row', marginRight:10, alignItems:'center', justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MineRecored')}}>
                        <Text style={{fontSize:14, color:'#ffffff'}}>
                            我的记录
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{flex:1, width:windowWidth, justifyContent:'center', marginTop:30, marginBottom:25, alignItems:'center'}}>
                <Text style={{fontSize:23}}>
                    快速查询
                </Text>
            </View>

            <View style={{height:45, width:345, borderWidth:1, borderColor:"#ea5404"
                , alignSelf:'center', backgroundColor:'white', flexDirection:'row',}}>
                <TextInput
                    underlineColorAndroid="transparent"
                    returnKeyLabel='search'
                    placeholder='请输入人名,身份证，企业名等关键字'
                    style={{height: 45, width:280, marginLeft: 10,}}>

                </TextInput>

                <TouchableOpacity>
                    <Image style={{width:58, height:45, padding:0}} source={require('../../nfcimg/search.png')}/>
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
                <Text style={{fontSize:18, color:'#003f98', marginLeft:10}}>
                    查询记录
                </Text>
            </View>
            <View style={{flex:1, flexDirection:'row', height:100, justifyContent:'flex-end', fontWeight:'bold', alignItems:'center'}}>
                <TouchableOpacity>
                    <Text style={{color:'#003f98', marginRight:10}}>
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
            <TouchableOpacity onPress={()=>{}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={styles.item}>
                        <View style={{flex:3, flexDirection:'row',
                            alignItems:'center',}}>
                            <Text style={{color:'#4352B2', marginRight:5}}>
                                {item.type}
                            </Text>

                            <Text style={{color:'black', marginRight:5}}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <Text>
                                {item.time}
                            </Text>
                            <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#F0F0F2', height:0.5, width:windowWidth}}/>
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
        height:280,
        backgroundColor:'white',
        flexDirection:'column',
    },
    container_mid:{
        height:57,
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
        paddingRight:10,
        paddingLeft:10,
        height:50
    }
});