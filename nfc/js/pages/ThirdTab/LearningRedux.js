
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import nfcApp from '../nfcApp'
import TodoApp from '../TodoApp'
import Elemalogin from  '../ThirdTab/Elemalogin'




export default class LearningRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {

              this.props.navigation.navigate('nfcApp',{ transition: 'forVertical' })
              console.log('nfcApp')
          }}
        >
          <Text>CounterApp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>  {
              this.props.navigation.navigate('TodoApp',{ transition: 'forVertical' })

              console.log('index')
          }}
        >
          <Text>TodoApp</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    alignItems: 'center',
    width: 100,
    height: 100,
    marginVertical: 50,
    backgroundColor: 'red',
    justifyContent: 'center'
  }
})