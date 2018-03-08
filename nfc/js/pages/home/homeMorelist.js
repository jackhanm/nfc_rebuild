/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View, Text, TouchableOpacity, Image, PixelRatio,Dimensions
} from 'react-native';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
import TabNavigator from 'react-native-tab-navigator';
import { List, Modal } from 'antd-mobile';
import {BaseComponent} from  '../../base/BaseComponent'
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import RefreshListView, {RefreshState} from '../../compoent/RefreshListView'

import testData from './data'
import {commonStyle} from '../../../js/util/commonStyle'
export default class homeMorelist extends BaseComponent<{}> {
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
    fetchData(data) {
        //这个是js的访问网络的方法

        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_REPORT, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //复制数据源


                    });



                }


            }
        );

    }

    componentDidMount() {
        //请求数据

        this.fetchData();
        this.onHeaderRefresh()
    }
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.2) {
                this.setState({refreshState: RefreshState.Failure})
                return
            }

            //获取测试数据
            let dataList = this.getTestList(true)

            this.setState({
                dataList: dataList,
                refreshState: RefreshState.Idle,
            })
        }, 2000)
    }
    navigationBarProps() {

        return {
            title: '查询记录',
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

        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.2) {
                this.setState({refreshState: RefreshState.Failure})
                return
            }

            //获取测试数据
            let dataList = this.getTestList(false)

            this.setState({
                dataList: dataList,
                refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        }, 2000)
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
        return (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('WebViewCommunication')}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={styles.item}>
                        <View style={{flex:3, flexDirection:'row',
                            alignItems:'center',}}>
                            <Text style={{color:'#4352B2', marginRight:5}}>
                                个人
                            </Text>

                            <Text style={{color:'black', marginRight:5}}>
                                韩梅梅
                            </Text>
                        </View>
                        <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <Text>
                                2018/02/23
                            </Text>
                            <Image style={{width:10, height:10}} source={require('../../nfcimg/backicon.png')}/>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#F0F0F2', height:0.5, width:windowWidth}}/>
                </View>
            </TouchableOpacity>
        )
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
    },
    item:{
        flex:1,
        width:windowWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        height:50
    }
});
