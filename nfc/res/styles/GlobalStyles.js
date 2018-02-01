/*
* 全局样式
* */
import {
    Dimensions,
}from 'react-native'
import  ThemeDao from '../../js/pages/publicState/ThemeDao'
const {height,width} = Dimensions.get('window');
//
import BaseComponent from '../../js/base/BaseCommon'
//  class global extends BaseComponent {
//  componentDidMount(){
//      new ThemeDao().getTheme().then((data)=>{
//          this.theme=data;
//      });
//      console.log('golbal'+this.theme)
//  }
// }
module.exports ={

    line: {
        flex: 1,
        height: 0.4,
        opacity:0.5,
        backgroundColor: 'darkgray',
    },
    listView_container:{
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    backgroundColor: '#f3f3f4',
    listView_height:(height-(20+40)),
    window_height:height,
    window_width:width,
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
    themeColor:'#4474BB',
    TabselectColor:'#FF9800'



};
