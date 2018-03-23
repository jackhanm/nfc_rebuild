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
    NativeAppEventEmitter,NativeEventEmitter,NativeModules
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {BaseComponent} from  '../../base/BaseComponent'
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import RefreshListView, {RefreshState} from '../../compoent/RefreshListView'
import Cell from  '../../compoent/Cell'
import testData from './data'
import {commonStyle} from '../../../res/styles/commonStyle'

//在JavaScript中调用Object-C定义的方法，需要先导入NativeModules,再使用RNCalliOSFuncation
var RNCalliOSAction = NativeModules.RNCalliOSAction;

export default class MineDownload extends BaseComponent<{}> {

    getlocallist(){

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
    state: {
        dataList: Array<any>,
        refreshState: number,
    }
    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
        }
    }
    //网络请求data.js
    fetchData(isReload: boolean) {
        //这个是js的访问网络的方法
        RNCalliOSAction.calliOSActionWithCallBack((array)=>{
            console.log(array);
            this.setState({
                dataList:  isReload ?array: [...this.state.dataList, ...result.data.list ],
                refreshState: isReload ?RefreshState.Idle:this.state.dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
            })

        });


    }

    componentDidMount() {
        super.componentDidMount();
        //请求数据
        this.onHeaderRefresh()
    }
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.fetchData(true);

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
    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        this.fetchData(false);
        // 模拟网络请求



    }

    // 获取测试数据
    getTestList(isReload: boolean): Array<Object> {
        let newList = testData.map((data) => {
            return {
                imageUrl: data.squareimgurl,
                title: data.mname,
                subtitle: `[${data.range}]${data.title}`,
                price: data.price,
            }
        })
        return isReload ? newList : [...this.state.dataList, ...newList]
    }

    keyExtractor = (item: any, index: number) => {
        return index
    }

    renderCell = (info: Object) => {
        return <Cell info={info.item}
                     onPress={()=>{
                         RNCalliOSAction.calliOStopdfView(info.item.path);
                         console.log(info.item.path)}}
                     delete={()=>{
                         RNCalliOSAction.deletepdf(info.item.path);
                     }}/>

    }

    _render() {
        console.log('render scene')
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，服务器小哥开小差 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
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
