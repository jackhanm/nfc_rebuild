import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, FlatList, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';

const stepIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}

export default class VerticalStepIndicator extends Component {

    constructor() {
        super();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dummyData.data,
            currentPage:0
        };
        this.handleViewableItemsChanged = this.getVisibleRows.bind(this)
        this.viewabilityConfig = {viewAreaCoveragePercentThreshold: 50}
    }

    render() {
        {console.log("data:" + JSON.stringify(this.state.dataSource))}
        return (
            <View style={styles.container}>
                <View style={styles.stepIndicator}>
                    <StepIndicator
                        ref="StepIndicator"
                        customStyles={stepIndicatorStyles}
                        stepCount={6}
                        direction='vertical'
                        currentPosition={this.state.currentPage}
                        labels={dummyData.data.map(item => item.title)}
                    />
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={(item)=>this.renderPage(item)}
                    onViewableItemsChanged={this.handleViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                />
            </View>
        );
    }

    renderPage({item}){
        console.log("item:" + JSON.stringify(item))
        return (
            <View style={styles.rowItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        )
    }

    getVisibleRows(info){
        console.log("info:" + JSON.stringify(info));
        visibleRows = info.viewableItems;
        const visibleRowNumbers = visibleRows[0].index;
        console.log("visibleRowNumbers:" + visibleRowNumbers);
        this.setState({currentPage: visibleRowNumbers});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#ffffff'
    },
    stepIndicator: {
        marginVertical:50,
        paddingHorizontal:20
    },
    rowItem: {
        flex:3,
        paddingVertical:20
    },
    title: {
        flex: 1,
        fontSize:20,
        color:'#333333',
        paddingVertical:16,
        fontWeight:'600'
    },
    body: {
        flex: 1,
        fontSize:15,
        color:'#606060',
        lineHeight:24,
        marginRight:8
    }
});