import {
    StackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';

import MyStackNavigation from "./MyStackNavigation";
import Welcome from "./Welcome"
import guideView from "./guideView";

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'



const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});
const  SimpleApp = StackNavigator(
    {
        Welcome: { screen: Welcome },
        guideView:{screen:guideView},
        TabBar: { screen: MyStackNavigation },


    },
    {
        mode: 'card',
        headerMode:'none',
    },
     {
         transitionConfig: TransitionConfiguration,
     }


 );

export default SimpleApp;