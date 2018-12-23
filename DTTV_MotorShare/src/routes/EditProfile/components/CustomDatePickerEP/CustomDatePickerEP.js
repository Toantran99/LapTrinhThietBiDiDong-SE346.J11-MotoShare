import React,{Component} from 'react'
import {} from 'react-native'
import {TouchableOpacity} from "react-native";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text} from "react-native";
import {styles} from "./Styles";


export  default  class CustomDatePickerEP extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.txMain, this.props.styleInput]}>
                    <View style={styles.txSection}>
                        <Icon name={this.props.IconName} size={16} color={'#ffffff'} />
                        <Text style={styles.textStyle}>{this.props.NS}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}