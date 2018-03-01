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
import  PropTypes from 'prop-types'

export default class CheckTag extends Component{

    constructor(){
        super();
        this.state={
            isSelected:false,
        }
    }

    render(){
        return(
            <TouchableOpacity>
                <View style={[this.props.tagStyle, this.state.isSelected ? ]}>

                </View>
            </TouchableOpacity>
        )
    }

}

CheckModle.propTypes = {
    tagStyle:PropTypes.json,
    selectColor:PropTypes.json,
    nomal:PropTypes.json,
};