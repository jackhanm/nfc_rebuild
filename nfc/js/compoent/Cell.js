import React, {PureComponent} from 'react'
import { SwipeAction, List } from 'antd-mobile';
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio,Dimensions} from 'react-native'
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}
let substrArray;
class Cell extends PureComponent {

    // constructor(prop){
    //     super(prop);
    //
    // }

    rendertag(infp){
        let imagestr = ""+infp.reportType;
        substrArray = imagestr.split(",");


        return(

            <View style={{ flexDirection:'row',
                alignItems:'center'}}>
                {substrArray.includes('PERSON_RISK') ?this.rendertag1():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag2():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag3():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag4():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag5():null}
                {substrArray.includes('PERSON_CREDIT') ?this.rendertag6():null}
                {substrArray.includes('7') ?this.rendertag7():null}
                {substrArray.includes('8') ?this.rendertag8():null}
                {substrArray.includes('9') ?this.rendertag9():null}
                {substrArray.includes('10') ?this.rendertag10():null}

            </View>
        )
    }
    rendertag1(){
        return(<Image source={require('../imgResouce/anti_fraud_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag2(){
        return(<Image source={require('../imgResouce/car_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag3(){
        return( <Image source={require('../imgResouce/company_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag4(){
        return(<Image source={require('../imgResouce/credit_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag5(){
        return(<Image source={require('../imgResouce/home_estimate_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag6(){
        return(<Image source={require('../imgResouce/home_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag7(){
        return(<Image source={require('../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag8(){
        return(<Image source={require('../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag9(){
        return(<Image source={require('../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }
    rendertag10(){
        return(<Image source={require('../imgResouce/personal_small.png')} style={{alignSelf:'center'}}/>);
    }

    render() {
        const right = [

            {
                text: 'Delete',
                onPress: ()=>this.props.delete(),
                style: { backgroundColor: 'red', color: 'white' },
            },
        ];

        console.log('render cell')
        let {info} = this.props



        return (



         //   <List>
                // <SwipeAction autoClose style={{ backgroundColor: 'transparent' }} right={right}  onOpen={() => console.log('open')} onClose={() => console.log('close')}>*/}

                    <TouchableOpacity  style={styles.container} onPress={() => this.props.onPress()}>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <View style={styles.item}>
                                <View style={{flex:4, flexDirection:'row',
                                    alignItems:'center',height:50}}>
                                    <Text style={{color:'#4352B2', marginRight:5, }}>
                                        {info.queryType ==='PERSON'? '个人': '公司'}
                                    </Text>
                                    <Text style={{color:'black', marginRight:5}}>
                                        {info.queryKey}
                                    </Text>
                                    {this.rendertag(info)}
                                </View>
                                <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'flex-end',height:50}}>
                                    <Text>
                                        {info.createTime.substring(0,10)}
                                    </Text>
                                    <Image style={{width:10, height:10}} source={require('../imgResouce/backicon.png')}/>
                                </View>
                            </View>
                            <View style={{backgroundColor:'#F0F0F2', height:0.5, width:windowWidth}}/>
                        </View>
                    </TouchableOpacity>
                // </SwipeAction>
            // </List>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',

    },
    item:{
        flex:1,
        width:windowWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        height:70
    },
    // container: {
    //     flexDirection: 'row',
    //     padding: 10,
    //     borderBottomWidth: 1 / PixelRatio.get(),
    //     borderColor: color.border,
    //     backgroundColor: 'white',
    // },
    // icon: {
    //     width: 80,
    //     height: 80,
    //     borderRadius: 5,
    // },
    // rightContainer: {
    //     flex: 1,
    //     paddingLeft: 20,
    //     paddingRight: 10,
    // },
    // price: {
    //     color: color.theme
    // },
    // h1: {
    //     fontSize: 15,
    //     fontWeight: 'bold',
    //     color: '#222222',
    // },
    // p: {
    //     fontSize: 13,
    //     color: '#777777',
    // },
})

export default Cell

