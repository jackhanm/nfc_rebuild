import {
    StackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';
import {
    Platform,Animated,View,Button
} from 'react-native';
import MyStackNavigation from "./MyStackNavigation";
import Welcome from "./Welcome"
import guideView from "./guideView";
import login from '../Login/login'
import accordion from '../components/accordion/accordion'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import actionsheet from  '../components/action-sheet/actionsheet'
import card from  '../components/card/card'
import drawer from '../components/drawer/drawer'
import icon from '../components/icon/icon'
import list from  '../components/list/list'
import modal from '../components/modal/modal'
import popover from '../components/popover/popover'
import result from  '../components/result/demo/result'
import toast from  '../components/toast/toast'
import activityindicator from '../components/activity-indicator/activityindicator'
import badge from '../components/badge/badge'
import button from '../components/button/button'
import carousel from  '../components/carousel/carousel'
import checkbox from  '../components/checkbox/checkbox'
import datepicker from  '../components/date-picker/datepicker'
import datapickerview from  '../components/date-picker-view/datapickerview'
import imagepicker from  '../components/image-picker/imagepicker'
import inputitem from  '../components/input-item/inputitem'
import picker from '../components/picker/picker'
import pickerview from '../components/picker-view/pickerview'
import  progress from  '../components/progress/progress'
import  pageination from '../components/pagination/pagination'
import radio from  '../components/radio/radio'
import slider from '../components/slider/slider'
import  stepper from '../components/stepper/stepper'
import  basic from  '../components/steps/demo/basic'
import segmentedcontrol from  '../components/segmented-control/segmentedcontrol'
import  Switch from '../components/switch/switcher'
import swipeaction from '../components/swipe-action/swipeaction'
import tabs from  '../components/tabs/tabs'
import tag from  '../components/tag/tag'
import textareaitem from '../components/textarea-item/textareaitem'
import flex from  '../components/flex/demo/flex'
import  grid from '../components/grid/demo/grid'
import  NoticeBar from  '../components/notice-bar/notice-bar'
import  SearchBar from  '../components/search-bar/searchbar'
import  TabBar1 from  '../components/tab-bar/demo/tarbar'
import datatimePick from '../components/date-picker-view/datapickerview'
import  WhiteSpace from  '../components/white-space/whitespace'
import  WingBlank from  '../components/wing-blank/wingblank'
import nfcApp from '../nfcApp'
import TodoApp from '../TodoApp'
import Elemalogin from  '../ThirdTab/Elemalogin'

const getOptions = title => ({
    title,
    headerStyle: {
        backgroundColor: 'black',
    },
    headerTitle:title,
    headerTintColor: 'white',
});


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

const SimpleApp = StackNavigator(
    {
        Welcome: { screen: Welcome },
        guideView:{screen:guideView},
        login:{screen:login},
        TabBar: { screen: MyStackNavigation },
        Accordion:{ screen: accordion},
        ActionSheet:{ screen:actionsheet},
        Card:{ screen:card},
        Drawer:{ screen:drawer},
        Icon:{ screen:icon},
        List:{ screen:list},
        Modal:{ screen:modal},
        Popover:{ screen:popover},
        Result:{ screen:result},
        Toast:{ screen:toast},
        ActivityIndicator:{ screen:activityindicator},
        Badge:{ screen:badge},
        Button:{ screen:button},
        Carousel:{ screen:carousel},
        Checkbox:{ screen:checkbox},
        DatePicker:{ screen:datepicker},
        DatePickerView:{screen:datapickerview},
        ImagePicker:{ screen:imagepicker},
        InputItem:{ screen:inputitem},
        Picker:{ screen:picker},
        PickerView:{ screen:pickerview},
        Progress:{ screen:progress},
        Pagination:{ screen:pageination},
        Radio:{ screen:radio},
        Slider:{ screen:slider},
        Stepper:{ screen:stepper},
        Steps:{ screen:basic},
        SegmentedControl:{ screen:segmentedcontrol},
        Switch:{ screen:Switch},
        SwipeAction:{ screen:swipeaction},
        Tabs:{ screen:tabs},
        Tag:{ screen:tag},
        TextAreaItem:{ screen:textareaitem},
        Flex:{ screen:flex},
        GridList:{ screen:grid},
        NoticeBar:{ screen:NoticeBar},
        SearchBar:{ screen:SearchBar},
        WhiteSpace:{ screen:WhiteSpace},
        WingBlank:{screen :WingBlank},
        TodoApp:{screen :TodoApp},
        nfcApp:{screen :nfcApp},
        Elemalogin:{screen:Elemalogin}
    },
    {
        mode: 'card',
        headerMode:'none',
    },
    {
        transitionConfig: TransitionConfiguration,
         StackOptions,
    });
export default SimpleApp;