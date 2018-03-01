import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    FlatList,
} from 'react-native';

let winWidth = Dimensions.get('window').width;

export default class ChangePassWord extends Component{
    constructor(){
        super();
    }

    render(){
        return(<View style={{flex:1, backgroundColor:'#F0F0F2', flexDirection:'column', alignItems:'center'}}>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        原密码：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        新密码：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{height:80, width:winWidth, flexDirection:'row', justifyContent:'center'}}>
                <View style={styles.viewLeft}>
                    <Text style={styles.textStyle}>
                        再次确认：
                    </Text>
                </View>
                <View style={styles.viewRight}>
                    <TextInput
                        style={styles.edit}
                        underlineColorAndroid='transparent'/>
                </View>
            </View>

            <View style={{width:winWidth-120, backgroundColor:'white', justifyContent:'center', alignItems:'center', marginTop:100}}>
                <Text style={{fontWeight:'900', fontSize:15, padding:15}}>
                    确认修改
                </Text>
            </View>

        </View>);
    }
}

const styles = StyleSheet.create({
    textStyle:{
        fontWeight:'900',
    },

    viewLeft:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:20,
    },
    viewRight:{
        flex:4,
        flexDirection:'row',
        alignItems:'center'
    },
    edit: {
        height: 40,
        width:200,
        backgroundColor: '#fff',
        marginRight: 10,
        marginLeft:20
    },

});