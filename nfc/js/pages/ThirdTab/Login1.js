import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
} from 'react-native';

import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../images/首页/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class loginScreen2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            fontLoaded: true,
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
        };

        this.selectCategory = this.selectCategory.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('../../images/fonts/Georgia.ttf'),
            'regular': require('../../images/fonts/Montserrat-Regular.ttf'),
            'light': require('../../images/fonts/Montserrat-Light.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    login() {
        const {
            email,
            password,
        } = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            });
        }, 1500);
    }

    signUp() {
        const {
            email,
            password,
            passwordConfirmation,
        } = this.state;
        this.setState({ isLoading: true });
        // Simulate an API call
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                isLoading: false,
                isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
                isConfirmationValid: password == passwordConfirmation || this.confirmationInput.shake(),
            });
        }, 1500);
    }

    render() {
        const { email, password, email_valid, showLoading } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    { this.state.fontLoaded ?
                        <View style={styles.loginView}>
                            <View style={styles.loginTitle}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.travelText}>TRAVEL</Text>
                                    <Text style={styles.plusText}>+</Text>
                                </View>
                                <View style={{marginTop: -10}}>
                                    <Text style={styles.travelText}>LEISURE</Text>
                                </View>
                            </View>
                            <View style={styles.loginInput}>
                                <View style={{marginVertical: 10}}>
                                    <Input
                                        width={230}
                                        icon={
                                            <Icon
                                                name='user-o'
                                                color='rgba(171, 189, 219, 1)'
                                                size={25}
                                            />
                                        }
                                        onChangeText={email => this.setState({email})}
                                        value={email}
                                        inputStyle={{marginLeft: 10, color: 'white'}}
                                        keyboardAppearance="light"
                                        placeholder="Email"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        ref={ input => this.emailInput = input }
                                        onSubmitEditing={() => {
                                            this.setState({email_valid: this.validateEmail(email)});
                                            this.passwordInput.focus();
                                        }}
                                        blurOnSubmit={false}
                                        placeholderTextColor="white"
                                        displayError={!email_valid}
                                        errorStyle={{textAlign: 'center', fontSize: 12}}
                                        errorMessage="Please enter a valid email address"
                                    />
                                </View>
                                <View style={{marginVertical: 10}}>
                                    <Input
                                        width={230}
                                        icon={
                                            <Icon
                                                name='lock'
                                                color='rgba(171, 189, 219, 1)'
                                                size={25}
                                            />
                                        }
                                        onChangeText={(password) => this.setState({password})}
                                        value={password}
                                        inputStyle={{marginLeft: 10, color: 'white'}}
                                        secureTextEntry={true}
                                        keyboardAppearance="light"
                                        placeholder="Password"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType="done"
                                        ref={ input => this.passwordInput = input}
                                        blurOnSubmit={true}
                                        placeholderTextColor="white"
                                        displayError={false}
                                        errorStyle={{textAlign: 'center', fontSize: 12}}
                                        errorMessage="The email and password you entered did not match out records. Please try again!"
                                    />
                                </View>
                            </View>
                            <View style={styles.loginButton}>
                                <Button
                                    text ='LOG IN'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={this.submitLoginCredentials.bind(this)}
                                    loading={showLoading}
                                    loadingProps={{size: 'small', color: 'white'}}
                                    disabled={ !email_valid && password.length < 8}
                                    buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
                                    containerStyle={{marginVertical: 10}}
                                    textStyle={{fontWeight: 'bold', color: 'white'}}
                                />
                            </View>
                            <View style={styles.footerView}>
                                <Text style={{color: 'grey'}}>
                                    New here?
                                </Text>
                                <Button
                                    text="Create an Account"
                                    clear
                                    activeOpacity={0.5}
                                    textStyle={{color: 'white', fontSize: 15}}
                                    containerStyle={{marginTop: -10}}
                                    onPress={() => console.log('Account created')}
                                />
                            </View>
                        </View> :
                        <Text>Loading...</Text>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems:'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'Montserrat-Regular',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Montserrat-Regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
