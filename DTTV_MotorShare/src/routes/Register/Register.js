import React, {Component} from 'react'
import {View, Text, StyleSheet,ImageBackground, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import styles from './RegisterStyle'

class ButtonCustom extends Component{
    render(){
        return(
            <TouchableOpacity>
                <View style={[styles.customButtonStyle, this.props.styleBtn]}>
                    <Text  style={styles.btnText}>Tạo tài khoản</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


class CustomeInputText extends Component{
    render(){
        return(
            <View style={[{width: 327, height: 34}, this.props.styleInput]}>
                <View style={styles.textInputCS}>
                    <Icon name={this.props.IconName} size={16} color="#ffffff" />
                    <TextInput secureTextEntry={this.props.secure}   placeholder={this.props.placeholder} placeholderTextColor={"#ffffff"} style={styles.textInputC}/>
                </View>
                <View
                    style={styles.line}
                />
            </View>
        )
    }
}

class CustomeDatePicker extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{width: 327, height: 36}, this.props.styleInput]}>
                    <View style={styles.dateTSection}>
                        <Icon name={this.props.IconName} size={16} color={'#ffffff'} />
                        <Text style={styles.dateText}>{this.props.NS}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}


export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state ={
            dateOfBirth: 'Ngày sinh',
            visible: false,
        }
    }


    render(){
        return(
            <ImageBackground source={require('../../assets/image/login_register_bg.png')} style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <DateTimePicker
                    isVisible={this.state.visible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                />

                <View style={styles.avatarChosen}>
                    <Image source={require('../../assets/image/user-default.png')} style={styles.avatarStyle} />
                </View>

                <KeyboardAvoidingView enabled behavior={'padding'}>
                    <View style={{width: 100+"%", height: 80+"%"}}>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Tên"} IconName={"user-circle-o"}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeDatePicker NS={this.state.dateOfBirth} IconName={"calendar"} onPress={()=>this.showPicker()}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Số điện thoại"} IconName={"phone"}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Mật khẩu"} secure={true} IconName={"lock"}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Xác nhận mật khẩu"} secure={true} IconName={"lock"}/>
                        </View>
                        <View style={styles.sectionButton}>
                            <ButtonCustom/>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            </ImageBackground>
        )
    }

    //Date picker
    handlePicker = (datetime)=>{
        this.setState({
            visible: false,
            dateOfBirth: moment(datetime).format('DD-MM-YYYY')
        })

    };

    hidePicker = ()=>{
        this.setState({
            visible: false
        })
    };

    showPicker =()=>{
        this.setState({visible: true})
    };
    //End date picker
}