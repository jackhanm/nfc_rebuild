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

let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').width;

export default class DownLoadRecord extends Component{
    constructor(){
        super();
        this.state={
            showFoot:0 //0表示隐藏， 1表示加载完成， 2显示正在加载
        }
    }

    render(){

        return(<View style={styles.container}>
            <FlatList style={{flex:1}}>
                data={this.state.dataArray}
                renderItem={this._renderItemView}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
                ItemSeparatorComponent={this._separator}
            </FlatList>
        </View>);

    }

    _separator(){
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }
}

const styles = StyleSheet.create({
    container:{
        width:winWidth,
        height:winHeight,
    }
});