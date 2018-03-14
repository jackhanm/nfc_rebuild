import React, { Component } from "react";
import { View, StyleSheet,ScrollView,Text} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from '../../compoent/table';
import {BaseComponent} from  '../../base/BaseComponent'
import { List, Modal } from 'antd-mobile';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import {commonStyle} from '../../../js/util/commonStyle'
export default class ReportData extends BaseComponent {
    constructor(){
        super();
        this.state={



        }
    }

    componentDidMount(){
        super.componentDidMount();
    }

    navigationBarProps() {

        return {
            title: '报告',
            titleStyle: {
                color: commonStyle.navTitleColor,
            },
            leftIcon: {
                name: 'nav_back_o',
                size: 20,
                color: commonStyle.navTitleColor,
            },
            navBarStyle: {
                backgroundColor: commonStyle.navThemeColor,
            }
        }
    }

   _renderheadtitle(){
        return (
            <Text style={{fontSize:20,alignSelf:'center',top:20}}>企业信用报告</Text>
        );

   }
   _renderfirsttable(){
       const tableHead = ['风险等级', '企业信息', '', '借款额度上限',''];
       const tableTitle = ['A级大师大师大师说的是的撒的是的撒打算的说大师'];
       const tableData = [
           ['企业信用', '', '借款期限',''],
           ['修正附加值', ''],
            ['风控说明:' ]
       ];
       return (
           <View style={{marginTop:40,margin:10}}>
               <Table>
                  <Row data={tableHead} flexArr={[1, 1, 1, 1,1]} style={styles.head} textStyle={styles.text}/>
                   <TableWrapper style={{flexDirection: 'row'}}>
                       <Col data={tableTitle} style={styles.title} heightArr={[100]} textStyle={styles.text}/>
                       <Rows data={tableData} flexArr={[1,1, 1, 1]} style={styles.row} textStyle={styles.text} />
                   </TableWrapper>
               </Table>
           </View>
       );
   }

    _render() {

        return (
            <ScrollView>

                {this._renderheadtitle()}
                {this._renderfirsttable()}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
})