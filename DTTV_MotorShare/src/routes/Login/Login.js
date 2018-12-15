import React, {Component} from 'react'
import {View, Text, StyleSheet,TextInput, TouchableOpacity, ImageBackground, StatusBar} from 'react-native'
import { Actions } from "react-native-router-flux"
import styles from './LoginStyles'


class ButtonCustom extends Component{
    constructor(props){
        super(props);
        this.state={
            btnOnPress:null
        }
    }
    componentDidMount(){
        this.setState({
            btnOnPress:this.props.onPress,
        })
    }

    render(){
        return(
            <TouchableOpacity onPress={this.state.btnOnPress}>
                <View style={styles.customBTNStyle}>
                    <Text  style={{fontSize: 16, color: '#ffffff'}}>Đăng nhập</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
var x;

export default class Login extends Component{
    render(){
        return(
            <ImageBackground style={{flex:1}} source={require('../../assets/image/traveling.jpeg')}>
                {/* <StatusBar  hidden /> */}
                <View style={styles.textSection}>
                    <View style={[{height: 26  }, styles.sectionText]}>
                        <Text style={[{fontSize:19}, styles.textS]}>Hãy gia nhập</Text>
                    </View>
                    <View style={[{height: 86, fontSize:65 }, styles.sectionText]}>
                        <Text style={[{fontSize:65}, styles.textS]}>MotoShare</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputSection}>
                        <TextInput style={styles.inputStyle} placeholder={"Tên đăng nhập"} underlineColorAndroid="transparent" />
                    </View>
                    <View style={[styles.inputSection, {marginTop: 2+"%"}]}>
                        <TextInput secureTextEntry={true} style={styles.inputStyle} placeholder={"Mật khẩu"} underlineColorAndroid="transparent" />
                    </View>
                    <View style={styles.forgetPassS}>
                        <Text style={styles.forgetPass}>Quên mật khẩu</Text>
                    </View>

                </View>
                <View style={styles.btnS}>
                    <ButtonCustom onPress ={()=>{Actions.home({ type: "reset" });} }/>
                </View>
                <View style={styles.lineSection}>
                    <View
                        style={styles.line}
                    />
                </View>

                <View style={styles.createAccSection}>
                    <View style={styles.childcreateAcc}>
                        <Text style={styles.textCreateAcc}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity>
                            <Text style={[styles.textCreateAcc, {marginLeft: 10}]}>Tạo tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ImageBackground>
        )
    }
}