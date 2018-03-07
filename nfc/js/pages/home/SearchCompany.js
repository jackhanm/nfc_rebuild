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
import { Tag, WhiteSpace } from 'antd-mobile';
let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').height;
import {BaseComponent} from  '../../base/BaseComponent'
const TAG_TYPE = {
    ALL:'all',
    RISKMANAGE:'riskManage',
    HOMERENT:'homeRent',
    CARPRICE:'carPrice',
    HOMEPRICE:'homePrice',
};

export default class SearchCompany extends BaseComponent{
    navigationBarProps() {

        return {
            title: '查企业',
            hiddenLeftItem: true
        }
    }
    constructor() {
        super();
        this.state={
            all:true,
            //个人风险概要
            companyRiskManage:false,
            //房屋租金评估
            homeRent:false,
            //车辆售价评估
            carPrice:false,
            //房屋售价评估
            homePrice:false,
        }
    }

    _render() {
        return (
            <View style={styles.container}>
                {this._renderHead()}
                {this._renderFoot()}
            </View>
        );
    };

    _renderHead() {
        return (
            <View style={{flex: 1, flexDirection:'column'}}>
                <View style={{width:winWidth, flexDirection:'row', marginTop:20}}>
                    <Text style={{color:'black', marginLeft:10}}>
                        请选择具体查询条件
                    </Text>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.ALL, '全部', this.state.all, require('../../nfcimg/all.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.RISKMANAGE, '企业风险概要', this.state.companyRiskManage, require('../../nfcimg/company.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMERENT, '房屋租金评估', this.state.homeRent, require('../../nfcimg/home.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.CARPRICE, '车辆售价评估', this.state.carPrice, require('../../nfcimg/car.png'))}
                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMEPRICE, '房屋售价评估', this.state.homePrice, require('../../nfcimg/home_estimate.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    </View>
                </View>

            </View>
        );
    }

    _renderFoot() {
        return(<View style={{width:winWidth, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:20}}>
            <TouchableOpacity onPress={()=>this._onPress()}>
                <View style={{width:250, height:44, justifyContent:'center', alignItems:'center', backgroundColor:'#1b54a5', borderRadius:4}}>
                    <Text style={{fontSize:16, color:'white'}}>
                        下一步
                    </Text>
                </View>
            </TouchableOpacity>
        </View>);
    }

    _renderTag(tagType, text, state, icon){
        return(<TouchableOpacity style={{width:105, height:105, backgroundColor:'#FFFFFF', flexDirection:'column', alignItems:'center'}}
                                 onPress={()=>{this._chageTag(tagType)}}>
            <View style={{flex:1}}>

            </View>
            <View style={{flex:2, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Image source={icon} style={{alignSelf:'center'}}/>
                <Text style={{color:'black'}}>
                    {text}
                </Text>
            </View>
            <View style={{flex:1, width:105, flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Image source={state?require('../../nfcimg/selected.png'):require('../../nfcimg/noselected.png')}/>
            </View>
        </TouchableOpacity>);
    }
    _chageTag(item){
        switch (item){
            case TAG_TYPE.ALL:
                this.setState({all:true,
                    companyRiskManage:false,
                    homeRent:false,
                    carPrice:false,
                    homePrice:false,});
                break;
            case TAG_TYPE.CARPRICE:
                this.setState({carPrice:!this.state.carPrice,all:false});
                break;
            case TAG_TYPE.HOMEPRICE:
                this.setState({homePrice:!this.state.homePrice,all:false});
                break;
            case TAG_TYPE.HOMERENT:
                this.setState({homeRent:!this.state.homeRent,all:false});
                break;
            case TAG_TYPE.RISKMANAGE:
                this.setState({companyRiskManage:!this.state.companyRiskManage,all:false});
                break;
        }
    }


    _onPress(){
        this.props.navigation.navigate('PersonalData'
            ,{
                type:1,
                all:this.state.all,
                //个人风险概要
                companyRiskManage:this.state.companyRiskManage,
                //房屋租金评估
                homeRent:this.state.homeRent,
                //车辆售价评估
                carPrice:this.state.carPrice,
                //房屋售价评估
                homePrice:this.state.homePrice,});
    }
}





const styles = StyleSheet.create({
    container:{
        flex:1,
        width:winWidth,
        height:winHeight,
        flexDirection:'column',
        backgroundColor:'#F0F0F2'
    }
});