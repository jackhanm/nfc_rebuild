import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,SafeAreaView,Platform,Dimensions, TouchableOpacity
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export default class FillInInfo extends Component{

    constructor(){
        super();
        this.state = {
            dataSelect:[],
            isShowModle:false,
            selectedText:'请选择       '
        }
    }

    componentDidMount(){
        this.setState({
            dataSelect:[{id:1, info:"hefei"}, {id:2, info:"shanghai"}, {id:3, info:"feidong"}
                , {id:4, info:"feixi"},{id:5, info:"bengbu"}
                ,{id:8, info:"大不列颠及北爱尔兰王国"}]
        });
    }

    _renderItem(item){
        console.log("item: " + JSON.stringify(item))
        return(<View style={styles.item}>
            <Text>{item.info}</Text>
        </View>);
    }


    render(){
        return(<View>
            <ModalDropdown
                style={{backgroundColor:'red', justifyContent:'center'}}
                textStyle={{fontSize:18, margin:15}}
                defaultValue={this.state.selectedText}
                renderButtonText={(item)=>{
                    console.log("item:" + JSON.stringify(item)) ;return item.info}}
                options={this.state.dataSelect}
                renderRow={(item)=>this._renderItem(item)}
            />
        </View>);
    }
}

const  styles = StyleSheet.create({
    item:{
        flex:1,
        width:150,
        height:40,
        justifyContent:'center',
    },
    datePickerContainer:{
        flex:1,
    }
});