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

import { Kaede } from '../../compoent/exportInput';
import { Kohana } from '../../compoent/exportInput';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const MARGIN = 40;


import { Madoka } from '../../compoent/exportInput';

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

            <View style={styles.container}>

                {/*<Kohana*/}
                    {/*style={{ backgroundColor: '#f9f5ed' }}*/}
                    {/*label={'身份证'}*/}
                    {/*iconClass={MaterialsIcon}*/}
                    {/*iconName={'directions-bus'}*/}
                    {/*iconColor={'#f4d29a'}*/}
                    {/*labelStyle={{ color: '#91627b' }}*/}
                    {/*inputStyle={{ color: '#91627b' }}*/}
                    {/*useNativeDriver*/}
                {/*/>*/}

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

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFFFE',
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
