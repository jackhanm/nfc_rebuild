import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity,
    Animated,
    Easing,
    ScrollView,
    Image,
} from 'react-native';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import Toast, {DURATION} from 'react-native-easy-toast'
import { TabNavigator, NavigationActions} from "react-navigation";
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
let reastAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'TabBar'})
    ]
});
export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            isLoading: false,
        };
        this.showPass = this.showPass.bind(this);
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);

    }

    showPass() {
        this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
    }
    _onPress() {
        this.props.navigation.dispatch(reastAction);
        this.refs.toast.show('hello world!');
        if (this.state.isLoading) return;

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

            <ScrollView>
                <Image style={styles.picture} source={require('../../images/wallpaper.png')}>

                </Image>
                <View style={styles.container1}>
                    <Image source={require('../../images/logo.png')} style={styles.image1} />
                    <Text style={styles.text1}>nfc</Text>
                </View>
                <KeyboardAvoidingView behavior='padding'
                                      style={styles.container2}>
                    <UserInput source={require('../../images/username.png')}
                               placeholder='Username'
                               autoCapitalize={'none'}
                               returnKeyType={'done'}
                               autoCorrect={false} />
                    <UserInput source={require('../../images/password.png')}
                               secureTextEntry={this.state.showPass}
                               placeholder='Password'
                               returnKeyType={'done'}
                               autoCapitalize={'none'}
                               autoCorrect={false} />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}
                    >
                        <Image source={require('../../images/eye_black.png')} style={styles.iconEye} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <View style={styles.container3}>
                    <Text style={styles.text3}>Create Account</Text>
                    <Text style={styles.text3}>Forgot Password?</Text>
                </View>
                <View style={styles.container4}>
                    <Animated.View style={{width: changeWidth}}>
                        <TouchableOpacity style={styles.button4}
                                          onPress={this._onPress}
                                          activeOpacity={1} >
                            {this.state.isLoading ?
                                <Image source={require('../../images/loading.gif')} style={styles.image4} />
                                :
                                <Text style={styles.text4}>LOGIN</Text>
                            }
                        </TouchableOpacity>
                        <Animated.View style={[ styles.circle4, {transform: [{scale: changeScale}]} ]} />

                    </Animated.View>

                </View>
                <Toast ref="toast"/>
            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top:100,
        left:150
    },
    image1: {
        width: 80,
        height: 80,
    },
    text1: {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top:250,
        margin:10,
    },
    btnEye: {
        position: 'absolute',
        top: 50,
        right: 28,

    },
    iconEye: {
        marginTop:15,
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
    container3: {
        flex: 1,

        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position:'absolute',
        top:450,
    },
    text3: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    container4: {
        top:400,
        position:'absolute',
        alignSelf: 'center',
        justifyContent: 'flex-start',

    },
    button4: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle4: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    text4: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image4: {
        width: 24,
        height: 24,
    },
});