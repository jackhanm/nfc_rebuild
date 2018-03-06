import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    WebView,
} from 'react-native';
import {commonStyle} from '../../../js/util/commonStyle'
import {BaseComponent} from  '../../base/BaseComponent'
export default class WebViewCommunication extends BaseComponent {

    constructor(props) {
        super(props);
    }
    navigationBarProps() {

        return {
            title: '报告详情页',
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
                <WebView
                    ref={(webview) => this.webview = webview}

                    source={{uri: 'http://172.16.252.90:9091/company.html'}}

                    onMessage={this._onMessage}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._postMessage}
                    style={[{backgroundColor: '#38acff',  padding: 20, }]}>
                    <Text>从RN传递数据到HTML</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //接收HTML发出的数据
    _onMessage = (e) => {
        Alert.alert(e.nativeEvent.data);
    }

    //向HTML发送数据
    _postMessage = () => {
        this.webview.postMessage('刘鹏辉');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff0000"
    },
});