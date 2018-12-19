import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import HeaderStyle3 from '../../../components/HeaderComponent/HeaderStyle3'
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonCustomFG from './Button/CustomButtonFG'
import CustomeInputText from './TextInput/CustomTextInputFG'

export default class ForgetPassword extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <HeaderStyle3
                        imageUrl={require('../../../assets/image/back.png')}
                        title={"Quên mật khẩu"} action={()=>{alert("Go Back")}}/>
                </View>
                <View style={styles.mainS}>
                    <View style={[styles.InputTextSection,{marginTop: 15+"%"}]}>
                        <CustomeInputText IconName={"mail-forward"} placeholder={"Nhập email của bạn"}/>
                    </View>
                    <View style={styles.InputTextSection}>
                        <CustomeInputText IconName={"lock"} secure={true}  placeholder={"Nhập mật khẩu mới"}/>
                    </View>
                    <View style={styles.InputTextSection}>
                        <CustomeInputText IconName={"lock"}  secure={true} placeholder={"Xác nhận mật khẩu"}/>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <ButtonCustomFG title={"Xác nhận"} onPress={()=>{alert("Button Clicked")}}/>
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
        height: 12+"%",
        alignItems: 'center'
    },
    InputTextSection:{
        marginTop: 6+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },

});