/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Provider} from 'react-redux'
import React, { Component } from 'react';
import {
    Platform,
} from 'react-native';
import store from './js/pages/nfcApp/store/Store'

import Setup from './js/pages/Entry/setup'
export default class App extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
            <Setup/>
            </Provider>
        );
    }
}

