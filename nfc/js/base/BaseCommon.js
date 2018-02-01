import React, { Component } from 'react';
import {
    DeviceEventEmitter,Platform,Dimensions
} from 'react-native';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

export default class BaseComponent extends Component {

    constructor(props){
        super(props);
        // this.state={
        //     theme:this.props.theme,
        // }
        const  isiphoneX = Platform.OS == 'ios'? height==812 &&width ==375 : false;
        global.G_IsiPhoneX = isiphoneX;
        global.G_marginTop=isiphoneX?88:64;
        this.state = {
            selectedTab:'12-12',
            logingState: 0,

        }
    }

    //新建通知的监听
    componentDidMount() {
        DeviceEventEmitter.addListener('pushCallRN',(msg)=>{
            if(msg.action === 'scan'){
                this.props.navigation.navigate('guideView')
            }
        });
    }

    //卸载前移除通知
    componentWillUnmount() {
        if(this.baseListener){
            this.baseListener.remove();
        }
    }

    //接收通知
    changeThemeAction(action,params){
            this.onThemeChange(params);

    }


    //更新通知
    onThemeChange(theme){
        if(!theme)return;
        this.setState({
            theme:theme
        })
    }

}