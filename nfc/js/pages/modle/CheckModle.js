import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import  PropTypes from 'prop-types'

const defualText = '点击获取验证码'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default class CheckModle extends Component{



    constructor(props){
        super(props);
        this.state={
            text:defualText,
            timerCount:this.props.timeOver,
            enableClick:false,
            btnstyle:styles.checkNomal,
        }
    }
    render(){
        return(

            <View style={styles.inputWrapper}>
                <TextInput style={styles.input}
                           placeholder={this.props.placeholder}
                           secureTextEntry={this.props.secureTextEntry}
                           autoCorrect={this.props.autoCorrect}
                           autoCapitalize={this.props.autoCapitalize}
                           returnKeyType={this.props.returnKeyType}
                           placeholderTextColor='white'
                           underlineColorAndroid='transparent'
                           onChangeText={this.props.onTextChange}/>

                <View style={{position:'absolute', left:212}}>
                    <TouchableOpacity
                        style={this.state.btnstyle}
                        disabled={this.state.enableClick}
                        onPress={()=>{this.props.onClick
                            this.setState({
                                enableClick:true,
                                btnstyle:styles.checkWaite,
                            });
                            this.interval = setInterval(() =>{

                                vartimer=this.state.timerCount-1

                                if(vartimer===0){

                                    this.interval&&clearInterval(this.interval);

                                    this.setState({
                                        timerCount:this.props.timeOver,
                                        text:defualText,
                                        enableClick: false,
                                        btnstyle:styles.checkNomal,
                                    })

                                }else{
                                    this.setState({
                                        text:"重新获取（" + vartimer + "）",
                                        timerCount:vartimer,
                                    })
                                }

                            },1000);}}>
                        <Text>
                            {this.state.text}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    };



}


CheckModle.propTypes = {
    timeOver: PropTypes.number,
    onClick:PropTypes.func,

    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    onTextChange:PropTypes.func,
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
    inputWrapper: {
        flex: 1,
        flexDirection:'row',
        marginTop:10,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },

    checkNomal:{
        borderRadius:20,
        paddingBottom:11,
        paddingTop:10,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#87cefa'
    },
    checkWaite:{
        borderRadius:20,
        paddingBottom:11,
        paddingTop:10,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#00000000'
    },
});
