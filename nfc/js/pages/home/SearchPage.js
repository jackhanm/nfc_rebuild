import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';


let window = Dimensions.get('window');

export default class SearchPage extends Component{
    render(){
        return(<View>
            <Text>
                searcherPage
            </Text>
        </View>)
    }

    _renderHead() {
        return (<View style={styles.container_head}>

            <View style={{flex:1, width:window.width, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image source={this.state.user_photo == ''? require('../../img/Mine/avatar.png'):{uri:this.state.user_photo}}
                           style={{width:16, height:16, borderRadius:8}}/>
                    <Text>
                        {this.state.user_name + ',您好'}
                    </Text>
                </View>

                <View style={{flex:1, alignSelf:'flex-end'}}>
                    <TouchableOpacity>
                        <Text>
                            我的记录
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{flex:1, width:window.width, justifyContent:'center', marginTop:30, marginBottom:25}}>
                <Text style={{fontSize:30, color:'#FFFFFF', fontWeight:'bold'}}>
                    快速查询
                </Text>
            </View>

            <View style={{flex:1, width:window.width, justifyContent:'center'}}>
            </View>

            <View style={{flex:1, width:window.width, justifyContent:'center'}}>
                <Text style={{fontSize:10, color:'#FFFFFF'}}>
                    tip:如无结果，请使用精确查询
                </Text>
            </View>

        </View>);
    }

}

const styles = StyleSheet.create({
    searchepage:{
        flex:1,
        width:window.width,
        height:window.height,
        backgroundColor:'#FFFFFF',
        flexDirection:'column'
    },
    container_head:{
        flex:1,
        width:window.width,
        height:400,
        backgroundColor:'#707597',
        flexDirection:'column',
        marginTop:10,
    }
});