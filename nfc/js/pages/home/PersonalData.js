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

import ModalDropdown from 'react-native-modal-dropdown';

import { Popover,  Modal, DatePicker, List, Picker, Button } from 'antd-mobile';

import { district } from 'antd-mobile-demo-data';

const Item = Popover.Item;

let winWidth = Dimensions.get('window').width;


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



export default class PersonalData extends Component{

    constructor() {
        super();
        this.state = {
            identity:'',
            name:'',
            dataSelect:[],
            visible:false,

            //Modle标题
            modleTitle:{},


            selectedBradn:{"title":"品牌", "id":"0"},

            selectedVehicles:{"title":"车系", "id":"0"},

            selectedCarModle:{"title":"车型", "id":"0"},

            slelctedHomeType:{"title":"住宅", "id":"3"},

            SelectData:undefined,

            selectedAdd:[],

        }
    }


    render(){
        return(<ScrollView style={styles.container}>
            {this._renderCompanyInfo()}
            {this._renderPersionInfo()}
            {this._renderCarInfo()}
            {this._renderHomeInfo()}
            {this._renderModle()}
            <View style={{width:winWidth, flexDirection:'column'}}>
                <Button type="primary"
                        style={{margin:40}}>
                    立即查询
                </Button>
            </View>
        </ScrollView>);
    }

    _renderCompanyInfo(){
        return(<View style={{width:winWidth, flexDirection:'column'}}>

            <View style={{width:winWidth, flexDirection:'row', marginTop:20, marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                       社会信用代码：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入企业名称：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'black'}}/>

        </View>);
    }

    _renderPersionInfo(){
        return(<View style={{width:winWidth, flexDirection:'column'}}>

            <View style={{width:winWidth, flexDirection:'row', marginTop:20, marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入身份证号码：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入姓名：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'black'}}/>

        </View>);
    }

    _renderHomeInfo(){
        return(<View style={{width:winWidth, flexDirection:'column', marginTop:20}}>
            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        房屋所在区域：
                    </Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row'}}>
                    <View  style={{flex:1, marginRight:10}}>
                        <Picker data={district} cols={2} value={this.state.selectedAdd} onChange={(value)=>this._addressonChange(value)}>
                            <List.Item style={{marginRight:0}}last onClick={this.onClick}>
                                <Text style={{fontSize:13}}>
                                    省市
                                </Text>
                            </List.Item>
                        </Picker>
                    </View>
                </View>
            </View>


            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入房屋名称：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请选择房屋类型：
                    </Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row'}}>
                    <TouchableOpacity
                        onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择房屋类型", "type":SelectType.HOMETYPE}, dataSelect:homeType})}}
                        style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white", justifyContent:'center', alignItems:'center'}}>
                        <Text style={{padding:5}}>{this.state.slelctedHomeType.title}</Text>
                    </TouchableOpacity>


                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入房屋面积：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>


        </View>);
    }

    _renderCarInfo(){
        return(<View style={{width:winWidth, flexDirection:'column'}}>
            <View style={{width:winWidth, flexDirection:'row', marginTop:20, marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请选择车型：
                    </Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row'}}>
                    <TouchableOpacity
                        onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车辆品牌", "type":SelectType.BRAND}, dataSelect:carBrand})}}
                        style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white", justifyContent:'center', alignItems:'center'}}>
                        <Text style={{padding:5}}>{this.state.selectedBradn.title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车系", "type":SelectType.VEHICLES}, dataSelect:vehicles})}}
                        style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white", justifyContent:'center', alignItems:'center'}}>
                        <Text>{this.state.selectedVehicles.title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车型号", "type":SelectType.CARMODLE}, dataSelect:carModle})}}
                        style={{flex:1, marginRight:10, borderWidth:1, borderColor:"white", justifyContent:'center', alignItems:'center'}}>
                        <Text>{this.state.selectedCarModle.title}</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row',marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请选择上牌时间：
                    </Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row'}}>
                    <View style={{flex:1, marginRight:10}}>
                        <DatePicker
                            style={{marginLeft:0}}
                            defaultDate={new Date()}
                            value={this.state.SelectData}
                            mode="date"
                            minDate={this.date1MinDate || (this.date1MinDate = new Date(1990, 1, 1))}
                            maxDate={this.date1MaxDate || (this.date1MaxDate = new Date())}
                            onChange={(value)=>this._dataOnChange(value)}
                            format="YYYY-MM-DD"
                        >
                            <List.Item>
                                <Text style={{fontSize:13}}>
                                    上牌时间
                                </Text>
                            </List.Item>
                        </DatePicker>
                    </View>
                </View>
            </View>


            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请选择车辆属地：
                    </Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row'}}>
                    <View  style={{flex:1, marginRight:10}}>
                        <Picker data={district} cols={2} value={this.state.selectedAdd} onChange={(value)=>this._addressonChange(value)}>
                            <List.Item style={{marginRight:0}}last onClick={this.onClick}>
                                <Text style={{fontSize:13}}>
                                    省市
                                </Text>
                            </List.Item>
                        </Picker>
                    </View>

                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入行车里程：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, flexDirection:'row', marginBottom:20
                , justifyContent:'center'}}>
                <View style={{flex:1.5, flexDirection:'row', justifyContent:'flex-end'
                    , alignItems:'center'}}>
                    <Text style={{fontWeight:'800'}}>
                        请输入车牌号码：
                    </Text>
                </View>
                <View style={{flex:2.5}}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth, height:0.5, backgroundColor:'black'}}/>

        </View>);
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
        return(<Modal title={this.state.modleTitle.title}
                      transparent
                      onClose={()=>this._onCloseModle()}
                      maskClosable
                      visible={this.state.visible}>
            <View style={{ paddingVertical: 20 }}>
                <FlatList
                    data={this.state.dataSelect}
                    renderItem={({item}) => this._renderItem(item)}/>
            </View>
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
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F0F2'
    },

    edit: {
        height: 40,
        backgroundColor: '#fff',
        marginRight: 10
    },
    item:{
        width:70,
        height:40,
        justifyContent:'center',
    },
});