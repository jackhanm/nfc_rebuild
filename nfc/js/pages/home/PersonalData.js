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
import { Popover,Toast} from 'antd-mobile';
import {BaseComponent} from  '../../base/BaseComponent'
import { district } from 'antd-mobile-demo-data';

const Item = Popover.Item;

let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').width;
import ScreenUtil from '../../util/ScreenUtil'


const SelectType = {
    BRAND: 'carBrand',
    VEHICLES: 'vehicles',
    CARMODLE: 'carModle',
    HOMETYPE:'hometype',
}

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

    _showToast(info) {
        Toast.info(info, 1);
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

    // 查询车品牌
    fetchCarBrand(){
        var CarParams= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_BRAND'
        NetUtils.get(NetAPI.serverUrl2, CarParams , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data});
                }
            }
        );
    }

    // 查询车系
    fetcheCarSeries(type){
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_SERIES' + type
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data});
                }
            }
        );
    }

// 查询车型
    fetchCarModel(type) {
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_MODEL' + type + ',CAR_MODEL'
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data});
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
        this.fetchCarBrand();
        this.fetchAddressData('');
    }


    constructor() {
        super();
        this.state = {
            identity:'',
            name:'',
            visible:false,

            //Modle标题
            modleTitle:{},

            slelctedHomeType:{"title":"请住宅类型", "id":"3"},

            SelectData:undefined,

            //地址选择结果
            selectedAdd:[],

            //车辆属地选择结果
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

            /**------------------车型车系--------------------**/
            carData:[],
            selectedBradn:{caption:'请选择车品牌', code:"0"},

            selectedVehicles:{caption:'请选择车系', code:"0"},

            selectedCarModle:{caption:'请选择车型', code:"0"},
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

                <View style={{width:winWidth, justifyContent:'center', flexDirection:'row', marginTop:ScreenUtil.scaleSize(100), marginBottom:ScreenUtil.scaleSize(100)}}>

                    <TouchableOpacity style={{width:ScreenUtil.scaleSize(500), height:ScreenUtil.scaleSize(88), backgroundColor:'#1b54a5', alignItems:'center',
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
                return(<View style={{width:winWidth, flexDirection:'column', marginTop:ScreenUtil.scaleSize(20), backgroundColor:'white'}}>

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
                    <View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', marginTop:ScreenUtil.scaleSize(20)}}>

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
                        <TouchableOpacity  style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_home_add:true, isselect_car_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>{
                                this.state.selectedAdd.length == 0?
                                '请选择': this.state.selectedAdd[0].code == this.state.selectedAdd[1].code?
                                    this.state.selectedAdd[0].caption:this.state.selectedAdd[1].code == this.state.selectedAdd[2].code?
                                        this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption
                                        : this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption + this.state.selectedAdd[2].caption}</Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
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
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择房屋类型", "type":SelectType.HOMETYPE}})}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                    <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{this.state.slelctedHomeType.title}</Text>
                                    <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
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

    _choeseCarVehicles(){
        this.fetcheCarSeries('&parentCode=' + this.state.selectedBradn.code)
        this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车系", "type":SelectType.VEHICLES},})
    }

    _choeseCarModle(){
        this.fetchCarModel('&parentCode=' + this.state.selectedVehicles.code)
        this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车型号", "type":SelectType.CARMODLE},})
    }

    _renderCarInfo(){
        if(this.state.all || this.state.carPrice){
            return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={{ width:winWidth,
                    flexDirection:'column',
                    height:ScreenUtil.scaleSize(300),
                    justifyContent:'center',
                    paddingLeft:ScreenUtil.scaleSize(30),
                    paddingRight:ScreenUtil.scaleSize(30)}}>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{}}>
                                请选择车型：
                            </Text>
                        </View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车辆品牌", "type":SelectType.BRAND}})}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:ScreenUtil.scaleSize(2), borderColor:"white", flexDirection:'row'
                                    , justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{this.state.selectedBradn.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.state.selectedBradn.code == '0'?
                                    this._showToast('请选择车牌'):this._choeseCarVehicles()}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:ScreenUtil.scaleSize(2), borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:15, color:'#999999'}}>{this.state.selectedVehicles.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.state.selectedVehicles.code == '0'?
                                        this._showToast('请选择车系'):this._choeseCarModle()}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:1, borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{this.state.selectedCarModle.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
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
                        <TouchableOpacity  style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                            <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>请选择</Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
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
                        <TouchableOpacity  style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_car_add:true, isselect_home_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>
                                {this.state.selectedCarAddress.length == 0?
                                    '请选择': this.state.selectedCarAddress[0].code == this.state.selectedCarAddress[1].code?
                                        this.state.selectedCarAddress[0].caption:this.state.selectedCarAddress[1].code == this.state.selectedCarAddress[2].code?
                                        this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption
                                            : this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption + this.state.selectedCarAddress[2].caption}
                                </Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../nfcimg/backicon.png')}/>
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


    _renderModle(){
        return(<Modal visible={this.state.visible}transparent={true}>
            <View style={{flex:1, flexDirection:'column', backgroundColor:'rgba(0, 0, 0, 0.4)'}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>{this._onCloseModle()}}></TouchableOpacity>
                <View style={{flex:3, margin:ScreenUtil.scaleSize(20), backgroundColor:'white', flexDirection:'column', alignItems:'center', borderRadius: ScreenUtil.scaleSize(16),}}>
                    <View style={{width:winWidth, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{marginTop:ScreenUtil.scaleSize(30), marginBottom:ScreenUtil.scaleSize(30)}}>
                            {this.state.modleTitle.title}
                        </Text>
                    </View>
                    <View style={styles.line}/>
                    <FlatList
                        data={this.state.carData}
                        renderItem={({item}) => this._renderItem(item)}
                        ItemSeparatorComponent={this._separator}/>
                </View>
                <TouchableOpacity style={{flex:1}} onPress={()=>{this._onCloseModle()}}></TouchableOpacity>
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
                this.setState({selectedBradn:item})
                break;
            case SelectType.CARMODLE:
                this.setState({selectedCarModle:item})
                break;
            case SelectType.VEHICLES:
                this.setState({selectedVehicles:item})
                break;
            case SelectType.HOMETYPE:
                this.setState({slelctedHomeType:item})
                break;
        }
        this._onCloseModle();
    }

    _renderItem(item){
        console.log("item: " + JSON.stringify(item))
        return(
            <TouchableOpacity onPress={()=>{this._selectedInfo(item)}}>
                <View style={styles.item}>
                    <Text>{item.caption}</Text>
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
                    <TouchableOpacity style={{flex:1, paddingLeft:ScreenUtil.scaleSize(20)}}
                                      onPress={()=>{this.fetchAddressData(''), this.setState({isSelected_one:false, isSelected_two:false, isSelected_three:false,})}}>
                        {this.state.isSelected_one?<Text>{this.state.selected1.caption}</Text>:<Text>请选择</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.isSelected_two} style={{flex:1,  paddingLeft:ScreenUtil.scaleSize(20)}}
                                      onPress={()=>{this.fetchAddressData('&parentCode=' + this.state.selected1.code), this.setState({isSelected_two:false, isSelected_three:false,})}}>
                        {this.state.isSelected_one?this.state.isSelected_two?<Text>{this.state.selected2.caption}</Text>:<Text>请选择</Text>:<Text/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1 , paddingLeft:ScreenUtil.scaleSize(20)}} disabled={!this.state.isSelected_three}
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
                                <Text style={{paddingTop:ScreenUtil.scaleSize(20), paddingBottom:ScreenUtil.scaleSize(20), paddingLeft:ScreenUtil.scaleSize(20)}}>{item.caption}</Text>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>

            </View>
        </View>);
    }


    _separator(){
        return <View style={{height:ScreenUtil.scaleSize(1),backgroundColor:'#f7f7f7'}}/>;
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
        height: ScreenUtil.scaleSize(80),
        flex:1,
        backgroundColor: '#fff',
        marginRight: ScreenUtil.scaleSize(20)
    },
    item:{
        marginTop:ScreenUtil.scaleSize(10),
        marginBottom:ScreenUtil.scaleSize(10),
        width:winWidth - ScreenUtil.scaleSize(40),
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        width:winWidth,
        height:ScreenUtil.scaleSize(2),
        backgroundColor:'#f7f7f7'
    },
    item_view:{
        width:winWidth,
        flexDirection:'row',
        height:ScreenUtil.scaleSize(100),
        justifyContent:'center',
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30)
    },
    blank:{
        width:winWidth,
        height:ScreenUtil.scaleSize(30),
        backgroundColor:'#f7f7f7'
    }
});