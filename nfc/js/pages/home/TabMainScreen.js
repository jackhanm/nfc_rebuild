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
    ScrollView
} from 'react-native';

let windowWidth = Dimensions.get('window').width;

const DEVICE_WIDTH = Dimensions.get('window').width;

import ModalDropdown from 'react-native-modal-dropdown';

import { Kaede } from 'react-native-textinput-effects';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            searchType:'身份证',
        }
    }

    /**
     * 点击按钮进入请求
     * @private
     */
    _onPress(){

    }




    render() {
        return (
            <KeyboardAwareScrollView>
            <View style={styles.container}>

                <Madoka
                    style={[styles.inputStyle]}
                    label={'身份证'}
                    // this is used as active and passive border color
                    borderColor={'black'}
                    onChangeText={(text) => this.setState({idCard:text})}
                    labelStyle={{ color: 'black' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <Madoka
                    style={[styles.inputStyle]}
                    label={'车牌号'}
                    // this is used as active and passive border color
                    borderColor={'black'}
                    onChangeText={(text) => this.setState({carCard:text})}
                    labelStyle={{ color: 'black' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <Kaede
                    style={[styles.inputStyle]}
                    label={'身份证'}
                    labelStyle={{backgroundColor:'black'}}
                />

                <Kaede
                    style={[styles.inputStyle]}
                    label={'车牌号'}
                />


                <TouchableOpacity style={styles.button4} onPress={this._onPress()}>
                    <Text style={{fontSize:16}}>
                        查    询
                    </Text>

                </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4474BB',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        width:windowWidth - 10,
        marginBottom:15,
    },

    button4: {
        width:windowWidth - 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: 50,
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

    selecttype:{
        width:80,
        height:40,
        backgroundColor:'black'
    },

    imgStyle:{
      width:80,
      height:80,
        marginBottom:10
    },

});
