import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert,ImageBackground, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import HeaderStyle3 from '../../../components/HeaderComponent/HeaderStyle3'
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonCustomFG from './CustomButtonFG';
import CustomeInputText from './CustomTextInputFG';
import { Actions } from "react-native-router-flux";

export default class ForgetPassword extends Component{
    constructor(props){
        super(props)
    }

    state={
        email:"",
        password:"",
        password2:""
    }
    componentDidMount(){
    }
    
    render(){
        return(
            <View  style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#139dfd'} barStyle={'light-content'}/>
                <View style={styles.header}>
                    <HeaderStyle3
                        imageUrl={require('../../../assets/image/back-blue.png')}
                        title={"Quên mật khẩu"} action={()=>{Actions.login({type:"reset"})}}/>
                </View>
                <View style={styles.mainS}>
                    <View style={[styles.InputTextSection,{marginTop: 15+"%"}]}>
                        <CustomeInputText IconName={"mail-forward"} placeholder={"Nhập email của bạn"} 
                            onChangeText={(e)=>{this.setState({ email: e })
                                this.props.getEmail(e);
                            }}/>
                    </View>
                    <View style={styles.InputTextSection}>
                        <CustomeInputText IconName={"lock"} secure={true}  placeholder={"Nhập mật khẩu mới"} 
                            onChangeText={(pwd)=>this.setState({ password: pwd })}/>
                    </View>
                    <View style={styles.InputTextSection}>
                        <CustomeInputText IconName={"lock"}  secure={true} placeholder={"Xác nhận mật khẩu"}
                            onChangeText={(pwd)=>this.setState({ password2: pwd })}/>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <ButtonCustomFG title={"Xác nhận"} onPress={()=>{
                        if(this.state.email.indexOf("@")<1||
                            this.state.password ==""||this.state.password!=this.state.password2
                            ||!this.props.hasEmailAccount){
                                Alert.alert('Không thành công!', "Vui lòng kiểm tra lại thông tin");
                                return;
                            }
                        // console.log(this.props.hasEmailAccount);
                        this.props.setPassword(this.state.email, this.state.password);
                        Alert.alert('Thành công', 'Mật khẩu đã được thay đổi thành "hí hí hí"');

                    }}/>
                    <TouchableOpacity onPress={()=>{Actions.login({type:"reset"})}}>
                        <Text style={{color:'#2699FB', marginTop: 10}}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header:{
        width:100+"%", height: 10+"%",
    },
    mainS:{
        flex:1,
    },
    bottomSection:{
        width: 100+"%",
        height: 20+"%",
        alignItems: 'center'
    },
    InputTextSection:{
        marginTop: 6+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },

});