import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes} from 'react-native'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
}
export const canfreshState = {
    cannot: 0,
    can: 1,
}


const DEBUG = true
const log = (text: string) => {DEBUG && console.log(text)}

type Props = {
    refreshState: number,
    canfreshState:number,
    onHeaderRefresh: Function,
    onFooterRefresh?: Function,
    data: Array<any>,
    footerContainerStyle?: ViewPropTypes.style,
    footerTextStyle?: ViewPropTypes.style,
    ListEmptyViewStyle?:ViewPropTypes.style,
    listRef?: any,
    footerRefreshingText?: string,
    footerFailureText?: string,
    footerNoMoreDataText?: string,

    renderItem: Function,
}

type State = {

}

class RefreshListView extends PureComponent<Props, State> {

    static defaultProps = {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
    }

    componentWillReceiveProps(nextProps: Props) {
        log('WillReceiveProps接受的props' + nextProps.refreshState+ nextProps)
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        log('tDidUpdate' + prevProps.refreshState+prevProps,prevState)
    }

    onHeaderRefresh = () => {


        if (this.shouldStartHeaderRefreshing()) {
            log('即将开始下拉刷新')


            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onEndReached = (info: {distanceFromEnd: number}) => {
        log('[RefreshListView]  onEndReached   ' + info.distanceFromEnd)

        if (this.shouldStartFooterRefreshing()) {
            log('[RefreshListView]  onFooterRefresh')
            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing = () => {
        log('[RefreshListView]  shouldStartHeaderRefreshing')

        if (this.props.refreshState == RefreshState.HeaderRefreshing ||
            this.props.refreshState == RefreshState.FooterRefreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing = () => {
        log('[RefreshListView]  shouldStartFooterRefreshing')
        console.log('变量值'+this.props.canfreshState)
        if(this.props.canfreshState == 1){

            let {refreshState, data} = this.props
            if (data.length == 0) {
                return false
            }

            return (refreshState == RefreshState.Idle)
        }
       return false
    }

    render() {
        log('[RefreshListView]  render')

        let {renderItem, ...rest} = this.props

        return (
            <FlatList
                ref={this.props.listRef}
                onEndReached={this.onEndReached}
                onRefresh={this.onHeaderRefresh}
                refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.1}
                ListEmptyComponent={this.renderEmpty}
                renderItem={renderItem}

                {...rest}
            />
        )
    }
    renderEmpty = ()=>{
        let empty = null
        let emptyStyle = [styles.empty, this.props.ListEmptyViewStyle]
        empty = (
            <View style={emptyStyle}>
                <Text style={{ fontSize: 14,
                    color: '#555555'}}>没有数据</Text>
            </View>
        )
        return empty
    }

    renderFooter = () => {
        let footer = null

        let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
        let {footerRefreshingText, footerFailureText, footerNoMoreDataText} = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View style={footerContainerStyle} />)
                break
            case RefreshState.Failure: {
                footer = (
                    <TouchableOpacity
                        style={footerContainerStyle}
                        onPress={() => {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
                    >
                        <Text style={footerTextStyle}>{footerFailureText}</Text>
                    </TouchableOpacity>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = (
                    <View style={footerContainerStyle} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = (
                    <View style={footerContainerStyle} >
                        <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    },
    empty:{
        // marginTop:100,
        // backgroundColor: 'red',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default RefreshListView
