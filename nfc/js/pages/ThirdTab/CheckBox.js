import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import CheckBox from '../../compoent/CheckBox'

export default class checkboxDemo extends Component {
    state = {
        checked: false
    }
    handleOnChange(val) {
        this.setState({ checked: val })
    }
    render() {

        return (
            <View style={styles.container}>
                <CheckBox
                    label='身份认证'
                    labelStyle={styles.labelStyle}
                    iconSize={28}
                    iconName='matCircleEdge'
                    checked={this.state.checked}
                    checkedColor='#008080'
                    uncheckedColor='#8b0000'
                    onChange={this.handleOnChange.bind(this)}
                />
                <CheckBox
                    label='个人信用报告'
                    labelStyle={styles.labelStyle}
                    iconSize={28}
                    iconName='matCircleEdge'
                    checked={this.state.checked}
                    checkedColor='#008080'
                    uncheckedColor='#8b0000'
                    onChange={this.handleOnChange.bind(this)}
                />
                <CheckBox
                    label='个人风险概要信息'
                    labelStyle={styles.labelStyle}
                    iconSize={28}
                    iconName='matCircleEdge'
                    checked={this.state.checked}
                    checkedColor='#008080'
                    uncheckedColor='#8b0000'
                    onChange={this.handleOnChange.bind(this)}
                />
                <CheckBox
                    label='卡交易信息含卡核查'
                    labelStyle={styles.labelStyle}
                    iconSize={28}
                    iconName='matCircleEdge'
                    checked={this.state.checked}
                    checkedColor='#008080'
                    uncheckedColor='#8b0000'
                    onChange={this.handleOnChange.bind(this)}
                />
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
    labelStyle: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f4f4f'
    }
});

AppRegistry.registerComponent('checkboxDemo', () => checkboxDemo);