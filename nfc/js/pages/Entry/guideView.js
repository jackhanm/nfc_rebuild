import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity,TouchableHighlight,View,SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper'
import GlobalStyle from '../../../res/styles/GlobalStyles'
import { TabNavigator, NavigationActions} from "react-navigation";
let image1 = require('../../images/1.jpg');
let image2 = require('../../images/2.jpg');
let image3 = require('../../images/3.jpg');
let image4 = require('../../images/4.jpg');
const { width, height } = Dimensions.get('window');

let reastAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'TabBar'})
    ]
});

export default class guideView extends Component {

    constructor(props) {
        super(props);
    };

    componentWillMount(){

    }

    static navigationOptions = ({ navigation }) => ({

    })
    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={200} horizontal={true} autoplay ={false} loop={false} showPagination={false} activeDotColor={GlobalStyle.themeColor}>
                    <View style={styles.slide1}>
                        <Image resizeMode='stretch' style={styles.image} source={image1} />
                    </View>
                    <View style={styles.slide2}>
                        <Image resizeMode='stretch' style={styles.image} source={image2} />
                    </View>
                    <View style={styles.slide3}>
                        <Image resizeMode='stretch' style={styles.image} source={image3} />
                    </View>

                        <View style={styles.slide3}>
                            <TouchableHighlight onPress={() => {
                                // alert(item.value.content);

                                this.props.navigation.dispatch(reastAction);
                            }} >
                            <Image resizeMode='stretch' style={styles.image} source={image4} />
                            </TouchableHighlight>
                        </View>

                </Swiper>

            </View>
            </SafeAreaView>
        );
    }
};


const styles = {
    container: {
        height:height
    },
    myimage: {
        height: 70,
        width: 70,
    },

    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        height:height

    },
}
