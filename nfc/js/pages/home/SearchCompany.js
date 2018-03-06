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
                    <Text style={{color:'black', fontWeight:'900', marginLeft:10}}>
                        请选择具体查询条件
                    </Text>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.ALL, '全部', this.state.all)}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>

                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.RISKMANAGE, '企业风险概要', this.state.companyRiskManage)}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMERENT, '房屋租金评估', this.state.homeRent)}
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.CARPRICE, '车辆售价评估', this.state.carPrice)}
                    </View>
                </View>

                <View style={{width:winWidth, flexDirection:'row', marginTop:20, alignItems:'center'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        {this._renderTag(TAG_TYPE.HOMEPRICE, '房屋售价评估', this.state.homePrice)}
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
        return(<View style={{width:winWidth, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:50}}>
            <TouchableOpacity onPress={()=>this._onPress()}>
                <View style={{width:winWidth - 100, height:50, justifyContent:'center', alignItems:'center', backgroundColor:'#7861FC', marginLeft:50, marginRight:50}}>
                    <Text style={{color:'white'}}>
                        下一步
                    </Text>
                </View>
            </TouchableOpacity>
        </View>);
    }

    _renderTag(tagType, text, state){
        return(<TouchableOpacity onPress={()=>{this._chageTag(tagType)}}>
            <View style={{width:110, height:50, backgroundColor:state? '#FD9720' : '#FFFFFF', justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'black'}}>
                    {text}
                </Text>
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