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
    KeyboardAvoidingView,
    ActionSheetIOS,
    Modal
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import Picker1 from 'react-native-picker';
import {commonStyle} from '../../../js/util/commonStyle'
import { Popover,  DatePicker, List, Picker, Button } from 'antd-mobile';
import {BaseComponent} from  '../../base/BaseComponent'
import { district } from 'antd-mobile-demo-data';

const Item = Popover.Item;

let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').width;


const SelectType = {
    BRAND: 'carBrand',
    VEHICLES: 'vehicles',
    CARMODLE: 'carModle',
    HOMETYPE:'hometype',
}

//品牌数据
const carBrand = [{id:1, info:"aodi"}, {id:2, info:"kiv"}, {id:3, info:"benchi"}
    , {id:4, info:"dazhong"},{id:5, info:"xuefeilan"}];
//车系数据
const vehicles = [{id:8, info:"xian"},{id:1, info:"hefei"}, {id:2, info:"shanghai"}, {id:3, info:"feidong"}
    , {id:4, info:"feixi"},{id:5, info:"bengbu"}];
//车型数据
const carModle = [{id:8, info:"2017kuan"},{id:1, info:"2018kuan"}, {id:2, info:"2019kuan"}, {id:3, info:"2014kuan"}
    , {id:8, info:"2017kuan"},{id:1, info:"2018kuan"}, {id:2, info:"2019kuan"}, {id:3, info:"2014kuan"}
    ,{id:8, info:"2017kuan"},{id:1, info:"2018kuan"}, {id:2, info:"2019kuan"}, {id:3, info:"2014kuan"}
    , {id:8, info:"2017kuan"},{id:1, info:"2018kuan"}, {id:2, info:"2019kuan"}, {id:3, info:"2014kuan"}
    ,{id:8, info:"2017kuan"},{id:1, info:"2018kuan"}, {id:2, info:"2019kuan"}, {id:3, info:"2014kuan"}];

const homeType = [{id:1, info:"写字楼"}, {id:2, info:'商铺'}, {id:3, info:"住宅"}];



export default class PersonalData extends BaseComponent{
    navigationBarProps() {

        return {
            title: '查询',
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

    fetchAddressData(type){
        // 查询省
        var newParams= NetAPI.PUBLIC_DIC_INFO+'?type=AREA_CODE' + type;
        NetUtils.get(NetAPI.serverUrl2, newParams , "1.0", "", false, (result) => {

                console.log(result)

                if (result.code === 0) {
                    if(result.data.length == 0){
                        if(this.state.isSelected_two){
                            this.setState({data:[this.state.selected2]});
                        }else{
                            if(this.state.isSelected_one){
                                this.setState({data:[this.state.selected1]});
                            }
                        }
                    }else{
                        this.setState({data:result.data});
                    }
                }
            }
        );
    }

//网络请求
    fetchData(data) {
        //这个是js的访问网络的方法

        // 查询车品牌
        var CarParams= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_BRAND'
        NetUtils.get(NetAPI.serverUrl2, CarParams , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {



                }


            }
        );
        // 查询车系
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_SERIES&parentCode=RUF'
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {



                }


            }
        );

