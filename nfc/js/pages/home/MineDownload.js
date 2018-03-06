/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {BaseComponent} from  '../../base/BaseComponent'
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import {commonStyle} from '../../../js/util/commonStyle'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class MineDownload extends BaseComponent<{}> {

    //网络请求
    fetchData(data) {
        //这个是js的访问网络的方法

        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_DOWNLOAD, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //复制数据源
                        count:result.data.count,
                        list:result.data.list,
                        pageIndex:result.data.pageIndex,
                        pageSize:result.data.pageSize,
                    });



                }


            }
        );

    }

    componentDidMount() {
        //请求数据

        this.fetchData();

    }

    navigationBarProps() {

        return {
            title: '下载管理',
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


    constructor(){
        super();
        this.state={
            count:0,
            list:[],
            pageIndex:0,
            pageSize:0,
            showFoot:0 //0表示隐藏， 1表示加载完成， 2显示正在加载
        }
    }

    _render(){

        return(<View style={styles.container}>
            <FlatList style={{flex:1}}>
                data={this.state.list}
                renderItem={this._renderItemView}
                ListFooterComponent={this._renderFooter()}
                onEndReached={this._onEndReached()}
                onEndReachedThreshold={1}
                ItemSeparatorComponent={this._separator}
            </FlatList>
        </View>);

    }

    _renderItemView({item}) {
        return (
            <View>
                <Text >{item.reportType}</Text>
                <Text >{item.queryKey}</Text>
                <Text >description: {item.queryKey}</Text>
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

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.state.pageIndex!=1) && (this.state.pageIndex>=this.state.pageSize)){
            return;
        } else {
            this.state.pageIndex++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this.fetchData( );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
