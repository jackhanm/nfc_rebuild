import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
    StyleSheet,
    View,
    Image,SafeAreaView,Platform,Dimensions, Keyboard
} from 'react-native';

import GlobalStyle from '../../styles/GlobalStyles'

import TabMainScreen from '../home/TabMainScreen'
import ThemeDao from '../publicState/ThemeDao'
import CheckBox from '../ThirdTab/CheckBox'

import Elemalogin from  '../ThirdTab/Elemalogin'
import Antmobile from  '../ThirdTab/Antmobile'
import LearningRedux from '../ThirdTab/LearningRedux'
import Nfchomepage from '../home/nfchomepage'
import Searchpersonal from '../secondTab/SearchPersonal'
import PersonalData from '../home/PersonalData'
import Mineself from '../Mine/MineSelf'
import Accountinfo from '../Mine/AccountInfo'
import Changepassword from '../Mine/ChangePassWord'
import SearchPersonal from '../secondTab/SearchPersonal'
import SearchCompany from '../ThirdTab/SearchCompany'
import ReportData from  '../home/ReportData'
import BaseComponent from  '../../base/BaseComponent'




import NfcLogin from '../Login/NfcLogin'

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
            selectedTab:'首页',
            logingState: 0,

        }
    }

    render(){
        return(

            <View style={styles.container}>
            <TabNavigator
                tabBarStyle={[
                    {backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e5e5e5',overflow:'visible'},
                    G_IsiPhoneX?{paddingBottom:34,height:49+34}:{}
                ]}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === '首页'}
                    title={'首页'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/1.png')} />}
                //    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../../res/images/home_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/1.png')} />}
                    onPress={() => {Keyboard.dismiss();this.setState({ selectedTab: '首页' }); }}>
                    <Nfchomepage  {...this.props}/>
                </TabNavigator.Item>
                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === '理财'}*/}
                    {/*title={'理财'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: '理财' })}>*/}
                    {/*<SecondScreen  {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'checkbox'}*/}
                    {/*title={'checkbox'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'checkbox' })}>*/}
                    {/*<CheckBox  {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'timePick'}*/}
                    {/*title={'timePick'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*//    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../../res/images/home_normal.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'timePick' })}>*/}
                    {/*<DatetimePick  {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}
                <TabNavigator.Item
                    selected={this.state.selectedTab === '查个人'}
                    title={'查个人'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/2.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/2.png')} />}
                    onPress={() => {this.setState({ selectedTab: '查个人' });Keyboard.dismiss()}}>
                    <SearchPersonal  {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '查企业'}
                    title={'查企业'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/3.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/3.png')} />}
                    onPress={() => {this.setState({ selectedTab: '查企业' });Keyboard.dismiss()}}>
                    <SearchCompany  {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === '账户'}
                    title={'账户'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/4.png')} />}
                    //    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../../res/images/home_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/4.png')} />}
                    onPress={() => {this.setState({ selectedTab: '账户' }); Keyboard.dismiss()}}>
                    <Mineself  {...this.props}/>
                </TabNavigator.Item>
                {/*<TabNavigator.Item
                    selected={this.state.selectedTab === 'elelogin'}
                    title={'elelogin'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/home_boy_press.png')} />}
                    //    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../../res/images/home_normal.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/home_boy_press.png')} />}
                    onPress={() => this.setState({ selectedTab: 'elelogin' })}>
                    <ReportData  {...this.props}/>
                </TabNavigator.Item>*/}

                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === '我的'}*/}
                    {/*title={'我的'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: '我的' })}>*/}
                    {/*<SearchPersonal {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}

                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'AntdataPick'}*/}
                    {/*title={'AntdataPick'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'AntdataPick' })}>*/}
                    {/*<SearchCompany {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item
                    selected={this.state.selectedTab === 'Antmobile'}
                    title={'Antmobile'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/home_boy_press.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/home_boy_press.png')} />}
                    onPress={() => this.setState({ selectedTab: 'Antmobile' })}>
                    <Antmobile {...this.props}/>
                </TabNavigator.Item>*/}

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'LearningRedux'}
                    title={'LearningRedux'}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderIcon={()=> <Image style={styles.icon} source={require('../../imgResouce/4.png')} />}
                    renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../imgResouce/4.png')} />}
                    onPress={() => this.setState({ selectedTab: 'LearningRedux' })}>
                    <Elemalogin {...this.props}/>
                </TabNavigator.Item>

                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'LearningRedux'}*/}
                    {/*title={'LearningRedux'}*/}
                    {/*titleStyle={styles.tabText}*/}
                    {/*selectedTitleStyle={styles.selectedTabText}*/}
                    {/*renderIcon={()=> <Image style={styles.icon} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*renderSelectedIcon={() => <Image style={styles.iconselect} source={require('../../images/home_boy_press.png')} />}*/}
                    {/*onPress={() => this.setState({ selectedTab: 'LearningRedux' })}>*/}
                    {/*<Pdfviewer {...this.props}/>*/}
                {/*</TabNavigator.Item>*/}


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
        width:20,
        height:20,
        tintColor:GlobalStyle.themeColor
    },
    iconselect:{
        width:24,
        height:24,
        tintColor:GlobalStyle.TabselectColor,

    },

});
