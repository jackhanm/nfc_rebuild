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
    ScrollView,
    KeyboardAvoidingView,
    ActionSheetIOS,
    Modal,
    NativeModules,
    NativeAppEventEmitter,//导入
    ActivityIndicator
} from 'react-native';
var RNCalliOSAction = NativeModules.RNCalliOSAction;
import ModalDropdown from 'react-native-modal-dropdown';
import NetUtils from '../Network/NetUtils'
import NetAPI from  '../Network/NetAPI'
import {commonStyle} from '../../../res/styles/commonStyle'

import Toast from 'react-native-root-toast';
import {BaseComponent} from  '../../base/BaseComponent'
import { district } from 'antd-mobile-demo-data';

import GlobalStyles from '../../../res/styles/GlobalStyles'
let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').width;
import ScreenUtil, {scaleSize} from '../../util/ScreenUtil'


const SelectType = {
    BRAND: 'carBrand',
    VEHICLES: 'vehicles',
    CARMODLE: 'carModle',
    HOMETYPE:'hometype',
    PEOPLEQUALITY:'PEOPLEQUALITY',
    DEVELOPMENT:'DEVELOPMENT',
    FINANCE:'FINANCE',
    PERFORMANCE:'PERFORMANCE',
    CASEINFO:'CASEINFO',
    COUNTRYCOMPANY:'COUNTRYCOMPANY',
    COMPANYHAOCHE:'COMPANYHAOCHE',
    COMPANYOVERDUE:'COMPANYOVERDUE',
    USERAGE:'USERAGE',
    EDUCATION:'EDUCATION',
    HELATHSTATE:'HELATHSTATE',
    REGISTERED:'REGISTERED',
    INCOME:'INCOME',
    PERCENTAGE:'PERCENTAGE',
    HOUSEINFO:'HOUSEINFO',
    MARRIAGE:'MARRIAGE',
    RESIDENCE:'RESIDENCE',
    PEOPLES:'PEOPLES',
    EMPLOYER:'EMPLOYER',
    WORK:'WORK',
    POST:'POST',
    CREDITCARD:'CREDITCARD',
    QUOTA:'QUOTA',
    USE_YEAR:'USE_YEAR',
    CREDIT_LOST:'CREDIT_LOST',
    PERSONALHAOCHE:'PERSONALHAOCHE',
    PERSONALOVERDUE:'PERSONALOVERDUE',
    PERSONALCARCARD:'PERSONALCARCARD',
    CRIMEHISTORY:'CRIMEHISTORY',
    REALESTATE:'REALESTATE',
    FAMILYKNOW:'FAMILYKNOW',
    BACKTIME:'BACKTIME',
}

const homeType = [{code:'HOUSE', caption:"写字楼"}, {code:'OFFICE', caption:'商铺'}, {code:'SHOP', caption:"住宅"}];
const age = [{code:'25-35岁', caption:'25 - 35岁'}
, {code:'35-45岁', caption:'35 - 45岁'}
, {code:'45-55岁', caption:'45 - 55岁'}
, {code:'25岁以下及55岁以上', caption:'25岁以下及55岁以上'}];
const education = [{code:'研究生或以上', caption:'研究生或以上'}
    , {code:'本科含双学位', caption:'本科含双学位'}
    , {code:'大专', caption:'大专'}
    , {code:'中专及高中以下', caption:'中专及高中以下'}];
const healthy = [{code:'当前有重大疾病', caption:'当前有重大疾病'}
    , {code:'当前较为健康', caption:'当前较为健康'}];
const registered = [{code:'本市三年以上户口', caption:'本市三年以上户口'}
    , {code:'本市1-3年户口', caption:'本市1-3年户口'}
    , {code:'外地户口', caption:'外地户口'}];
const income = [{code:'20000及以上', caption:'20000及以上'}
    , {code:'10000-20000', caption:'10000 - 20000'}
    , {code:'8000-10000', caption:'8000 - 10000'}
    , {code:'6000-8000', caption:'6000 - 8000'}
    , {code:'4000-6000', caption:'4000 - 6000'}
    , {code:'2000-4000', caption:'2000 - 4000'}
    , {code:'2000以下', caption:'2000以下'}];

const percentage = [{code:'', caption:'无月还款'}
    , {code:'20%及以下', caption:'20%及以下'}
    , {code:'20%-40%', caption:'20% - 40%'}
    , {code:'40%-60%', caption:'40% - 60%'}
    , {code:'60%-80%', caption:'60% - 80%'}
    , {code:'80%-100%', caption:'80% - 100%'}
    , {code:'100%以上', caption:'100%以上'}];

const houseInfo = [{code:'有住房（无贷款）', caption:'有住房（无贷款）'}
    , {code:'有住房（有贷款）', caption:'有住房（有贷款）'}
    , {code:'父母同住或者宿舍', caption:'父母同住或者宿舍'}
    , {code:'租房', caption:'租房'}
    , {code:'其他', caption:'其他'}];

const residence = [{code:'5年以上', caption:'5年以上'}
    , {code:'2-5年', caption:'2 - 5年'}
    , {code:'2年以下', caption:'2年以下'}];

const peoples = [{code:'0人', caption:'0人'}
    , {code:'1-2人', caption:'1-2人'}
    , {code:'3人', caption:'3人'}
    , {code:'4人', caption:'4人'}
    , {code:'4人以上', caption:'4人以上'}];

const employer = [{code:'机关事业单位', caption:'机关事业单位'}
    , {code:'上市公司，军队，三资外企', caption:'上市公司，军队，三资外企'}
    , {code:'国营企业', caption:'国营企业'}
    , {code:'集体或民营企业', caption:'集体或民营企业'}
    , {code:'个体经营商户', caption:'个体经营商户'}
    , {code:'其他', caption:'其他'}];

const work = [{code:'5年以上', caption:'5年以上'}
    , {code:'2-5年', caption:'2 - 5年'}
    , {code:'2年以下', caption:'2年以下'}];

const post = [{code:'总经理，厅局级以上', caption:'总经理，厅局级以上'}
,{code:'部门经理级，处级科级', caption:'部门经理级，处级科级'}
    , {code:'职员一般干部', caption:'职员一般干部'}
    , {code:'打工或其它', caption:'打工或其它'}];

const creditCard = [{code:'10次以上', caption:'10次以上'}
    ,{code:'8-10次', caption:'8 - 10次'}
    , {code:'5-8次', caption:'5 - 8次'}
    , {code:'2-5次', caption:'2 - 5次'}
    , {code:'2次以下', caption:'2次以下'}
    , {code:'无信用卡', caption:'无信用卡'}];

