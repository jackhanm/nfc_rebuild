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


export default class SearchPersonal extends Component {
    constructor() {
        super();
    }

    render() {
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

                <View style={{width:winWidth, flexDirection:'row', marginTop:20}}>

                </View>

            </View>
        );
    }

    _renderFoot() {
        return(<View style={{flex:1, flexDirection:'column'}}>

        </View>);
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