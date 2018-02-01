import React, { Component } from 'react';
import {
    AppRegistry,Dimensions,Platform,Button
} from 'react-native';
import { StackNavigator  } from 'react-navigation';

import login from '../Login/login'

import TabbarPage from './TabbarPage'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

const { width, height } = Dimensions.get('window');

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});
    const StackOptions = ({navigation}) => {
    console.log(navigation);
    let {state,goBack} = navigation;

    // 用来判断是否隐藏或显示header

    const visible= Platform.os === 'ios'?false:true;
    let header;
    if(Platform.OS === 'ios'){
        //ios相关操作
        console.log('ios')
    }else{
        console.log('Andorid')
        //android相关操作
        header=null
    }
    const headerStyle = {backgroundColor:'white'};
    const headerTitle ='ww';
    const headerTitleStyle = {fontSize:20,color:'white',fontWeight:'500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            title="返回"
            onPress={()=>{goBack()}}
        />
    );
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header}
};

const MyStackNavigation  = StackNavigator({



        Main: {
            screen: TabbarPage,
            navigationOptions:({ navigation }) => ({
                headerTitleStyle:{
                    alignSelf:'center',
                },

                header : null,
            }),
        },


    },
    {
        transitionConfig: TransitionConfiguration,
    }

    );
export default MyStackNavigation;