import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Accordion, List } from 'antd-mobile';
import {BaseComponent} from  '../../../base/BaseComponent'
import {commonStyle} from '../../../../res/styles/commonStyle'
class accordion extends BaseComponent {

    navigationBarProps() {
        return {
            title: 'according',
            titleStyle: {
                color: commonStyle.white
            },
            leftIcon: {
                name: 'nav_back_o',
                size: 20,
                color: commonStyle.white
            },
            navBarStyle: {
                backgroundColor: '#151C28',
            }
        }
    }
    constructor(props) {
        super(props)

    }
    onChange = (key) => {
        console.log(key);
    }
    _render()  {
        return (

            <View style={{ marginTop: 80, marginBottom: 10 }}>
                <Accordion onChange={this.onChange} defaultActiveKey="2">
                    <Accordion.Panel header="Title 1">
                        <List>
                            <List.Item>Content 1</List.Item>
                            <List.Item>Content 2</List.Item>
                            <List.Item>Content 3</List.Item>
                        </List>
                    </Accordion.Panel>
                    <Accordion.Panel header="Title 2">this is panel content2 or other</Accordion.Panel>
                    <Accordion.Panel header="Title 3">
                        Text text text text text text text text text text text text text text text
                    </Accordion.Panel>
                </Accordion>
            </View>
        );
    }
}
export default accordion