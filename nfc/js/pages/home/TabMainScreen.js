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
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }


    _onPress() {
        this.setState({search:1})
        this.setState({ isLoading: true });
        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();

        setTimeout(() => {
            this._onGrow();
        }, 2000);

        setTimeout(() => {
            // Actions.secondScreen();
            this.setState({ isLoading: false });
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);
    }

    _onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });
        return (
            <View style={styles.container}>

                <Image style={styles.picture} source={require('../../images/wallpaper.png')}></Image>

                <Madoka
                    style={[styles.inputStyle, {position:'absolute', top:150}]}
                    label={'身份证'}
                    // this is used as active and passive border color
                    borderColor={'#aee2c9'}
                    onChangeText={(text) => this.setState({idCard:text})}
                    labelStyle={{ color: '#008445' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <Madoka
                    style={[styles.inputStyle, {position:'absolute', top:300}]}
                    label={'车牌号'}
                    // this is used as active and passive border color
                    borderColor={'#aee2c9'}
                    onChangeText={(text) => this.setState({carCard:text})}
                    labelStyle={{ color: '#008445' }}
                    inputStyle={{ color: '#f4a197' }}
                />

                <View style={styles.container4}>
                    <Animated.View style={{width: changeWidth}}>
                        <TouchableOpacity style={styles.button4}
                                          onPress={this._onPress}
                                          activeOpacity={1} >
                            {this.state.search === 0? <Text style={styles.text4}>查询</Text>
                                : <Image source={require('../../images/loading.gif')} style={styles.image4} />}
                        </TouchableOpacity>
                        <Animated.View style={[ styles.circle4, {transform: [{scale: changeScale}]} ]} />

                    </Animated.View>

                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
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
