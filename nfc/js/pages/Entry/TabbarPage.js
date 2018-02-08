import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    StyleSheet,
    View,
    Image,SafeAreaView,Platform,Dimensions
} from 'react-native';

import { NavigationActions} from "react-navigation";

import THemefactory from '../../../res/styles/ThemeFactory'
import GlobalStyle from '../../../res/styles/GlobalStyles'
import SecondScreen from "../secondTab/SecondScreen";
import FourthScreen from '../Mine/MInePage'
import TabMainScreen from '../home/TabMainScreen'
import ThemeDao from '../publicState/ThemeDao'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
import FillInInfo from '../Mine/FillInInfo'
//在JavaScript中调用Object-C定义的方法，需要先导入NativeModules,再使用RNCalliOSFuncation





let theme1
export default class TabbarPage extends Component{


    componentDidMount() {
        const {navigator} = this.props;


    }

    componentWillUnmount(){

    }




    constructor(props){


        super(props);

        const  isiphoneX = Platform.OS == 'ios'? height==812 &&width ==375 : false;
        global.G_IsiPhoneX = isiphoneX;
        global.G_marginTop=isiphoneX?88:64;
        this.state = {
            selectedTab:'1-1',
            logingState: 0,

        }
    }

    render(){
        return(

            <View style={styles.container}>
            <TabNavigator
                tabBarStyle={[
                    {backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e5e5e5',overflow:'visible'},
                    G_IsiPhoneX?{paddingBottom:30,height:49+34}:{}
                ]}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === '1-1'}
                    title={'1-1'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}
                //    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../../res/images/home_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}
                    onPress={() => this.setState({ selectedTab: '1-1' })}>
                    <TabMainScreen  {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '理财'}
                    title={'理财'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}
                    onPress={() => this.setState({ selectedTab: '理财' })}>
                    <SecondScreen  {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '我的'}
                    title={'我的'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}
                    onPress={() => this.setState({ selectedTab: '我的' })}>
                    <FillInInfo {...this.props}/>
                </TabNavigator.Item>

            </TabNavigator>

            </View>
           );
    }



}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    tabText:{
        color:'#000000',
        fontSize:10,

    },
    selectedTabText:{
        color:GlobalStyle.TabselectColor
    },
    icon:{
        width:24,
        height:24,
        tintColor:GlobalStyle.themeColor
    },
    iconselect:{
        width:24,
        height:24,
        tintColor:GlobalStyle.TabselectColor
    }
});
