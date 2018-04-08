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
} from 'react-native';
import ScreenUtil from '../../util/ScreenUtil'
import Icon from 'react-native-vector-icons/Ionicons';
import { List, Toast } from 'antd-mobile';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import GlobalStyles from '../../styles/GlobalStyles'
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
                        //
                        searchRecord:result.data.list.splice(0,4),

                    });

                }
                if (result === '10000'){
                    this.fetchDataAfterToken();
                }
                if(result === '10001'){
                    //展示toast，登录过期，并跳转到登录界面

                }

            }
        );
    }
    //刷新token后的再次请求 防止请求多次，写新方法
    fetchDataAfterToken(){
        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_REPORT_ALL, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //
                        searchRecord:result.data.list.splice(0,4),

                    });

                }else {
                    //是否要toast展示
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
            user_name:'hello',
            searchText:'',
            searchRecord:[],
        }
    }

    render(){

        return(<View style={styles.searchepage}>
            <StatusBar backgroundColor={GlobalStyles.themeColor} />
            {this._renderHead()}
            {this._renderMid()}
            {this._renderFoot()}
        </View>);
    }



    _renderHead() {
        let height;
        if(Platform.OS === 'ios'){
            //ios相关操作
            const  isiphoneX = Platform.OS == 'ios'? height==812 &&width ==375 : false;
            global.G_IsiPhoneX = isiphoneX;
            height= G_IsiPhoneX?16:10
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
                backgroundColor:GlobalStyles.themeColor,
                paddingTop:ScreenUtil.scaleSize(50),
                paddingBottom:ScreenUtil.scaleSize(50)}}>
                <View style={{top:height,flex:1, flexDirection:'row', marginLeft:ScreenUtil.scaleSize(20), alignItems:'center',}}>
                    <Image source={this.state.user_photo == ''? require('../../imgResouce/avatar.png'):{uri:this.state.user_photo}}
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
                    style={{flex:1,backgroundColor: '#fff', paddingLeft: ScreenUtil.scaleSize(20),}}>

                </TextInput>

                <TouchableOpacity onPress={()=>{this.state.searchText == ''?Toast.info('请输入查询条件', 0.5):this.props.navigation.navigate('SearchList', this.state.searchText)}} >
                    <Image style={{width:ScreenUtil.scaleSize(109), height:ScreenUtil.scaleSize(88), padding:0}} source={require('../../imgResouce/search.png')}/>
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
                <Text style={{fontSize:18, color:GlobalStyles.themeColor, marginLeft:ScreenUtil.scaleSize(20)}}>
                    查询记录
                </Text>
            </View>
            <View style={{flex:1, flexDirection:'row', height:ScreenUtil.scaleSize(200), justifyContent:'flex-end', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('homeMorelist')}} >
                    <Text style={{color:GlobalStyles.themeColor, marginRight:ScreenUtil.scaleSize(20)}}>
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
    rendertag(infp){
        let imagestr = ""+infp.reportType;
        substrArray = imagestr.split(",");


        return(

            <View style={{ flexDirection:'row',
                alignItems:'center',
            }}>
                {substrArray.includes('PERSON_RISK') ?this.rendertag1():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag2():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag3():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag4():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag5():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag6():null}
                {substrArray.includes('7') ?this.rendertag7():null}
                {substrArray.includes('8') ?this.rendertag8():null}
                {substrArray.includes('9') ?this.rendertag9():null}
                {substrArray.includes('10') ?this.rendertag10():null}

            </View>
        )
    }
    rendertag1(){
        return(<Image source={require('../../imgResouce/anti_fraud_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag2(){
        return(<Image source={require('../../imgResouce/car_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag3(){
        return( <Image source={require('../../imgResouce/company_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag4(){
        return(<Image source={require('../../imgResouce/credit_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag5(){
        return(<Image source={require('../../imgResouce/home_estimate_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag6(){
        return(<Image source={require('../../imgResouce/home_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag7(){
        return(<Image source={require('../../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag8(){
        return(<Image source={require('../../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag9(){
        return(<Image source={require('../../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag10(){
        return(<Image source={require('../../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    _renderItem(item){

        return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('WebViewCommunication')}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={styles.item}>
                        <View style={{flex:4, flexDirection:'row',
                            alignItems:'center',}}>
                            <Text style={{color:GlobalStyles.themeColor, marginRight:ScreenUtil.scaleSize(10)}}>
                                {item.queryType ==='PERSON'? '个人': '公司'}
                            </Text>

                            <Text style={{color:'black', marginRight:ScreenUtil.scaleSize(10)}}>
                                {item.queryKey}
                            </Text>
                            {this.rendertag(item)}
                        </View>
                        <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <Text>
                                {item.createTime.substr(0,10).replace("-","/").replace("-","/")}
                            </Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#F0F0F2', height:ScreenUtil.scaleSize(1), width:windowWidth}}/>
                </View>
            </TouchableOpacity>
        );
    }

    componentWillUnmount(){
        console.log('----componentWillUnmount--------')
        Keyboard.dismiss();
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