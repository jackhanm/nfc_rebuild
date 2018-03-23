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
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { List, Modal } from 'antd-mobile';
import {BaseComponent} from  '../../base/BaseComponent'
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import RefreshListView, {RefreshState} from '../../compoent/RefreshListView'
import Cell from  '../../compoent/Cell'

import {commonStyle} from '../../../res/styles/commonStyle'
export default class MineRecored extends BaseComponent {
    state: {
        dataList: Array<any>,
        refreshState: number,
    }
    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
            page:1
        }
    }
    //网络请求data.js
    fetchData(isReload: boolean) {
        //这个是js的访问网络的方法
        let url =  NetAPI.MINE_REPORT_PERSION + '&pageIndex='+this.state.page+'&pageSize=10'
        NetUtils.get(NetAPI.serverUrl, url, "1.0", "", false, (result) => {

           console.log(result)
                if (result.code === 0) {


                    this.setState({
                        //复制数据源

                        dataList:  isReload ?result.data.list: [...this.state.dataList, ...result.data.list ],
                        refreshState: isReload ?RefreshState.Idle:this.state.dataList.length > 1000 ? RefreshState.NoMoreData : RefreshState.Idle,
                        page:this.state.page++,
                    });



                }else {
                    this.setState({refreshState: RefreshState.Failure})
                }


            }
        );

    }


    componentDidMount() {
        // super.componentDidMount();
        //请求数据
        this.onHeaderRefresh()
    }
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.fetchData(true);
        // // 模拟网络请求
        // setTimeout(() => {
        //     // 模拟网络加载失败的情况
        //     if (Math.random() < 0.2) {
        //         this.setState({refreshState: RefreshState.Failure})
        //         return
        //     }
        //
        //     //获取测试数据
        //     let dataList = this.getTestList(true)
        //
        //     this.setState({
        //         dataList: dataList,
        //         refreshState: RefreshState.Idle,
        //     })
        // }, 2000)
    }
    navigationBarProps() {

        return {
            title: '我的记录',
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

        // this.setState({refreshState: RefreshState.FooterRefreshing})
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
                     onPress={()=>{this.props.navigation.navigate('WebViewCommunication')}}/>
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
                    onFooterRefresh={this.onFooterRefresh}

                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
});
