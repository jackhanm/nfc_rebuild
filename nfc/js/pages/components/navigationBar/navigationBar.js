
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component,} from 'react';
import ProTypes from  'prop-types'
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import GlobalStyles from '../../../../res/styles/GlobalStyles'
const barBtnWidth =40
const defaultNavigationBarProps={
    hiddenNav:false,
    hiddenLeftItem:false,
    hiddenRightItem:false
}
const navbarConfig = {
    navigationBarProps: PropTypes.Object,
    onLeftPress: PropTypes.fun,
    onRightPress: PropTypes.fun,
    hiddenNav: PropTypes.bool,
    navBarStyle: PropTypes.Object,
    navContentStyle: PropTypes.Object,
    hiddenLeftItem: PropTypes.bool,
    leftIcon: PropTypes.Object,
    leftTitle: PropTypes.string,
    leftTitleStyle: PropTypes.Object,
    leftItemStyle: PropTypes.Object,
    titleStyle: PropTypes.Object,
    title: PropTypes.string,
    subTitleStyle: PropTypes.Object,
    subTitle: PropTypes.string,
    hiddenRightItem: PropTypes.bool,
    rightIcon: PropTypes.Object,
    rightTitle: PropTypes.string,
    rightTitleStyle: PropTypes.Object,
    rightItemStyle: PropTypes.Object

}
export default class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps)
    }

    componentWillReceiveProps(nextProps) {
        this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, nextProps.navigationBarProps)
    }

    renderLeftItem() {
        let tempComponent
        if (this.navigationBarProps.hiddenLeftItem) {
            return <View style={{width: barBtnWidth}}/>
        }
        const {onLeftPress} = this.props
        if (this.navigationBarProps.leftIcon) {
            let icon = this.navigationBarProps.leftIcon
            tempComponent = (
                <Icon name={`oneIcon|${icon.name}`} size={icon.size} color={icon.color}/>
            )
        } else if (this.navigationBarProps.leftTitle && this.navigationBarProps.leftTitle !== '') {
            tempComponent = (
                <Text numberOfLines={1} style={[styles.leftTitleStyle, this.navigationBarProps.leftTitleStyle]}>{this.navigationBarProps.leftTitle}</Text>
            )
        } else {
            tempComponent = (
                <Icon name={'oneIcon|nav_back_o'} size={20} color={commonStyle.iconGray}/>
            )
        }
        return (
            <TouchableOpacity
                style={[styles.leftItemStyle, this.navigationBarProps.leftItemStyle]}
                onPress={onLeftPress}>
                {tempComponent}
            </TouchableOpacity>
        )
    }

    renderTitle() {
        return (
            <View style={[styles.titleContainer]}>
                <Text style={[styles.titleStyle, this.navigationBarProps.titleStyle]}>{this.navigationBarProps.title}</Text>
                {
                    this.navigationBarProps.subTitle ? <Text style={[styles.subTitleStyle, this.navigationBarProps.subTitleStyle]}>{this.navigationBarProps.subTitle}</Text> : null
                }
            </View>
        )
    }

    renderRightItem() {
        let tempComponent
        if (this.navigationBarProps.hiddenRightItem) {
            return <View style={{width: barBtnWidth}}/>
        }
        const {onRightPress} = this.props
        if (this.navigationBarProps.rightIcon) {
            let icon = this.navigationBarProps.rightIcon
            tempComponent = (
                <Icon name={`oneIcon|${icon.name}`} size={icon.size} color={icon.color}/>
            )
        } else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
            tempComponent = (
                <Text numberOfLines={1} style={[styles.rightTitleStyle, this.navigationBarProps.rightTitleStyle]}>{this.navigationBarProps.rightTitle}</Text>
            )
        } else {
            tempComponent = (
                <View style={{width: barBtnWidth}}/>
            )
        }
        return (
            <TouchableOpacity
                style={[styles.rightItemStyle, this.navigationBarProps.rightItemStyle]}
                onPress={onRightPress}>
                {tempComponent}
            </TouchableOpacity>
        )
    }

    render() {
        if (this.navigationBarProps.hiddenNav) {
            return <View/>
        }
        return (
            <View style={[styles.navBarStyle, this.navigationBarProps.navBarStyle]}>
                <View style={[styles.navContentStyle, this.navigationBarProps.navContentStyle]}>
                    {this.renderLeftItem()}
                    {this.renderTitle()}
                    {this.renderRightItem()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBarStyle: {
        height: commonStyle.navHeight,
        backgroundColor: commonStyle.navThemeColor,
        borderBottomWidth: 0.5,
        borderBottomColor: commonStyle.lineColor,
    },
    navContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: commonStyle.navStatusBarHeight,
        height: commonStyle.navContentHeight,
        marginHorizontal: 10,
    },
    leftImageStyle: {
        width: commonStyle.navImageWidth,
        height: commonStyle.navImageHeight,
    },
    leftItemStyle: {
        justifyContent: 'center',
        width: 40,
    },
    leftTitleStyle: {
        fontSize: commonStyle.navLeftTitleFont,
        color: commonStyle.navLeftTitleColor
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleStyle: {
        marginTop:G_IsiPhoneX?10:20,
        fontSize: commonStyle.navTitleFont,
        color: commonStyle.navTitleColor,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subTitleStyle: {
        fontSize: 5,
        marginTop: 5
    },
    rightImageStyle: {
        width: commonStyle.navImageWidth,
        height: commonStyle.navImageHeight
    },
    rightItemStyle: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: barBtnWidth,
    },
    rightTitleStyle: {
        fontSize: commonStyle.navRightTitleFont,
        color: commonStyle.navRightTitleColor
    }
})



















import TabNavigator from 'react-native-tab-navigator';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    render() {
        return (


            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
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
});
