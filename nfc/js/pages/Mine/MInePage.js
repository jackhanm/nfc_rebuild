/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Timeline from '../secondTab/line-step-indicator'

export default class Example extends Component {
    constructor(){
        super()
        this.onEventPress = this.onEventPress.bind(this)
        this.renderSelected = this.renderSelected.bind(this)
        this.data = [
            {time: '09:00', title: '基本素质', description: '大学本科，品格高尚，救死扶伤，哎呦不错哦，继续保持。',lineColor:'#009688', icon: require('../img/archery.png')},
            {time: '10:45', title: '经济能力', description: '百万富婆，买车买房，赢取白富美，NFC风控系统结合互联网及移动终端技术，支持异地多用户同时操作；支持多笔借款业务的同时处理。NFC风控系统实施至今已安全放款近15亿元对汽车的车况、房产的房型等抵押物的客观因素，进行初步折旧估价', icon: require('../img/badminton.png')},
            {time: '12:00', title: '信用状况', icon: require('../img/lunch.png')},
            {time: '14:00', title: '信用状况', description: '百万富婆，买车买房，赢取白富美，NFC风控系统结合互联网及移动终端技术，支持异地多用户同时操作；支持多笔借款业务的同时处理。NFC风控系统实施至今已安全放款近15亿元对汽车的车况、房产的房型等抵押物的客观因素，进行初步折旧估价',lineColor:'#009688', icon: require('../img/soccer.png')},
            {time: '16:30', title: '信用状况', description: '百万富婆，买车买房，赢取白富美，NFC风控系统结合互联网及移动终端技术，支持异地多用户同时操作；支持多笔借款业务的同时处理。NFC风控系统实施至今已安全放款近15亿元对汽车的车况、房产的房型等抵押物的客观因素，进行初步折旧估价', icon: require('../img/dumbbell.png')}
        ]
        this.state = {selected: null}
    }

    onEventPress(data){
        this.setState({selected: data})
    }

    renderSelected(){
        if(this.state.selected)
            return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderSelected()}
                <Timeline
                    style={styles.list}
                    data={this.data}
                    circleSize={20}
                    circleColor='rgba(0,0,0,0)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                    descriptionStyle={{color:'gray'}}
                    options={{
                        style:{paddingTop:5}
                    }}
                    innerCircle={'icon'}
                    onEventPress={this.onEventPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:65,
        backgroundColor:'white'
    },
    list: {
        flex: 1,
        marginTop:20,
    },
});
