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
import {BaseComponent} from  '../../base/BaseComponent'
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import {commonStyle} from '../../../js/util/commonStyle'
export default class MineAbout extends BaseComponent<{}> {
    //网络请求
    fetchData(data) {
        //这个是js的访问网络的方法

        NetUtils.get(NetAPI.serverUrl, NetAPI.MINE_INFO, "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({
                        //复制数据源
                        avatar: result.data.avatar,
                        name: result.data.name,
                        organizationName: result.data.organizationName,
                        phone: result.data.phone,
                        username: result.data.username,

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
            title: '关于我们',
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
    _render() {
        return (


            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
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
