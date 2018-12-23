import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, ImageBackground, ScrollView, Alert, StatusBar} from 'react-native'
import HeaderStyle3 from '../../../components/HeaderComponent/HeaderStyle3'
import ButtonCustomEP from './CustomButtonEP/CustomeButtonEP'
import CustomTextInputEP from './CutomTextInputEP/CustomTextInputEP'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import CustomDatePickerEP from './CustomDatePickerEP/CustomDatePickerEP';
import { Actions } from "react-native-router-flux";


export default class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state={
            dob: this.props.accountInfo.dob,
            name: this.props.accountInfo.name,
            phoneNumber: this.props.accountInfo.phoneNumber,
            email: this.props.accountInfo.email,
            visible: false, //Hide or Show Date Picker
        }
    }


    render(){
        return(
            <ImageBackground source={require('../../../assets/image/editProfile.png')} style={{flex:1}}>
                <StatusBar backgroundColor={'#0984C1'} barStyle={'light-content'}/>
                <DateTimePicker
                    isVisible={this.state.visible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                />
                <View style={styles.header}>
                    <HeaderStyle3 imageUrl={require('../../../assets/image/back.png')}
                                    title={"Sửa thông tin"}
                                    action={()=>{Actions.bookingReview({type:"replace"})}} 
                                    />
                </View>
                <ScrollView style={styles.main}>
                    <View style={styles.avatarSection}>
                        <Image source={require('../../../assets/image/user-default.png')} style={styles.avatar} />
                    </View>

                    <View style={[styles.TextInputSection,{marginTop:8+"%"}]}>
                        <CustomTextInputEP Value={this.state.name} IconName={'user'} onChangeText={(n)=>this.setState({ name: n })} placeholder={"Tên"}/>
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomDatePickerEP IconName={'calendar'} NS={this.state.dob} onPress={()=>this.showPicker()}/>
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomTextInputEP Value={this.state.phoneNumber} IconName={'phone'} onChangeText={(pn)=>this.setState({ phoneNumber: pn })} placeholder={"Số điện thoại"} />
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomTextInputEP Value={this.state.email} IconName={'at'} onChangeText={(e)=>this.setState({ email: e })} placeholder={"Email"} />
                    </View>

                </ScrollView>
                <View style={styles.bottomBtnSection}>
                    <ButtonCustomEP onPress={()=>{if(this.state.name==""|| this.state.dob=="Ngày Sinh"|| this.state.phoneNumber==""|| this.state.email.indexOf("@")<1){
                                                Alert.alert('Không thành công!', "Vui lòng kiểm tra lại thông tin");
                                                return;
                                            }
                                            
                                            let rx = this;
                                            Alert.alert("Bạn có thực sự muốn sửa các thông tin này?","",
                                                [
                                                    {text: 'Cancel', onPress: () => {return;}, style: 'cancel'},
                                                    {text: 'OK', onPress: () => { rx.props.updateProfile(rx.state.name, rx.state.dob, rx.state.phoneNumber, rx.state.email);
                                                                                    Alert.alert('Thành công', "thông tin của bạn "+rx.state.name.toString()+" đã được thay đổi thành công!");
                                                                                    rx.props.getAccountInfo();
                                                                                    Actions.bookingReview({type:"replace"});} },
                                                ])
                                        }}
                                    title={"Sửa"}/>
                </View>
            </ImageBackground>
        )
    }


    //Date picker
    handlePicker = (datetime)=>{
        this.setState({
            visible: false,
            dob: moment(datetime).format('DD-MM-YYYY')
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


const styles = StyleSheet.create({
    header:{
        width: 100+"%",
        height: 10+"%"
    },
    main:{
        flex:1
    },
    bottomBtnSection:{
        width: 100+"%",
        height: 12+"%",
        alignItems: 'center',
    },
    TextInputSection:{
        width: 100+"%",
        alignItems: 'center',
        marginTop: 6+"%"
    },
    avatarSection:{
        width: 100+"%",
        height: 100,
        alignItems: 'center',
        marginTop: 5+"%"
    },
    avatar:{
        width: 100,
        height: 100,
        borderRadius: 50
    }
});