const quota = [{code:'白金卡50-100万', caption:'白金卡50-100万'}
    ,{code:'白金卡10-50万', caption:'白金卡10-50万'}
    , {code:'金卡5-10万', caption:'金卡5-10万'}
    , {code:'金卡1-5万', caption:'金卡1-5万'}
    , {code:'普卡1万以下', caption:'普卡1万以下'}
    , {code:'无信用卡', caption:'无信用卡'}];

const use_year = [{code:'3年以上', caption:'3年以上'}
    , {code:'1 - 3年', caption:'1 - 3年'}
    , {code:'1年以内', caption:'1年以内'}
    , {code:'无信用卡', caption:'无信用卡'}];

const credit_lost = [{code:'无失信', caption:'无失信'}
    , {code:'无信用卡', caption:'无信用卡'}
    , {code:'2次（含）之内', caption:'2次（含）之内'}
    , {code:'2次以上', caption:'2次以上'}];

const yes_no = [{code:'是', caption:'是'}
    , {code:'否', caption:'否'}];

const has_no = [{code:'无', caption:'无'}
    , {code:'有', caption:'有'}];

const car_card = [{code:'无车', caption:'无车'}
    , {code:'本地车牌', caption:'本地车牌'}
    , {code:'异地车牌', caption:'异地车牌'}];

const good_bad = [{code:'良好', caption:'良好'}
    , {code:'正常', caption:'正常'}
    , {code:'较差', caption:'较差'}]

const better_bad = [{code:'优秀', caption:'优秀'}
    , {code:'正常', caption:'正常'}
    , {code:'较差', caption:'较差'}]

const number = [{code:'0', caption:'0'}
    , {code:'1', caption:'1'}
    , {code:'2', caption:'2'},
    {code:'3', caption:'3'}
    , {code:'4', caption:'4'}
    , {code:'5', caption:'5'},
    {code:'6', caption:'6'}
    , {code:'7', caption:'7'}
    , {code:'8', caption:'8'},
    {code:'9', caption:'9'}
    , {code:'10', caption:'10'}]

const marriage = [{code:'已婚有子女', caption:'已婚有子女'}
    , {code:'已婚无子女', caption:'已婚无子女'}
    , {code:'离婚', caption:'离婚'},
    {code:'未婚', caption:'未婚'}];

const backTime = [{code:'1个月', caption:'1个月'}
, {code:'3个月', caption:'3个月'}
, {code:'6个月', caption:'6个月'}
, {code:'12个月', caption:'12个月'}];

var fillinfo;

var toastshow = false;



export default class PersonalData extends BaseComponent{
    navigationBarProps() {

        return {
            title: '查询',
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

    _showToast(info) {
        if(!toastshow){
            Toast.show(info, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,

                onShow: () => {
                    toastshow = true;
                },
                onHidden: () => {
                    toastshow = false;
                }
            });
        }
    }

    fetchAddressData(type){
        // 查询省
        var newParams= NetAPI.PUBLIC_DIC_INFO+'?type=AREA_CODE' + type;
        NetUtils.get(NetAPI.serverUrl2, newParams , "1.0", "", false, (result) => {

                console.log(result)

                if (result.code === 0) {
                    if(result.data.length == 0){
                        if(this.state.isSelected_two){
                            this.setState({data:[this.state.selected2], isLoading:false});
                        }else{
                            if(this.state.isSelected_one){
                                this.setState({data:[this.state.selected1], isLoading:false});
                            }
                        }
                    }else{
                        this.setState({data:result.data, isLoading:false});
                    }
                }
            }
        );
    }

    // 查询车品牌
    fetchCarBrand(){
        var CarParams= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_BRAND'
        NetUtils.get(NetAPI.serverUrl2, CarParams , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data, isLoading:false});
                }
            }
        );
    }

    // 查询车系
    fetcheCarSeries(type){
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_SERIES' + type
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data, isLoading:false});
                }
            }
        );
    }

