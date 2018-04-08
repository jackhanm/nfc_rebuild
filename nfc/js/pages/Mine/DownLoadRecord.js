import React, { Component } from 'react';
import {commonStyle} from '../../styles/commonStyle'
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

    _renderItemView({item}) {
        return (
            <View>
                <Text style={styles.title}>name: {item.value.name}</Text>
                <Text style={styles.content}>stars: {item.value.stargazers_count}</Text>
                <Text style={styles.content}>description: {item.value.description}</Text>
            </View>
        );
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
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