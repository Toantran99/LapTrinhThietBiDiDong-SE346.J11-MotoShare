import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, StatusBar} from 'react-native'
var Spinner = require("react-native-spinkit");
import { Actions } from "react-native-router-flux";


export default class SplashScreen extends Component{


    componentDidMount(){
        // 5 seconds bebore move to different screen
        this.timeoutHandle = setTimeout(()=>{
            Actions.introduction({type:"reset"});
        }, 5000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle);
    }

    render(){
        return(
            <ImageBackground source={require('../../../assets/image/bg-splash.png')} style={{flex:1}}>
                <StatusBar hidden={true} barStyle={'light-content'}/>
                <View style={styles.logoSection}>
                    <Image source={require('../../../assets/image/Logo.png')} style={styles.logo} />
                </View>

                <View style={styles.nameAppSection}>
                    <Text style={styles.nameApp}>MotoShare</Text>
                    <Text style={styles.sloganApp}>Chia sẻ chuyến đi</Text>
                </View>


                <View style={styles.verSection}>
                    <Text style={styles.verText}>version 0.1.1</Text>
                </View>

            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    logoSection:{
        width: 100+"%",
        height: 134,
        alignItems: 'center',
        marginTop: 20+"%"
    },
    logo:{
        width: 135,
        height: 134
    },
    nameAppSection:{
      width: 100+"%",
        marginTop: 60+"%",
      alignItems: 'center',
    },
    nameApp:{
        fontSize: 50,
        color:'#fff'
    },
    sloganApp:{
        fontSize: 20,
        color: '#ffffff'
    },
    verSection:{
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verText:{
        fontSize: 12,
        color: '#ffffff',
    },
    loadingSection:{
        width: 100+"%",
        marginTop: 40+"%",
        alignItems: 'center'
    }

});