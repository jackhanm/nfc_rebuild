/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
} from 'react-native';


import Setup from './js/pages/Entry/setup'
export default class App extends Component<{}> {
    render() {
        return (
            <Setup/>
        );
    }
}

