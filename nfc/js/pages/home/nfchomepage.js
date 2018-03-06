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
        return (<View style={styles.container_head}>
            <View style={{ height:20, width:windowWidth, flexDirection:'row', marginTop:10, justifyContent:'center'}}>
                <View style={{flex:1, flexDirection:'row', marginLeft:10}}>
                    <Image source={this.state.user_photo == ''? require('../../img/Mine/avatar.png'):{uri:this.state.user_photo}}
                           style={{width:26, height:26, borderRadius:13}}/>
                    <Text>
                        {this.state.user_name + ',您好'}
                    </Text>
                </View>

                <View style={{alignSelf:'flex-end', marginRight:10}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MineRecored')}}>
                        <Text>
                            我的记录
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{flex:1, width:windowWidth, justifyContent:'center', marginTop:30, marginBottom:25, alignItems:'center'}}>
                <Text style={{fontSize:40, color:'#FFFFFF', fontWeight:'bold'}}>
                    快速查询
                </Text>
            </View>

            <View style={{height:40, width:windowWidth - 30, borderWidth:1, borderColor:"white"
                , alignSelf:'center', backgroundColor:'white', flexDirection:'row'}}>
                <Icon.Button
                    color='black'
                    size={25}
                    backgroundColor={'white'}
                    name="ios-search"
                    onPress={()=>{}}
                />

                <TextInput
                    underlineColorAndroid="transparent"
                    returnKeyLabel='search'
                    placeholder='请输入人名,身份证，企业名等关键字'
                    style={{height: 40, flex:1, marginRight: 10}}>

                </TextInput>

            </View>

            <View style={{flex:1, width:windowWidth, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:15, color:'#FFFFFF'}}>
                    tip:如无结果，请使用精确查询
                </Text>
            </View>

        </View>);
    }

    _renderMid(){
        return(<View style={styles.container_mid}>
            <View style={{flex:1}}/>
            <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:30, color:'black', fontWeight:'bold'}}>
                    查询记录
                </Text>
            </View>
            <View style={{flex:1, flexDirection:'row', height:100, justifyContent:'flex-start', fontWeight:'bold', alignItems:'center'}}>
                <TouchableOpacity>
                    <Text style={{color:'black', marginLeft:20, marginTop:10}}>
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
                            <Text style={{color:'#4352B2', fontWeight:'bold', marginRight:5}}>
                                {item.type}
                            </Text>

                            <Text style={{color:'black', fontWeight:'bold', marginRight:5}}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <Text>
                                {item.time}
                            </Text>
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
        backgroundColor:'#707597',
        flexDirection:'column',
    },
    container_mid:{
        height:100,
        width:windowWidth,
        flexDirection:'row',
        alignItems:'center',
    },

    item:{
        flex:1,
      width:windowWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        padding:10
    }
});