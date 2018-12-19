import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import { Actions } from "react-native-router-flux";

export default class HeaderStyle3 extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff'}}>
                <View style={styles.backSection}>
                    <TouchableOpacity onPress={this.props.action}>
                        <Image source={this.props.imageUrl} style={styles.iconBack}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.textHeader}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backSection:{
        width: 11+"%",
        height: 100+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconUserSection:{
        width: 10+"%", height:100+"%",justifyContent: 'center', alignItems: 'center'
    },
    iconBack:{
        width: 20, height: 20,
    },
    titleBar:{
        flex:1,justifyContent: 'center'
    },
    textHeader:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#2699FB'
    },
});
