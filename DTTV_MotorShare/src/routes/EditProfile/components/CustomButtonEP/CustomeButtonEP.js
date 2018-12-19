import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from './Styles'

export default class ButtonCustomEP extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.customButtonStyle, this.props.styleBtn]}>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
