import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    Image,
    Easing,
} from 'react-native';

let windowWidth = Dimensions.get('window').width;

const DEVICE_WIDTH = Dimensions.get('window').width;

const MARGIN = 40;

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import { Madoka } from 'react-native-textinput-effects';

export default class App extends Component<{}> {

    constructor(){
        super();
        this.state={
            idCard:'',
            carCard:'',
            search:0,
        }
    }




    render() {
        return (
            <View style={styles.container}>

                <Madoka
                    style={[styles.inputStyle]}
                    label={'身份证'}
                    // this is used as active and passive border color
                    borderColor={'#F035E0'}
                    onChangeText={(text) => this.setState({idCard:text})}
                    labelStyle={{ color: '#F035E0' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <Madoka
                    style={[styles.inputStyle]}
                    label={'车牌号'}
                    // this is used as active and passive border color
                    borderColor={'#F035E0'}
                    onChangeText={(text) => this.setState({carCard:text})}
                    labelStyle={{ color: '#F035E0' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <TouchableOpacity style={styles.button4}>
                    <Text>
                        查询
                    </Text>

                </TouchableOpacity>
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
    inputStyle:{
        width:windowWidth,
    },

    button4: {
        width:windowWidth - 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
    },

    container4: {
        top:400,
        position:'absolute',
        alignSelf: 'center',
        justifyContent: 'flex-start',

    },

    image4: {
        width: 24,
        height: 24,
    },

});