// 查询车型
    fetchCarModel(type) {
        var CarParams2= NetAPI.PUBLIC_DIC_INFO+'?type=CAR_MODEL' + type + ',CAR_MODEL'
        NetUtils.get(NetAPI.serverUrl2, CarParams2 , "1.0", "", false, (result) => {

                console.log(result)
                if (result.code === 0) {
                    this.setState({carData:result.data, isLoading:false});
                }
            }
        );
    }


    componentDidMount() {
        super.componentDidMount();
        console.log('===================componentDidMount====================');

        fillinfo={
            //企业社会代码
            companyId:'',
            //企业名称
            companyName:'',

            //查询标签
            typeTag:'',

            //省份证号码
            id:'',
            //姓名
            name:'',
            //车牌
            carBrand:'',
            //车系
            carVs:'',
            //车型号
            carModle:'',
            //上市时间
            markTime:'',
            //汽车属地 二级地址，逗号隔开
            carAdd:'',
            //车牌
            carID:'',
            //行驶公里数
            carMileage:'',
            //房屋地址，三级地址，逗号隔开
            homeAdd:'',
            //房屋名字
            homeName:'',
            //房屋类型
            hometype:'',
            //房屋面积
            homeMeasure:'',
            /*-----------------------------------------*/
            peoplequality:'',
            development:'',
            finance:'',
            performance:'',
            caseinfo:'',
            countrycompany:'',
            companyhaoche:'',
            companyoverdue:'',
            userage:'',
            education:'',
            helathstate:'',
            registered:'',
            income:'',
            percentage:'',
            houseinfo:'',
            marriage:'',
            residence:'',
            peoples:'',
            employer:'',
            work:'',
            post:'',
            creditcard:'',
            quota:'',
            use_year:'',
            credit_lost:'',
            personalhaoche:'',
            personaloverdue:'',
            personalcarcard:'',
            crimehistory:'',
            realestate:'',
            familyknow:'',

            phoneNumber:'',
            personTime:'',
            companyTime:'',
            money:'',
            backTime:'',
        }



        this.setState({
            companyRiskManage:false
            , creditReport:false
            , antiFraud:false
            , riskManage:false
            , all:false
            , homeRent:false
            , carPrice:false
            , homePrice:false
        });


        if(this.props.navigation.state.params.type == 0){
            console.log(this.props.navigation.state.params);

            this.setState({
                render_type:0
                , creditReport:this.props.navigation.state.params.creditReport
                , antiFraud:this.props.navigation.state.params.antiFraud
                , riskManage:this.props.navigation.state.params.riskManage
                , all:this.props.navigation.state.params.all
                , homeRent:this.props.navigation.state.params.homeRent
                , carPrice:this.props.navigation.state.params.carPrice
                , homePrice:this.props.navigation.state.params.homePrice

            })
        }else{
            this.setState({
                render_type:1
                , companyRiskManage:this.props.navigation.state.params.companyRiskManage
                , all:this.props.navigation.state.params.all
                , homeRent:this.props.navigation.state.params.homeRent
                , carPrice:this.props.navigation.state.params.carPrice
                , homePrice:this.props.navigation.state.params.homePrice
            });
            console.log(this.state)
        }

        this.fetchAddressData('');
    }


    constructor() {
        super();
        this.state = {
            identity:'',
            name:'',
            visible:false,

            //Modle标题
            modleTitle:{},

            slelctedHomeType:{caption:"请住宅类型", code:'0'},

            SelectData:undefined,

            //地址选择结果
            selectedAdd:[],

            //车辆属地选择结果
            selectedCarAddress:[],

            render_type:0,

            /*--------------------查个人-------------------------*/
            //个人信用报告
            creditReport:false,
            //反欺诈分析
            antiFraud:false,
            //个人风险概要
            riskManage:false,
            /*--------------------查个人-------------------------*/
            /*---------------------查企业----------------------------*/
            //个人风险概要
            companyRiskManage:false,
            /*---------------------查企业----------------------------*/

            /*----------------------共同参数---------------------------*/
            all:false,
            //房屋租金评估
            homeRent:false,
            //车辆售价评估
            carPrice:false,
            //房屋售价评估
            homePrice:false,
            /*----------------------共同参数---------------------------*/

           data:[],
            selected1:{code:''},
            selected2:{code:''},
            selected3:{code:''},
            isSelected_one:false,
            isSelected_two:false,
            isSelected_three:false,
            addVisible:false,

            isselect_home_add:false,
            isselect_car_add:false,

            /**------------------车型车系--------------------**/
            carData:[],
            selectedBradn:{caption:'请选择车品牌', code:"0"},

            selectedVehicles:{caption:'请选择车系', code:"0"},

            selectedCarModle:{caption:'请选择车型', code:"0"},

            //加载数据等待
            isLoading:true,

            /**--------------------------------------**/
            /*---------------新增数据-----------------*/
            peoplequality:{caption:"请选择", code:'0'},
            development:{caption:"请选择", code:'0'},
            finance:{caption:"请选择", code:'0'},
            performance:{caption:"请选择", code:'0'},
            caseinfo:{caption:"请选择", code:'0'},
            countrycompany:{caption:"请选择", code:'0'},
            companyhaoche:{caption:"请选择", code:'0'},
            companyoverdue:{caption:"请选择", code:'0'},
            userage:{caption:"请选择", code:'0'},
            education:{caption:"请选择", code:'0'},
            helathstate:{caption:"请选择", code:'0'},
            registered:{caption:"请选择", code:'0'},
            income:{caption:"请选择", code:'0'},
            percentage:{caption:"请选择", code:'0'},
            houseinfo:{caption:"请选择", code:'0'},
            marriage:{caption:"请选择", code:'0'},
            residence:{caption:"请选择", code:'0'},
            peoples:{caption:"请选择", code:'0'},
            employer:{caption:"请选择", code:'0'},
            work:{caption:"请选择", code:'0'},
            post:{caption:"请选择", code:'0'},
            creditcard:{caption:"请选择", code:'0'},
            quota:{caption:"请选择", code:'0'},
            use_year:{caption:"请选择", code:'0'},
            credit_lost:{caption:"请选择", code:'0'},
            personalhaoche:{caption:"请选择", code:'0'},
            personaloverdue:{caption:"请选择", code:'0'},
            personalcarcard:{caption:"请选择", code:'0'},
            crimehistory:{caption:"请选择", code:'0'},
            realestate:{caption:"请选择", code:'0'},
            familyknow:{caption:"请选择", code:'0'},
            backTime:{caption:"请选择", code:'0'}
        }
    }


    _render(){
        return(<ScrollView style={styles.container}>
            <View style={{width:winWidth, flexDirection:'column'}}>

                {this._renderloanInfo()}
                {this._renderCompanyInfo()}
                {this._renderCompanyCredit()}
                {this._renderPersionInfo()}
                {this._familyInfo()}
                {this._renderProfession()}
                {this._renderSelfCride()}
                {this._renderHaochedai()}
                {this._renderOther()}

                {this._renderCarInfo()}
                {this._renderHomeInfo()}
                {this._renderModle()}
                {this._renderAddModle()}


                <View style={{width:winWidth, justifyContent:'center', flexDirection:'row', marginTop:ScreenUtil.scaleSize(100), marginBottom:ScreenUtil.scaleSize(100)}}>

                    <TouchableOpacity style={{width:ScreenUtil.scaleSize(500), height:ScreenUtil.scaleSize(88), backgroundColor:GlobalStyles.themeColor, alignItems:'center',
                        justifyContent:'center', borderRadius:4}}
                                      onPress={()=>{this._checkInfo()}}>
                        <Text style={{fontSize:16, color:'#ffffff'}}>
                            立即查询
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>);
    }

    _renderCompanyInfo(){
        if(this.state.render_type == 1){
            return(<View style={{width:winWidth, flexDirection:'column',backgroundColor:'white'}}>

                {this._renderInputer(1.5, 2.5, '社会信用代码', '', (text)=>{fillinfo.companyId = text})}

                <View style={styles.line}/>

                {this._renderInputer(1.5, 2.5, '或输入企业名称', '', (text)=>{fillinfo.companyName = text})}

                <View style={styles.line}/>

                {this._renderlocalSelected(1.5, 2.5, '人员素质，管理水平，商誉', '',  SelectType.PEOPLEQUALITY, good_bad, this.state.peoplequality)}

                <View style={styles.line}/>

                {this._renderlocalSelected(1.5, 2.5, '发展能力和潜力指标', '',  SelectType.DEVELOPMENT, better_bad, this.state.development)}

                <View style={styles.line}/>

                {this._renderlocalSelected(1.5, 2.5, '财务指标状况', '',  SelectType.FINANCE, better_bad, this.state.finance)}

                <View style={styles.line}/>

                {this._renderlocalSelected(1.5, 2.5, '履约指标', '',  SelectType.PERFORMANCE, number, this.state.performance)}

                <View style={styles.line}/>

                <View style={styles.blank}></View>

            </View>);
        }

    }

    //企业信用
    _renderCompanyCredit(){
        if(this.state.render_type == 1){
            return(<View style={{width:winWidth, flexDirection:'column',  backgroundColor:'white'}}>
                {this._renderlocalSelected(1.5, 2.5, '有无作为被告或被执行人的设素案件信息', '',  SelectType.CASEINFO, has_no, this.state.caseinfo)}

                <View style={styles.line}/>

                {this._renderlocalSelected(1.5, 2.5, '国家企业信用信息公示系统内容', '',  SelectType.COUNTRYCOMPANY, has_no, this.state.countrycompany)}

                <View style={styles.line}/>

                {this._renderlocalSelected(3, 2.5, '是否使用过好车贷平台进行理财或者借款', '',  SelectType.COMPANYHAOCHE, yes_no, this.state.companyhaoche)}

                <View style={styles.line}/>

                {this._renderlocalSelected(3, 2.5, '在好车贷平台2年内是否曾有逾期记录', '', SelectType.COMPANYOVERDUE, yes_no, this.state.companyoverdue)}

                <View style={styles.line}/>

                {this._renderInputer(1.5, 2.5, '在好车贷款2年内预期次数', '', (text)=>{fillinfo.companyTime = text})}

                <View style={styles.blank}></View>

            </View>);
        }
    }


    //借款信息
    _renderloanInfo(){
        return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', marginTop:ScreenUtil.scaleSize(20)}}>

            {this._renderInputer(1.5, 2.5, '请填写借款金额', '', (text)=>{fillinfo.money = text})}

            <View style={styles.line}/>

            {this._renderlocalSelected(1.5, 2.5, "请填写借款期限", "请填写借款期限", SelectType.BACKTIME, backTime, this.state.backTime)}

            <View style={styles.line}/>

            <View style={styles.blank}></View>

        </View>);
    }



    _renderPersionInfo(){
        if(this.state.render_type == 0){
            return(
                <View style={{width:winWidth, flexDirection:'column', backgroundColor:'white',}}>

                    {this._renderInputer(1.5, 2.5, '请输入身份证号码', '', (text)=>{fillinfo.id = text})}

                    <View style={styles.line}/>

                    {this._renderInputer(1.5, 2.5, '请输入姓名', '', (text)=>{fillinfo.name = text})}

                    <View style={styles.line}/>

                    {this.state.antiFraud || this.state.all
                        ? this._renderInputer(1.5, 2.5, '请输入手机号', '', (text)=>{fillinfo.phoneNumber = text}) : <View/>}

                    <View style={styles.line}/>

                    {this._renderlocalSelected(1.5, 2.5, "用户年龄", "年龄", SelectType.USERAGE, age, this.state.userage)}


                    <View style={styles.line}/>

                    {this._renderlocalSelected(1.5, 2.5, "用户学历", "学历", SelectType.EDUCATION, education, this.state.education)}

                    <View style={styles.line}/>

                    {this._renderlocalSelected(1.5, 2.5, "健康状况", "健康状况", SelectType.HELATHSTATE, healthy, this.state.helathstate)}

                    <View style={styles.line}/>

                    {this._renderlocalSelected(1.5, 2.5, "户口状况", "户口", SelectType.REGISTERED, registered, this.state.registered)}

                    <View style={styles.line}/>

                    {this._renderlocalSelected(1.5, 2.5, "月收入状况", "月收入状况", SelectType.INCOME, income, this.state.income)}

                    <View style={styles.line}/>

                    {this._renderlocalSelected(3, 2.5, "月还款额度工资占比", "月工资占比", SelectType.PERCENTAGE, percentage, this.state.percentage)}

                    <View style={styles.line}/>

                    <View style={styles.blank}></View>
                </View>);
        }
    }


    //家庭情况
    _familyInfo(){
        if(this.state.render_type == 0){
            return(
                <View style={{markTimewidth:winWidth, flexDirection:'column', backgroundColor:'white', }}>

                    {this._renderlocalSelected(1.5, 2.5, "住房情况", "住房情况", SelectType.HOUSEINFO, houseInfo, this.state.houseinfo)}

                    <View style={styles.line}/>
                    {this._renderlocalSelected(1.5, 2.5, "婚姻状况", "婚姻状况", SelectType.MARRIAGE, marriage, this.state.marriage)}

                    <View style={styles.line}/>
                    {this._renderlocalSelected(1.5, 2.5, "目前居住地址时间", "目前居住地址时间", SelectType.RESIDENCE, residence, this.state.residence)}

                    <View style={styles.line}/>
                    {this._renderlocalSelected(1.5, 2.5, "供养人口", "供养人口", SelectType.PEOPLES, peoples, this.state.peoples)}

                    <View style={styles.line}/>
                    <View style={styles.blank}></View>
                </View>);
        }
    }

    //职业情况

    _renderProfession(){
        if(this.state.render_type == 0){
            return(<View View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', }}>
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "单位性质", "单位性质", SelectType.EMPLOYER, employer, this.state.employer)}
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "工作年限", "工作年限", SelectType.WORK, work, this.state.work)}
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "公司职位", "公司职位", SelectType.POST, post, this.state.post)}
                <View style={styles.line}/>
                <View style={styles.blank}></View>
            </View>);
        }
    }

    //个人信用
    _renderSelfCride(){
        if(this.state.render_type == 0){
            return(<View View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', }}>
                <View style={styles.line}/>
                {this._renderlocalSelected(2.5, 2.5, "月均信用卡使用频率", "月均信用卡使用频率", SelectType.CREDITCARD, creditCard, this.state.creditcard)}
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "信用卡额度", "信用卡额度", SelectType.QUOTA, quota, this.state.quota)}
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "信用卡使用年数", "信用卡使用年数", SelectType.USE_YEAR, use_year, this.state.use_year)}
                <View style={styles.line}/>
                {this._renderlocalSelected(2.5, 2.5, "信用卡年度逾期失信记录", "逾期失信记录", SelectType.CREDIT_LOST, credit_lost, this.state.credit_lost)}
            </View>);
        }
    }
    //个人好车贷
    _renderHaochedai(){
        if(this.state.render_type == 0){
            return(<View View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', }}>
                <View style={styles.line}/>
                {this._renderlocalSelected(4, 2.5, "是否使用过好车贷平台进行理财或者借款", "有无借款", SelectType.PERSONALHAOCHE, has_no, this.state.personalhaoche)}
                <View style={styles.line}/>
                {this._renderlocalSelected(4, 2.5, "好车贷平台2年内是否曾有逾期记录", "是否逾期", SelectType.PERSONALOVERDUE, yes_no, this.state.personaloverdue)}
                <View style={styles.line}/>
                <View style={styles.blank}></View>
            </View>);
        }
    }
    //其他
    _renderOther(){
        if(this.state.render_type == 0){
            return(<View View style={{width:winWidth, flexDirection:'column', backgroundColor:'white', }}>
                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "非本地牌照", "牌照", SelectType.PERSONALCARCARD, car_card, this.state.personalcarcard)}
                <View style={styles.line}/>
                {this._renderlocalSelected(3, 2.5, "3年内有经济犯罪历史", "经济犯罪历史", SelectType.CRIMEHISTORY, yes_no, this.state.crimehistory)}
                <View style={styles.line}/>
                {this._renderInputer(3, 2.5, '在好车贷2年内逾期次数', '', (text)=>{fillinfo.personTime = text})}
                <View style={styles.line}/>
                {this._renderlocalSelected(5, 2.5, "个人名下可变现金融资产大于等于汽车估价的80%", "", SelectType.REALESTATE, yes_no, this.state.realestate)}
                <View style={styles.line}/>
                {this._renderlocalSelected(2, 2.5, "家庭成员是否知情", "", SelectType.FAMILYKNOW, yes_no, this.state.familyknow)}
                <View style={styles.line}/>
                <View style={styles.blank}></View>
            </View>);
        }
    }


    _renderHomeInfo(){

        if(this.state.all || (this.state.homeRent || this.state.homePrice)){
            return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            房屋所在区域：
                        </Text>
                    </View>
                    <View style={{flex:2.5, flexDirection:'row'}}>
                        <TouchableOpacity  style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_home_add:true, isselect_car_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>{
                                this.state.selectedAdd.length == 0?
                                '请选择': this.state.selectedAdd[0].code == this.state.selectedAdd[1].code?
                                    this.state.selectedAdd[0].caption:this.state.selectedAdd[1].code == this.state.selectedAdd[2].code?
                                        this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption
                                        : this.state.selectedAdd[0].caption + this.state.selectedAdd[1].caption + this.state.selectedAdd[2].caption}</Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.line}/>

                {this._renderInputer(1.5, 2.5, '请输入房屋名称', '', (text)=>{fillinfo.homeName = text})}

                <View style={styles.line}/>
                {this._renderlocalSelected(1.5, 2.5, "请选择房屋类型", "请选择房屋类型", SelectType.HOMETYPE, homeType, this.state.slelctedHomeType)}
                <View style={styles.line}/>

                {this._renderInputer(1.5, 2.5, '请输入房屋面积', '', (text)=>{fillinfo.homeMeasure = text})}

                <View style={styles.line}/>

                <View style={styles.blank}></View>

            </View>);
        }

    }

    /**
     *
     * @param infoflex
     * @param inputflex
     * @param info
     * @param defaultvalue
     * @param inputmsg 输入信息保存变量
     * @returns {XML}
     * @private
     */
    _renderInputer(infoflex, inputflex, info, defaultvalue, inputmsg){
        return(<View style={styles.item_view}>
            <View style={{flex:infoflex, flexDirection:'row'
                , alignItems:'center'}}>
                <Text style={{}}>
                    {info + ':'}
                </Text>
            </View>
            <View style={{flex:inputflex}}>
                <TextInput
                    style={styles.edit}
                    underlineColorAndroid='transparent'
                    placeholder={defaultvalue}
                    onChangeText={inputmsg}/>
            </View>
        </View>);
    }

    /**
     *
     * @param infoflex 展示信息比例 ex2.5：
     * @param selectedflex 选择框比例
     * @param info 展示信息
     * @param modleTitle 选择弹框标题
     * @param selectedType 选择类型
     * @param dataSource 选择弹框数据源
     * @param selectedValue 展示的值
     * @returns {XML}
     * @private
     */
    _renderlocalSelected(infoflex, selectedflex,  info, modleTitle, selectedType, dataSource, selectedValue){
        return(<View style={styles.item_view}>
            <View style={{flex:infoflex, flexDirection:'row'
                , alignItems:'center'}}>
                <Text style={{}}>
                    {info + ':'}
                </Text>
            </View>
            <View style={{flex:selectedflex, flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>{this.setState({visible:!this.state.visible, modleTitle:{"title":modleTitle, "type":selectedType}, carData:dataSource, isLoading:false})}}
                    style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                    <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{selectedValue.caption}</Text>
                    <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                </TouchableOpacity>
            </View>

        </View>)
    }

    _choeseCarVehicles(){
        this.fetcheCarSeries('&parentCode=' + this.state.selectedBradn.code)
        this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车系", "type":SelectType.VEHICLES},})
    }

    _choeseCarModle(){
        this.fetchCarModel('&parentCode=' + this.state.selectedVehicles.code)
        this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车型号", "type":SelectType.CARMODLE},})
    }

    _renderCarInfo(){
        if(this.state.all || this.state.carPrice){
            return(<View style={{width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={{ width:winWidth,
                    flexDirection:'column',
                    height:ScreenUtil.scaleSize(300),
                    justifyContent:'center',
                    paddingLeft:ScreenUtil.scaleSize(30),
                    paddingRight:ScreenUtil.scaleSize(30)}}>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}>
                            <Text style={{}}>
                                请选择车型：
                            </Text>
                        </View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({isLoading:true})
                                    this.setState({visible:!this.state.visible, modleTitle:{"title":"请选择车辆品牌", "type":SelectType.BRAND}})
                                ; this.fetchCarBrand()}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:ScreenUtil.scaleSize(2), borderColor:"white", flexDirection:'row'
                                    , justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{this.state.selectedBradn.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({isLoading:true})
                                    this.state.selectedBradn.code == '0'?
                                    this._showToast('请选择车牌'):this._choeseCarVehicles()}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:ScreenUtil.scaleSize(2), borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:15, color:'#999999'}}>{this.state.selectedVehicles.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1.5, flexDirection:'row', alignItems:'center'}}></View>
                        <View style={{flex:2.5, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({isLoading:true})
                                    this.state.selectedVehicles.code == '0'?
                                        this._showToast('请选择车系'):this._choeseCarModle()}}
                                style={{flex:1, marginRight:ScreenUtil.scaleSize(20), borderWidth:1, borderColor:"white"
                                    , flexDirection:'row', justifyContent:'flex-end', alignItems:'center', backgroundColor:'white'}}>
                                <Text style={{fontSize:ScreenUtil.scaleSize(30), color:'#999999'}}>{this.state.selectedCarModle.caption}</Text>
                                <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}/>

                </View>

                {this._renderInputer(1.5, 2.5, '请选择上市时间', '上市时间如：2018', (text)=>{fillinfo.markTime = text})}

                <View style={styles.line}/>


                <View style={styles.item_view}>
                    <View style={{flex:1.5, flexDirection:'row'
                        , alignItems:'center'}}>
                        <Text style={{}}>
                            请选择车辆属地：
                        </Text>
                    </View>
                    <View style={{flex:2.5, flexDirection:'row'}}>
                        <TouchableOpacity  style={{flex:1, marginRight:ScreenUtil.scaleSize(20), flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}
                                           onPress={()=>{this.setState({addVisible:true, isselect_car_add:true, isselect_home_add:false})}}>
                            <Text style={{fontSize:15, color:'#999999'}}>
                                {this.state.selectedCarAddress.length == 0?
                                    '请选择': this.state.selectedCarAddress[0].code == this.state.selectedCarAddress[1].code?
                                        this.state.selectedCarAddress[0].caption:this.state.selectedCarAddress[1].code == this.state.selectedCarAddress[2].code?
                                        this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption
                                            : this.state.selectedCarAddress[0].caption + this.state.selectedCarAddress[1].caption + this.state.selectedCarAddress[2].caption}
                                </Text>
                            <Image style={{width:ScreenUtil.scaleSize(20), height:ScreenUtil.scaleSize(20)}} source={require('../../imgResouce/backicon.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.line}/>

                {this._renderInputer(1.5, 2.5, '请输入行车里程', '', (text)=>{fillinfo.carMileage = text})}

                <View style={styles.line}/>

                <View style={styles.blank}></View>

            </View>);
        }

    }

    _addressonChange(value){
        console.log(value);
        this.setState({ selectedAdd: value });
    };

    _dataOnChange(value){
        console.log("valuse For Data==>" + value)
        this.setState({SelectData:value});
    }

    _onCloseModle(){
        this.setState({
            visible:false
        });
    }

    _renderLoadingView() {
        return (
            <View style={{height:winHeight - ScreenUtil.scaleSize(60) , width:winWidth-ScreenUtil.scaleSize(50)
                , backgroundColor:'white', flexDirection:'column', alignItems:'center', borderRadius: ScreenUtil.scaleSize(16), justifyContent:'center'}}>
                <View style={{width:winWidth, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator
                        animating={true}
                        color='red'
                        size="large"
                    />
                </View>
            </View>
        );
    }



    _renderModle(){
        return(
            <Modal visible={this.state.visible}transparent={true}>

                <TouchableOpacity style={{flex:1, flexDirection:'column'
                    , justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.4)'}}onPress={()=>{this._onCloseModle()}}>

                    {this.state.isLoading?this._renderLoadingView():<View style={{maxHeight:winHeight - ScreenUtil.scaleSize(60), width:winWidth-ScreenUtil.scaleSize(50)
                        , backgroundColor:'white', flexDirection:'column', alignItems:'center', borderRadius: ScreenUtil.scaleSize(16),}}>
                        <View style={{width:winWidth, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{marginTop:ScreenUtil.scaleSize(30), marginBottom:ScreenUtil.scaleSize(30)}}>
                                {this.state.modleTitle.title}
                            </Text>
                        </View>
                        <View style={styles.line}/>
                        <FlatList style={{width:winWidth - ScreenUtil.scaleSize(40)}}
                            data={this.state.carData}
                            renderItem={({item}) => this._renderItem(item)}
                            ItemSeparatorComponent={this._separator}/>

                    </View>}

                </TouchableOpacity>

        </Modal>);
    }


    _renderAddModle(){
        return(<Modal
            transparent={true}
            visible={this.state.addVisible}>
            {this._renderAddress()}
        </Modal>);
    }



    _selectedInfo(item){
        switch (this.state.modleTitle.type){
            case SelectType.BRAND:
                this.setState({selectedBradn:item, selectedVehicles:{caption:'请选择车系', code:"0"}, selectedCarModle:{caption:'请选择车型',code:"0"}})
                break;
            case SelectType.CARMODLE:
                this.setState({selectedCarModle:item})
                break;
            case SelectType.VEHICLES:
                this.setState({selectedVehicles:item, selectedCarModle:{caption:'请选择车型',code:"0"}})
                break;
            case SelectType.HOMETYPE:
                this.setState({slelctedHomeType:item})
                break;

            case SelectType.PEOPLEQUALITY:
                this.setState({peoplequality:item})
                break;

            case SelectType.DEVELOPMENT:
                this.setState({development:item})
                break;

            case SelectType.FINANCE:
                this.setState({finance:item})
                break;

            case SelectType.PERFORMANCE:
                this.setState({performance:item})
                break;

            case SelectType.CASEINFO:
                this.setState({caseinfo:item})
                break;

            case SelectType.COUNTRYCOMPANY:
                this.setState({countrycompany:item})
                break;

            case SelectType.COMPANYHAOCHE:
                this.setState({companyhaoche:item})
                break;

            case SelectType.COMPANYOVERDUE:
                this.setState({companyoverdue:item})
                break;

            case SelectType.USERAGE:
                this.setState({userage:item})
                break;

            case SelectType.EDUCATION:
                this.setState({education:item})
                break;

            case SelectType.HELATHSTATE:
                this.setState({helathstate:item})
                break;

            case SelectType.REGISTERED:
                this.setState({registered:item})
                break;

            case SelectType.INCOME:
                this.setState({income:item})
                break;
            case SelectType.PERCENTAGE:
                this.setState({percentage:item})
                break;
            case SelectType.HOUSEINFO:
                this.setState({houseinfo:item})
                break;
            case SelectType.MARRIAGE:
                this.setState({marriage:item})
                break;
            case SelectType.RESIDENCE:
                this.setState({residence:item})
                break;
            case SelectType.PEOPLES:
                this.setState({peoples:item})
                break;
            case SelectType.EMPLOYER:
                this.setState({employer:item})
                break;

            case SelectType.WORK:
                this.setState({work:item})
                break;
            case SelectType.POST:
                this.setState({post:item})
                break;

            case SelectType.CREDITCARD:
                this.setState({creditcard:item})
                break;
            case SelectType.QUOTA:
                this.setState({quota:item})
                break;
            case SelectType.USE_YEAR:
                this.setState({use_year:item})
                break;
            case SelectType.CREDIT_LOST:
                this.setState({credit_lost:item})
                break;
            case SelectType.PERSONALHAOCHE:
                this.setState({personalhaoche:item})
                break;
            case SelectType.PERSONALOVERDUE:
                this.setState({personaloverdue:item})
                break;
            case SelectType.PERSONALCARCARD:
                this.setState({personalcarcard:item})
                break;

            case SelectType.CRIMEHISTORY:
                this.setState({crimehistory:item})
                break;
            case SelectType.REALESTATE:
                this.setState({realestate:item})
                break;
            case SelectType.FAMILYKNOW:
                this.setState({familyknow:item})
                break;
            case SelectType.BACKTIME:
                this.setState({backTime:item});


        }
        this._onCloseModle();
    }

    _renderItem(item){
        console.log("item: " + JSON.stringify(item))
        return(
            <TouchableOpacity onPress={()=>{this._selectedInfo(item)}}>
                <View style={styles.item}>
                    <Text>{item.caption}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**-------------------------------------------------------------------------------------------------------**/
    _renderAddress(){
        return(<View style={{flex:1,flexDirection:'column', backgroundColor:'rgba(0, 0, 0, 0.4)'}}>
            <TouchableOpacity style={{flex:3}} onPress={()=>{this.setState({addVisible:false,});}}></TouchableOpacity>
            {this.state.isLoading?<View style={{flex:7, width:winWidth, flexDirection:'column'
                , backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
                    <ActivityIndicator
                        animating={true}
                        color='red'
                        size="large"
                    />
            </View>:
                <View style={{flex:7, width:winWidth, flexDirection:'column', backgroundColor:'white'}}>
                <View style={{flex:1,width:winWidth, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text>请选择地址</Text>
                </View>
                <View style={styles.line}/>
                <View style={{flex:1,width:winWidth, flexDirection:'row', alignItems:'center', justifyContent:'center',}}>
                    <TouchableOpacity style={{flex:1, paddingLeft:ScreenUtil.scaleSize(20)}}
                                      onPress={()=>{this.fetchAddressData(''), this.setState({isSelected_one:false, isSelected_two:false, isSelected_three:false, isLoading:true})}}>
                        {this.state.isSelected_one?<Text>{this.state.selected1.caption}</Text>:<Text>请选择</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.isSelected_two} style={{flex:1,  paddingLeft:ScreenUtil.scaleSize(20)}}
                                      onPress={()=>{this.fetchAddressData('&parentCode=' + this.state.selected1.code),
                                          this.setState({isSelected_two:false, isSelected_three:false,isLoading:true})}}>
                        {this.state.isSelected_one?this.state.isSelected_two?<Text>{this.state.selected2.caption}</Text>:<Text>请选择</Text>:<Text/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1 , paddingLeft:ScreenUtil.scaleSize(20)}} disabled={!this.state.isSelected_three}
                                      onPress={()=>{this.fetchAddressData('&parentCode=' + this.state.selected2.code);
                                      this.setState({isSelected_three:false,isLoading:true})}}>
                        {this.state.isSelected_one && this.state.isSelected_two? this.state.isSelected_three?<Text>{this.state.selected3.caption}</Text>:<Text>请选择</Text>:<Text/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
                <View style={{flex:8}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item})=><TouchableOpacity onPress={()=>{this._choseItem(item)}}>
                            <View style={{width:winWidth,flexDirection:'row', alignItems:'center'}}>
                                <Text style={{paddingTop:ScreenUtil.scaleSize(20), paddingBottom:ScreenUtil.scaleSize(20), paddingLeft:ScreenUtil.scaleSize(20)}}>{item.caption}</Text>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>

            </View>}
        </View>);
    }


    _separator(){
        return <View style={{height:ScreenUtil.scaleSize(1),backgroundColor:'#f7f7f7'}}/>;
    }

    _choseItem(item){

        var item1, item2, item3

        if(this.state.isSelected_one){
            if(this.state.isSelected_two){
                if(this.state.isSelected_three){
                    item1 = this.state.selected1;
                    item2 = this.state.selected2
                    item3 = item;
                    this.setState({
                        selected3:item,
                        isSelected_three:true,
                        addVisible:false,
                    });
                    if(this.state.isselect_home_add){
                        this.setState({selectedAdd:[item1, item2, item3]});
                    }
                    if(this.state.isselect_car_add){
                        this.setState({selectedCarAddress:[item1, item2, item3]});
                    }
                }else{
                    item2 = this.state.selected2
                    item1 = this.state.selected1;
                    item3 = item;
                    this.setState({
                        selected3:item,
                        isSelected_three:true,
                        addVisible:false,
                    });
                    if(this.state.isselect_home_add){
                        this.setState({selectedAdd:[item1, item2, item3]});
                    }
                    if(this.state.isselect_car_add){
                        this.setState({selectedCarAddress:[item1, item2, item3]});
                    }
                }
            }else{
                this.setState({
                    selected2:item,
                    isSelected_two:true,
                    isSelected_three:false,
                });
                this.fetchAddressData('&parentCode=' + item.code)
            }
        }else{
            this.setState({
                selected1:item,
                isSelected_one:true,
                isSelected_two:false,
                isSelected_three:false,
            });
            this.fetchAddressData('&parentCode=' + item.code)
        }
    }

    /**-------------------------------------------------------------------------------------------------------**/

    _checkInfo(){

        fillinfo.backTime = this.state.backTime.code;

        fillinfo.peoplequality = this.state.peoplequality.code;
        fillinfo.development = this.state.development.code;
        fillinfo.finance = this.state.finance.code;
        fillinfo.performance = this.state.performance.code;
        fillinfo.caseinfo = this.state.caseinfo.code;
        fillinfo.countrycompany = this.state.countrycompany.code;
        fillinfo.companyhaoche = this.state.companyhaoche.code;
        fillinfo.companyoverdue = this.state.companyoverdue.code;
        fillinfo.userage = this.state.userage.code;
        fillinfo.education = this.state.education.code;
        fillinfo.helathstate = this.state.helathstate.code;
        fillinfo.registered = this.state.registered.code;
        fillinfo.income = this.state.income.code;
        fillinfo.percentage = this.state.percentage.code;
        fillinfo.houseinfo = this.state.houseinfo.code;
        fillinfo.marriage = this.state.marriage.code;
        fillinfo.residence = this.state.residence.code;
        fillinfo.peoples = this.state.peoples.code;
        fillinfo.employer = this.state.employer.code;
        fillinfo.work = this.state.work.code;
        fillinfo.post = this.state.post.code;
        fillinfo.creditcard = this.state.creditcard.code;
        fillinfo.quota = this.state.quota.code;
        fillinfo.use_year = this.state.use_year.code;
        fillinfo.credit_lost = this.state.credit_lost.code;
        fillinfo.personalhaoche = this.state.personalhaoche.code;
        fillinfo.personaloverdue = this.state.personaloverdue.code;
        fillinfo.personalcarcard = this.state.personalcarcard.code;
        fillinfo.crimehistory = this.state.crimehistory.code;
        fillinfo.realestate = this.state.realestate.code;
        fillinfo.familyknow = this.state.familyknow.code;


        var tag;

        if(this.state.render_type == 0){
            if(this.state.all){
                fillinfo.typeTag = 'PERSON_RISK,PERSON_CREDIT,3,4,5,6'
            }else {
                tag = [];
                if (this.state.creditReport) tag.push('PERSON_RISK');
                if (this.state.antiFraud) tag.push('PERSON_CREDIT');
                if (this.state.riskManage) tag.push('3');
                if(this.state.homeRent)tag.push('4');
                if(this.state.carPrice)tag.push('5');
                if(this.state.homePrice)tag.push('6');
                for(i = 0; i < tag.length; i++){
                    fillinfo.typeTag += tag[i];
                    fillinfo.typeTag += ',';
                }
            }

        }else {
            if (this.state.all) {
                fillinfo.typeTag = '7,8,9,10'
            } else {
                tag = [];
                if (this.state.companyRiskManage) tag.push('7');
                if (this.state.homeRent) tag.push('8');
                if (this.state.carPrice) tag.push('9');
                if (this.state.homePrice) tag.push('10');
                for (i = 0; i < tag.length; i++) {
                    fillinfo.typeTag += tag[i];
                    fillinfo.typeTag += ',';
                }
            }
        }

        if(fillinfo.money == ''){
            this._showToast('请选择借款金额');
            return;
        }

        if(fillinfo.backTime == '0'){
            this._showToast('请选择还款日期');
            return;
        }


        var data = new Date();

        console.log(fillinfo);
        if(this.state.render_type == 1){
            var orgCode = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;

            if (orgCode.test(fillinfo.companyId) || fillinfo.companyName == '') {
                this._showToast("企业社会信用代码输入错误！")
                return;
            }
        }

        if(this.state.render_type == 0 ){
            var certNo =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!certNo.test(fillinfo.id)){
                this._showToast('请输入正确的身份证');
                return;
            }
            var userName = /^[\u4e00-\u9fa5]{2,4}$/;
            if(!userName.test(fillinfo.name)){
                this._showToast('请输入正确的姓名');
                return;
            }
        }
        if(this.state.render_type == 0){
            if((this.state.antiFraud || this.state.all)){
                var re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
                if(!re.test(fillinfo.phoneNumber)){
                    this._showToast('请输入正确的电话号码')
                    return;
                }
            }
        }

        if(this.state.carPrice || this.state.all){


            fillinfo.carBrand = this.state.selectedBradn.code;
            fillinfo.carVs = this.state.selectedVehicles.code;
            fillinfo.carModle = this.state.selectedCarModle.code;

            if(this.state.selectedCarAddress.length > 1){
                fillinfo.carAdd = this.state.selectedCarAddress[0].code + ',' + this.state.selectedCarAddress[1].code;
            }

            if(fillinfo.carBrand == '0'){
                this._showToast('请选择车品牌')
                return;
            }
            if(fillinfo.carVs == '0'){
                this._showToast('请选择车系')
                return;
            }
            if(fillinfo.carModle == '0'){
                this._showToast('请选择车型号')
                return;
            }

            if(fillinfo.markTime == ''){
                this._showToast("请输入正确车辆上市的年份")
                return;
            }else{
                var licenseDate = /^\d{4}$/;
                if(!licenseDate.test(fillinfo.markTime)){
                    this._showToast("请输入正确车辆上市的年份")
                    return;
                }else if(1886 > Number.parseInt(fillinfo.markTime) || Number.parseInt(fillinfo.markTime) > data.getFullYear().valueOf()){
                    this._showToast("请输入正确车辆上市的年份")
                    console.log(Number.parseInt(fillinfo.markTime));
                    return;
                }
            }

            if(fillinfo.carMileage == ''){
                this._showToast("请输入正确的行驶里程")
                return;
            }else{
                var mileage = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
                if(!mileage.test(fillinfo.carMileage)){
                    this._showToast("请输入正确的行驶里程")
                    return;
                }else if(100 > Number.parseInt(fillinfo.carMileage) || Number.parseInt(fillinfo.carMileage) > 800000){
                    this._showToast("请输入正确的行驶里程")
                    return;
                }
            }

            if(fillinfo.carAdd == ''){
                this._showToast('请选择车辆属地')
                return;
            }
        }

        if(this.state.homeRent || this.state.homePrice || this.state.all){
            if(this.state.selectedAdd.length > 2){
                fillinfo.homeAdd = this.state.selectedAdd[0].code + ',' + this.state.selectedAdd[1].code + ',' + this.state.selectedAdd[2].code;
            }
            fillinfo.hometype = this.state.slelctedHomeType.code;

            var houseSize = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
            if(!houseSize.test(fillinfo.homeMeasure)){
                this._showToast("请输入正确的房屋面积")
                return;
            }
            if(fillinfo.homeAdd == ''){
                this._showToast('请输入房屋属地')
                return;
            }
            if(fillinfo.homeName == ''){
                this._showToast('请输入房屋名称')
                return;
            }
            if(fillinfo.hometype == '' || fillinfo.hometype == '0'){
                this._showToast('请选择房屋类型')
                return;
            }

        }


        var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;



        // this.props.navigation.navigate('WebViewCommunication', {
        //
        // });
        RNCalliOSAction.calliOSActionWithOneParams(fillinfo);
        this.props.navigation.goBack()
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7'
    },

    edit: {
        height: ScreenUtil.scaleSize(80),
        flex:1,
        backgroundColor: '#fff',
        marginRight: ScreenUtil.scaleSize(20)
    },
    item:{
        marginTop:ScreenUtil.scaleSize(10),
        marginBottom:ScreenUtil.scaleSize(10),
        width:winWidth - ScreenUtil.scaleSize(40),
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        width:winWidth,
        height:ScreenUtil.scaleSize(2),
        backgroundColor:'#f7f7f7'
    },
    item_view:{
        width:winWidth,
        flexDirection:'row',
        height:ScreenUtil.scaleSize(100),
        justifyContent:'center',
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30)
    },
    blank:{
        width:winWidth,
        height:ScreenUtil.scaleSize(30),
        backgroundColor:'#f7f7f7'
    }
});