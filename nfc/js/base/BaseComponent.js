import React, { Component } from 'react';
import {
    Platform,Dimensions,StyleSheet,View,Keyboard,NetInfo
} from 'react-native';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
import { List, Toast } from 'antd-mobile';
import GlobalStyles from '../styles/GlobalStyles'
import NavigationBar from '../compoent/NavigationBar'
 class BaseComponent extends Component {

    constructor(props){
        super(props);
        this.navigationBarProps = this.navigationBarProps.bind(this)
        this._render = this._render.bind(this)
        this.onLeftPress = this.onLeftPress.bind(this)
        this.onRightPress = this.onRightPress.bind(this)
        this.state = {
            isConnected: null,
            connectionInfo:null,
        };
        // this.state={
        //     theme:this.props.theme,
        // }
        // const  isiphoneX = Platform.OS === 'ios'? height===812 &&width ===375 : false;
        // global.G_IsiPhoneX = isiphoneX;
        // global.G_marginTop=isiphoneX?88:64;

    }

    navigationBarProps() {
        return null
    }

    superFunc(data) {
        alert(`在子类中调用了父类的函数，${data}`)
    }

    onLeftPress() {

        this.props.navigation.goBack()
    }

    onRightPress() {
        return null
    }


    renderNavigationBar() {
        let navigationBarProps = this.navigationBarProps()
        Object.assign(navigationBarProps, this.props)
        return (
            <NavigationBar
                navigationBarProps={navigationBarProps}
                onLeftPress={this.onLeftPress}
                onRightPress={this.onRightPress}
            />
        )
    }

    _render() {
        return null
    }


    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.renderNavigationBar()}
                {this._render()}
            </View>
        )
    }

     componentDidMount() {
         Keyboard.dismiss();
         NetInfo.isConnected.addEventListener(
             'change',
             this._handleConnectivityChange
         );
         //检测网络是否连接
         NetInfo.isConnected.fetch().done(
             (isConnected) => { this.setState({isConnected}); }
         );
         //检测网络连接信息
         NetInfo.fetch().done(
             (connectionInfo) => { this.setState({connectionInfo}); }
         );
     }
     componentWillUnmount() {
         NetInfo.isConnected.removeEventListener(
             'change',
             this._handleConnectivityChange
         );
     }
     _handleConnectivityChange(isConnected) {

         isConnected ? 'online' : Toast.offline('Network connection failed !!!', 1) ;
     }


    // //新建通知的监听
    // componentDidMount() {
    //     DeviceEventEmitter.addListener('pushCallRN',(msg)=>{
    //         if(msg.action === 'scan'){
    //             this.props.navigation.navigate('guideView')
    //         }
    //     });
    // }
    //
    // //卸载前移除通知
    // componentWillUnmount() {
    //     if(this.baseListener){
    //         this.baseListener.remove();
    //     }
    // }
    //
    // //接收通知
    // changeThemeAction(action,params){
    //         this.onThemeChange(params);
    //
    // }
    //
    //
    // //更新通知
    // onThemeChange(theme){
    //     if(!theme)return;
    //     this.setState({
    //         theme:theme
    //     })
    // }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.white
    }
})

export {BaseComponent}