        // 查询车型
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_MODEL&parentCode=RUF,CAR_MODEL'
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {

                }


            }
        );


    }
    componentDidMount() {


        console.log('===================componentDidMount====================');
        this.props.navigation.state.params.type == 0 ?
            this.setState({
                type:0
                , creditReport:this.props.navigation.state.params.creditReport
                , antiFraud:this.props.navigation.state.params.antiFraud
                , riskManage:this.props.navigation.state.params.riskManage
                , all:this.props.navigation.state.params.all
                , homeRent:this.props.navigation.state.params.homeRent
                , carPrice:this.props.navigation.state.params.carPrice
                , homePrice:this.props.navigation.state.params.homePrice

            })

            :this.setState({
                type:1
                , companyRiskManage:this.props.navigation.state.params.companyRiskManage
                , all:this.props.navigation.state.params.all
                , homeRent:this.props.navigation.state.params.homeRent
                , carPrice:this.props.navigation.state.params.carPrice
                , homePrice:this.props.navigation.state.params.homePrice
            });
        this.fetchData()
        this.fetchAddressData('');
    }


    constructor() {
        super();
        this.state = {
            identity:'',
            name:'',
            dataSelect:[],
            visible:false,

            //Modle标题
            modleTitle:{},


            selectedBradn:{"title":"请选择品牌", "id":"0"},

            selectedVehicles:{"title":"请选择车系", "id":"0"},

            selectedCarModle:{"title":"请选择车型号", "id":"0"},

            slelctedHomeType:{"title":"请住宅类型", "id":"3"},

            SelectData:undefined,

            selectedAdd:[],

            selectedCarAddress:[],

            type:0,

            /*--------------------查个人-------------------------*/
            //个人信用报告
            creditReport:false,
            //反欺诈分析
            antiFraud:false,
            //个人风险概要
            riskManage:false,
            /*--------------------查个人-------------------------*/
            /*---------------------查企业----------------------------*/
            //个人风险概要
            companyRiskManage:false,
            /*---------------------查企业----------------------------*/

            /*----------------------共同参数---------------------------*/
            all:false,
            //房屋租金评估
            homeRent:false,
            //车辆售价评估
            carPrice:false,
            //房屋售价评估
            homePrice:false,
            /*----------------------共同参数---------------------------*/

           data:[],
            selected1:{code:''},
            selected2:{code:''},
            selected3:{code:''},
            isSelected_one:false,
            isSelected_two:false,
            isSelected_three:false,
            addVisible:false,

            isselect_home_add:false,
            isselect_car_add:false,
        }
    }


    _render(){
        return(<ScrollView style={styles.container}>
            <View style={{width:winWidth, flexDirection:'column'}}>

                {this._renderCompanyInfo()}
                {this._renderPersionInfo()}
                {this._renderCarInfo()}
                {this._renderHomeInfo()}
                {this._renderModle()}
                {this._renderAddModle()}

                <View style={{width:winWidth, justifyContent:'center', flexDirection:'row', marginTop:50, marginBottom:50}}>

                    <TouchableOpacity style={{width:250, height:44, backgroundColor:'#1b54a5', alignItems:'center',
                        justifyContent:'center', borderRadius:4}}
                                      onPress={()=>{this.props.navigation.navigate('WebViewCommunication')}}>
                        <Text style={{fontSize:16, color:'#ffffff'}}>
                            立即查询
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>);
    }




    _renderCompanyInfo(){
        if(this.state.type == 1){
            if(this.state.all || this.state.companyRiskManage){
                return(<View style={{width:winWidth, flexDirection:'column', marginTop:10, backgroundColor:'white'}}>

                    <View style={styles.item_view}>
                        <View style={{flex:1.5, flexDirection:'row'
                            , alignItems:'center'}}>
                            <Text style={{}}>
                                社会信用代码：
                            </Text>
                        </View>
                        <View style={{flex:2.5,flexDirection:'row'
                            , alignItems:'center'}}>
                            <TextInput
                                style={styles.edit}
                                underlineColorAndroid='transparent'/>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.item_view}>
                        <View style={{flex:1.5, flexDirection:'row'
                            , alignItems:'center'}}>
                            <Text style={{}}>
                                请输入企业名称：
                            </Text>
                        </View>
                        <View style={{flex:2.5, flexDirection:'row'
                            , alignItems:'center'}}>
                            <TextInput
                                style={styles.edit}
                                underlineColorAndroid='transparent'/>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.blank}></View>

                </View>);
            }
        }

    }

    _renderPersionInfo(){
        if(this.state.type == 0){
            if(this.state.all || (this.state.creditReport || this.state.antiFraud || this.state.riskManage)){
                return(
                    <View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', marginTop:10}}>

                        <View style={styles.item_view}>
                            <View style={{flex:1.5, flexDirection:'row'
                                , alignItems:'center'}}>
                                <Text style={{}}>
                                    请输入身份证号码：
                                </Text>
                            </View>
                            <View style={{flex:2.5}}>
                                <TextInput
                                    style={styles.edit}
                                    underlineColorAndroid='transparent'/>
                            </View>
                        </View>

                        <View style={styles.line}/>

                        <View style={styles.item_view}>
                            <View style={{flex:1.5, flexDirection:'row'
                                , alignItems:'center'}}>
                                <Text style={{}}>
                                    请输入姓名：
                                </Text>
                            </View>
                            <View style={{flex:2.5}}>
                                <TextInput
                                    style={styles.edit}
                                    underlineColorAndroid='transparent'/>
                            </View>
                        </View>

                        <View style={styles.line}/>

                        <View style={styles.blank}></View>

                    </View>);
            }
        }
    }

    _renderHomeInfo(){

        if(this.state.all || (this.state.homeRent || this.state.homePrice)){
            return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            房屋所在区域：
                        </Text>
                    </View>
                    <View style={{flex:2.5, flexDirection:'row'}}>
                        <TouchableOpacity  style={{flex:1, marginRight:10, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_home_add:true, isselect_car_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>{
                                this.state.selectedAdd.length == 0?
                                '请选择': this.state.selectedAdd[0].code == this.state.selectedAdd[1].code?
                                    this.state.selectedAdd[0].caption:this.state.selectedAdd[1].code == this.state.selectedAdd[2].code?
                                        this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption
                                        : this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption + this.state.selectedAdd[2].caption}</Text>
                            <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.line}/>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请输入房屋名称：
                        </Text>
                    </View>
                    <View style={{flex:2.5}}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid='transparent'/>
                    </View>
                </View>

                <View style={styles.line}/>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请选择房屋类型：
                        </Text>
                    </View>
                        <View style={{flex:2.5, flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择房屋类型", "type":SelectType.HOMETYPE}, dataSelect:homeType})}}
                                style={{flex:1, marginRight:10, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                    <Text style={{fontSize:15, color:'#999999'}}>{this.state.slelctedHomeType.title}</Text>
                                    <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>

                </View>

                <View style={styles.line}/>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请输入房屋面积：
                        </Text>
                    </View>
                    <View style={{flex:2.5}}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid='transparent'/>
                    </View>
                </View>

                <View style={styles.line}/>

                <View style={styles.blank}></View>

            </View>);
        }

    }

    _renderCarInfo(){
        if(this.state.all || this.state.carPrice){
            return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={{ width:winWidth,
                    flexDirection:'column',
                    height:150,
                    justifyContent:'center',
                    paddingLeft:15,
                    paddingRight:15}}>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{}}>
                                请选择车型：
                            </Text>
                        </View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车辆品牌", "type":SelectType.BRAND}, dataSelect:carBrand})}}
                                style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white", flexDirection:'row'
                                    , justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:15, color:'#999999'}}>{this.state.selectedBradn.title}</Text>
                                <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车系", "type":SelectType.VEHICLES}, dataSelect:vehicles})}}
                                style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:15, color:'#999999'}}>{this.state.selectedVehicles.title}</Text>
                                <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车型号", "type":SelectType.CARMODLE}, dataSelect:carModle})}}
                                style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:15, color:'#999999'}}>{this.state.selectedCarModle.title}</Text>
                                <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}/>

                </View>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请选择上牌时间：
                        </Text>
                    </View>
                    <View style={{flex:2.5, flexDirection:'row'}}>
                        <TouchableOpacity  style={{flex:1, marginRight:10, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                            <Text style={{fontSize:15, color:'#999999'}}>请选择</Text>
                            <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.line}/>


                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请选择车辆属地：
                        </Text>
                    </View>
                    <View style={{flex:2.5, flexDirection:'row'}}>
                        <TouchableOpacity  style={{flex:1, marginRight:10, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_car_add:true, isselect_home_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>
                                {this.state.selectedCarAddress.length == 0?
                                    '请选择': this.state.selectedCarAddress[0].code == this.state.selectedCarAddress[1].code?
                                        this.state.selectedCarAddress[0].caption:this.state.selectedCarAddress[1].code == this.state.selectedCarAddress[2].code?
                                        this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption
                                            : this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption + this.state.selectedCarAddress[2].caption}
                                </Text>
                            <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.line}/>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请输入行车里程：
                        </Text>
                    </View>
                    <View style={{flex:2.5}}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid='transparent'/>
                    </View>
                </View>
                <View style={styles.line}/>

                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请输入车牌号码：
                        </Text>
                    </View>
                    <View style={{flex:2.5}}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid='transparent'/>
                    </View>
                </View>

                <View style={styles.line}/>

                <View style={styles.blank}></View>

            </View>);
        }

    }

    _addressonChange(value){
        console.log(value);
        this.setState({ selectedAdd: value });
    };

    _dataOnChange(value){
        console.log("valuse For Data==>" + value)
        this.setState({SelectData:value});
    }

    _onCloseModle(){
        this.setState({
            visible:false
        });
    }

    _onCloseAddModle(){
        this.setState({
            addVisible:false
        });
    }

    _renderModle(){
        return(<Modal visible={this.state.visible}>
            <View style={{ paddingVertical: 20 }}>
                <FlatList
                    data={this.state.dataSelect}
                    renderItem={({item}) => this._renderItem(item)}/>
            </View>
        </Modal>);
    }


    _renderAddModle(){
        return(<Modal
            transparent={true}
            visible={this.state.addVisible}>
            {this._renderAddress()}
        </Modal>);
    }



    _selectedInfo(item){
        switch (this.state.modleTitle.type){
            case SelectType.BRAND:
                this.setState({selectedBradn:{"title": item.info, "id": item.id}})
                break;
            case SelectType.CARMODLE:
                this.setState({selectedCarModle:{"title": item.info, "id": item.id}})
                break;
            case SelectType.VEHICLES:
                this.setState({selectedVehicles:{"title": item.info, "id": item.id}})
                break;
            case SelectType.HOMETYPE:
                this.setState({slelctedHomeType:{"title":item.info, "id":item.id}})
                break;
        }
        this._onCloseModle();
    }

    _renderItem(item){
        console.log("item: " + JSON.stringify(item))
        return(
            <TouchableOpacity onPress={()=>{this._selectedInfo(item)}}>
                <View style={styles.item}>
                    <Text>{item.info}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**-------------------------------------------------------------------------------------------------------**/
    _renderAddress(){
        return(<View style={{flex:1,flexDirection:'column', backgroundColor:'rgba(0, 0, 0, 0.4)'}}>
            <TouchableOpacity style={{flex:3}} onPress={()=>{this.setState({addVisible:false,});}}></TouchableOpacity>
            <View style={{flex:7, width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={{flex:1,width:winWidth, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text>请选择地址</Text>
                </View>
                <View style={styles.line}/>
                <View style={{flex:1,width:winWidth, flexDirection:'row', alignItems:'center', justifyContent:'center',}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>{this.fetchAddressData(''), this.setState({isSelected_one:false, isSelected_two:false, isSelected_three:false,})}}>
                        {this.state.isSelected_one?<Text>{this.state.selected1.caption}</Text>:<Text>请选择</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.isSelected_two} style={{flex:1}}
                                      onPress={()=>{this.fetchAddressData('&parentCode=' + this.state.selected1.code), this.setState({isSelected_two:false, isSelected_three:false,})}}>
                        {this.state.isSelected_one?this.state.isSelected_two?<Text>{this.state.selected2.caption}</Text>:<Text>请选择</Text>:<Text/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} disabled={!this.state.isSelected_three}
                                      onPress={()=>{this.fetchAddressData('&parentCode=' + this.state.selected2.code);  this.setState({isSelected_three:false,})}}>
                        {this.state.isSelected_one && this.state.isSelected_two? this.state.isSelected_three?<Text>{this.state.selected3.caption}</Text>:<Text>请选择</Text>:<Text/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
                <View style={{flex:8}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item})=><TouchableOpacity onPress={()=>{this._choseItem(item)}}>
                            <View style={{width:winWidth,flexDirection:'row', alignItems:'center'}}>
                                <Text style={{paddingTop:10, paddingBottom:10}}>{item.caption}</Text>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>

            </View>
        </View>);
    }


    _separator(){
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }

    _choseItem(item){

        var item1, item2, item3

        if(this.state.isSelected_one){
            if(this.state.isSelected_two){
                if(this.state.isSelected_three){
                    item1 = this.state.selected1;
                    item2 = this.state.selected2
                    item3 = item;
                    this.setState({
                        selected3:item,
                        isSelected_three:true,
                        addVisible:false,
                    });
                    if(this.state.isselect_home_add){
                        this.setState({selectedAdd:[item1, item2, item3]});
                    }
                    if(this.state.isselect_car_add){
                        this.setState({selectedCarAddress:[item1, item2, item3]});
                    }
                }else{
                    item2 = this.state.selected2
                    item1 = this.state.selected1;
                    item3 = item;
                    this.setState({
                        selected3:item,
                        isSelected_three:true,
                        addVisible:false,
                    });
                    if(this.state.isselect_home_add){
                        this.setState({selectedAdd:[item1, item2, item3]});
                    }
                    if(this.state.isselect_car_add){
                        this.setState({selectedCarAddress:[item1, item2, item3]});
                    }
                }
            }else{
                this.setState({
                    selected2:item,
                    isSelected_two:true,
                    isSelected_three:false,
                });
                this.fetchAddressData('&parentCode=' + item.code)
            }
        }else{
            this.setState({
                selected1:item,
                isSelected_one:true,
                isSelected_two:false,
                isSelected_three:false,
            });
            this.fetchAddressData('&parentCode=' + item.code)
        }
    }

    /**-------------------------------------------------------------------------------------------------------**/
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7'
    },

    edit: {
        height: 40,
        flex:1,
        backgroundColor: '#fff',
        marginRight: 10
    },
    item:{
        width:70,
        height:40,
        justifyContent:'center',
    },
    line:{
        width:winWidth,
        height:1,
        backgroundColor:'#f7f7f7'
    },
    item_view:{
        width:winWidth,
        flexDirection:'row',
        height:50,
        justifyContent:'center',
        paddingLeft:15,
        paddingRight:15
    },
    blank:{
        width:winWidth,
        height:15,
        backgroundColor:'#f7f7f7'
    }
});