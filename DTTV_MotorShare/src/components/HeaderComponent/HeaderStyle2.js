import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import { Actions } from "react-native-router-flux";

export default class HeaderStyle2 extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
        <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff'}}>
            <View style={styles.backSection}>
                <TouchableOpacity onPress={this.props.action}> 
                    <Image source={require('../../assets/image/back.png')} style={styles.iconBack}/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>Tài khoản</Text>
            </View>
            <View style={styles.iconUserSection}>
                <TouchableOpacity>
                    <Image source={require('../../assets/image/user_icon.png')} style={styles.iconBack}/>
                </TouchableOpacity>
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

// export default HeaderStyle2;