import React, { Component } from 'react';
import {
    Platform,Animated,View
} from 'react-native';
import GlobalStyle from '../../../res/styles/GlobalStyles'
import GetSetStorge from '../publicState/GetSetStorg';
// import NetUtils from '../Network/NetUtils'
import guideView from './guideView'
import ThemeDao from '../publicState/ThemeDao'
import login from '../Login/login'
import MyStackNavigation from "./MyStackNavigation";
import { NavigationActions  } from 'react-navigation';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

let reastAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'login'})
    ]
});

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1),
            urlstr: require('../../img/Mine/icon_userreview_defaultavatar.png'),
        }

    }
    componentDidMount() {

        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        });
        // NetUtils.get(NetAPI.serverUrl2, NetAPI.KlAPPlanuchimage_v_1_0+"/os/1/prod/2/res/2","1.0","",false,(result) => {
        //         console.log(result)
        //
        //         this.setState({
        //             //复制数据源
        //             urlstr:{uri:result.data.webUrl}
        //         });
        //
        //
        //     }
        // );
        Animated.timing(
            this.state.bounceValue, { toValue: 1.0, duration: 1000 }
        ).start();
        this.timer = setTimeout(() => {
            GetSetStorge.getStorgeAsync('isFrist').then((result) => {
                if (result == null || result == '') {
                    //第一次启动
                    console.log(this.theme);
                    this.props.navigation.navigate('guideView',{user:this.theme});
                    GetSetStorge.setStorgeAsync('isFrist', 'true');
                } else {
                    //第二次启动s
                    console.log('22');
                    console.log('rheme'+this.theme);
                    console.log(this.theme);

                    this.props.navigation.dispatch(reastAction);

                }
            }).catch((error) => {
                console.log('==========================');
                console.log('系统异常' + error);
                console.log('==========================');
            });
        }, 1000);

    }

    componentWillUpdate = () => {
        // clearTimeout(this.timer);
    }
    static navigationOptions = {
        header: 'float',
    };
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Animated.Image
                    style={{
                        width: GlobalStyle.window_height,
                        height: GlobalStyle.window_height,
                        transform: [{ scale: this.state.bounceValue }]
                    }}
                    source={this.state.urlstr}
                />
            </View>


        );
    }
}

