import React, {Component} from 'react'
import {View, Text, StyleSheet,TextInput, TouchableOpacity, ImageBackground, StatusBar, BackHandler} from 'react-native'
import { Actions } from "react-native-router-flux"
import styles from './LoginStyles'


class ButtonCustom extends Component{
    constructor(props){
        super(props);
        this.onBackPress = this.onBackPress.bind(this)
        this.state={
          backpressed: false
        }
      }
    
      componentDidMount () {
        
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
      }
    
      onBackPress () {
        console.log("Main: backpressed!");
        if (!this.state.backpressed)
          this.setState({backpressed:true});
        else
          BackHandler.exitApp();
        return true;
      }
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.customBTNStyle}>
                    <Text  style={{fontSize: 16, color: '#ffffff'}}>Đăng nhập</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
var x;

export default class Login extends Component{
    constructor(props){
        super(props)
    }

    state = {
		userName: "",
		password: ""
	  };

    render(){
        return(
            <ImageBackground style={{flex:1}} source={require('../../../assets/image/login.png')}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.textSection}>
                    <View style={[{height: 26 }, styles.sectionText]}>
                        <Text style={[{fontSize:19}, styles.textS]}>Hãy gia nhập</Text>
                    </View>
                    <View style={[{height: 86}, styles.sectionText]}>
                        <Text style={[{fontSize:65}, styles.textS]}>MotoShare</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputSection}>
                        <TextInput style={styles.inputStyle} placeholder={"Tên đăng nhập"} placeholderTextColor={'#ACA1A1'} onChangeText={(uname)=>{
                                this.setState({ userName: uname })
                                var rx = this;

                                setTimeout(function() {
                                    rx.props.getLoginInfo(rx.state.userName,rx.state.password)
                                    }, 1000);
                            }
                        } underlineColorAndroid="transparent" />
                    </View>
                    <View style={[styles.inputSection, {marginTop: 2+"%"}]}>
                        <TextInput secureTextEntry={true} style={styles.inputStyle} placeholderTextColor={'#ACA1A1'} placeholder={"Mật khẩu"} onChangeText={(pwd)=>{this.setState({ password: pwd })
                            var rx = this;

                            setTimeout(function() {
                                rx.props.getLoginInfo(rx.state.userName,rx.state.password)
                                }, 1000);
                            }
                        } underlineColorAndroid="transparent" />
                    </View>
                    <View style={styles.forgetPassS}>
                    <TouchableOpacity onPress={()=>Actions.forgetPassword({type:"reset"})}>
                        <Text style={styles.forgetPass}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.btnS}>
                    <ButtonCustom onPress ={()=>{
                        var rx = this;

                        setTimeout(function() {
                            rx.props.getLoginInfo(rx.state.userName,rx.state.password)
                            }, 1000);
                        console.log(this.props.loginInfo);
                        if(this.props.loginInfo&& this.props.loginInfo._id) Actions.home({type:"replace"})} }/>

                </View>
                <View style={styles.lineSection}>
                    <View
                        style={styles.line}
                    />
                </View>

                <View style={styles.createAccSection}>
                    <View style={styles.childcreateAcc}>
                        <Text style={styles.textCreateAcc}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={()=>{Actions.register({type:"reset"})}}>
                            <Text style={[styles.textCreateAcc, {marginLeft: 10}]}>Tạo tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ImageBackground>
        )
    }
}