import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'
import iconDb from './iconDb'
import PropTypes from 'prop-types'

const defaultIcon = iconDb[8]

const styles = StyleSheet.create({
    contentStyle: {
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 16,
        marginLeft: 3
    }
})

class CheckBox extends PureComponent {

    static propTypes = {
        style: ViewPropTypes.style,
        onChange: PropTypes.func.isRequired,
        checked: PropTypes.bool,
        labelPosition: PropTypes.string,
        labelStyle: Text.propTypes.style,
        iconName: PropTypes.string,
        iconStyle: ViewPropTypes.style,
        iconSize: PropTypes.number,
        checkedColor: PropTypes.string,
        uncheckedColor: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        checked: false,
        labelPosition: 'right',
        labelStyle: styles.labelStyle,
        iconName: 'matCircleEdge',
        iconStyle: {},
        iconSize: 30,
        checkedColor: '#464646',
        uncheckedColor: '#464646',
    };

    componentWillMount() {
        this.setState({
            checked: this.props.checked
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            checked: props.checked
        })
    }

    _onChange() {
        const newVal = !this.state.checked
        const { onChange } = this.props
        this.setState({ checked:newVal }, () => {
            onChange(newVal)
        })
    }

    _renderIcon(iconName) {

        const { iconSize, iconStyle, checkedColor, uncheckedColor } = this.props
        const checked = this.state.checked
        const index = iconDb.findIndex(i => i.iconName === iconName)

        if (index !== -1) {
            defaultIcon = iconDb[index]
        }

        const { component: Icon, checkedIconName, uncheckedIconName } = defaultIcon

        return (
            <Icon
                name={checked ? checkedIconName : uncheckedIconName}
                size={iconSize}
                color={checked ? checkedColor : uncheckedColor}
                style={iconStyle}
            />
        )
    }

    _renderContent() {

        const { labelPosition, labelStyle, label, iconName } = this.props
        const flexDirection = labelPosition === 'left' ? 'row-reverse' : 'row'

        return (
            <View style={[styles.contentStyle, { flexDirection }]}>
                {this._renderIcon.call(this, iconName)}
                {
                    label ?
                        <Text style={labelStyle}>{label}</Text>
                        : null
                }
            </View>
        )
    }

    render() {
        const { style } = this.props
        return (
            <TouchableOpacity
                onPress={this._onChange.bind(this)}
                style={style}
            >
                {this._renderContent.call(this)}
            </TouchableOpacity>
        )
    }
}

export default CheckBox
