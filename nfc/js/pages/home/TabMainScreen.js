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
    ScrollView,

} from 'react-native';

let windowWidth = Dimensions.get('window').width;
import TabNavigator from 'react-native-tab-navigator';
const DEVICE_WIDTH = Dimensions.get('window').width;

import ModalDropdown from 'react-native-modal-dropdown';
import {BaseComponent} from  '../../base/BaseComponent'
import { Kaede } from '../../compoent/exportInput';
import { Kohana } from '../../compoent/exportInput';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {SegmentedControl} from 'antd-mobile'
import {commonStyle} from '../../../res/styles/commonStyle'
import GlobalStyles from '../../../res/styles/GlobalStyles'
const MARGIN = 40;


import { Madoka } from '../../compoent/exportInput';
let tabBarHeight = 0;
export default class App extends BaseComponent {
    navigationBarProps() {

        return {
            title: 'home',
            hiddenLeftItem: true
        }
    }



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

    _render() {
        return (


            <KeyboardAwareScrollView style={styles.container} >
                <View style={styles.navBarStyle}>


                    </View>

                {/*<Madoka*/}
                    {/*style={[styles.inputStyle]}*/}
                    {/*label={'车牌号'}*/}
                    {/*// this is used as active and passive border color*/}
                    {/*borderColor={'black'}*/}
                    {/*onChangeText={(text) => this.setState({carCard:text})}*/}
                    {/*labelStyle={{ color: 'black' }}*/}
                    {/*inputStyle={{ color: '#f4a197' }}*/}
                {/*/>*/}

                <TabNavigator
                    tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
                    sceneStyle={{ paddingBottom: tabBarHeight }}
                />

                <Kaede
                    style={[styles.inputStyle]}
                    label={'车牌号'}
                />
                <Kohana
                    style={{ backgroundColor: '#f9f5ed' }}
                    label={'手机号'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{ color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />

                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />
                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />

                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />

                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />

                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />

                <Kohana
                    style={{ backgroundColor: '#f9f5ed' ,marginTop:10}}
                    label={'密码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'bus'}
                    iconColor={'#f4d29a'}
                    iconSize={15}
                    labelStyle={{  color: '#91627b' ,fontSize:13}}
                    inputStyle={{ color: '#91627b' }}
                    useNativeDriver
                />




                <TouchableOpacity style={styles.button4} onPress={this._onPress()}>
                    <Text style={{fontSize:16, width:windowWidth - 100, alignSelf: 'center',textAlign:'center'}}>
                        查    询
                    </Text>

                </TouchableOpacity>
            </KeyboardAwareScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {

     margin:10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#DC9D93',
        marginBottom: 5,
    },
    inputStyle:{
        width:windowWidth - 10,
        marginBottom:15,
    },

    button4: {
        marginTop:20,
        width:windowWidth - 40,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: 50,
        borderRadius: 25,
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
    segContainer: {
        marginTop: GlobalStyles.navStatusBarHeight,
        height: GlobalStyles.navContentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle:{
      width:80,
      height:80,
        marginBottom:10
    },
        navBarStyle: {
        height: GlobalStyles.navHeight,
        backgroundColor: '#151C28',
    },

});
