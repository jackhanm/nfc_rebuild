/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Provider} from 'react-redux'
import React, { Component } from 'react';
import GetSetStorge from './js/pages/publicState/GetSetStorg';
import {
    Platform,
} from 'react-native';
import store from './js/pages/nfcApp/store/Store'

// import Setup from './js/pages/Entry/setup'
import configAppNavigator from './js/pages/Entry/setup'
export default class App extends Component<{}> {
    state = {
        checkedLogin: false
    };
    componentWillMount() {

        this._getloginState();
    }
    _getloginState(){

            GetSetStorge.getStorgeAsync('isLogin').then((result) =>{
                if (result == null || result == ''){
                    this.setState({
                        checkedLogin: true,
                        isLoggedIn: false
                    })
                }else {
                    this.setState({
                        checkedLogin: true,
                        isLoggedIn: true
                    })
                }
            })

    }
    render() {
        const { checkedLogin, isLoggedIn } = this.state;
        if (!checkedLogin) {
            return null;
        }
        const AppNavigator = configAppNavigator(isLoggedIn);
        return (
            <Provider store={store}>
            <AppNavigator/>
            </Provider>
        );
    }
}

