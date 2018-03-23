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
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ScreenUtil from '../../util/ScreenUtil'
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

    componentDidMount(){
        super.componentDidMount();
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
                <View style={{width:winWidth, flexDirection:'row', marginTop:ScreenUtil.scaleSize(40)}}>
                    <Text style={{color:'black', marginLeft:ScreenUtil.scaleSize(20)}}>
                        请选择具体查询条件
                    </Text>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:ScreenUtil.scaleSize(40), alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.ALL, '全部', this.state.all, require('../../imgResouce/all.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.RISKMANAGE, '企业风险概要', this.state.companyRiskManage, require('../../imgResouce/company.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMERENT, '房屋租金评估', this.state.homeRent, require('../../imgResouce/home.png'))}
                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:ScreenUtil.scaleSize(40), alignItems:'center'}}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.CARPRICE, '车辆售价评估', this.state.carPrice, require('../../imgResouce/car.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMEPRICE, '房屋售价评估', this.state.homePrice, require('../../imgResouce/home_estimate.png'))}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:ScreenUtil.scaleSize(40), alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

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
        return(<View style={{width:winWidth, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:ScreenUtil.scaleSize(80)}}>
            <TouchableOpacity onPress={()=>this._onPress()}>
                <View style={{width:ScreenUtil.scaleSize(500), height:ScreenUtil.scaleSize(88), justifyContent:'center'
                    , alignItems:'center', backgroundColor:GlobalStyles.themeColor, borderRadius:ScreenUtil.scaleSize(8)}}>
                    <Text style={{fontSize:16, color:'white'}}>
                        下一步
                    </Text>
                </View>
            </TouchableOpacity>
        </View>);
    }

    _renderTag(tagType, text, state, icon){
        return(<TouchableOpacity style={{width:ScreenUtil.scaleSize(210), height:ScreenUtil.scaleSize(210)
            , backgroundColor:'#FFFFFF', flexDirection:'column', alignItems:'center'}}
                                 onPress={()=>{this._chageTag(tagType)}}>
            <View style={{flex:1}}>

            </View>
            <View style={{flex:2, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Image source={icon}/>
                <Text style={{color:'black', marginTop:ScreenUtil.scaleSize(10)}}>
                    {text}
                </Text>
            </View>
            <View style={{flex:1, width:ScreenUtil.scaleSize(210), flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Image source={state?require('../../imgResouce/selected.png'):require('../../imgResouce/noselected.png')}/>
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