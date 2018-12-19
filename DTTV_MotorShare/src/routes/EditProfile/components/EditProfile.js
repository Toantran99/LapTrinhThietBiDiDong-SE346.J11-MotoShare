import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native'
import HeaderStyle3 from '../../../components/HeaderComponent/HeaderStyle3'
import ButtonCustomEP from './CustomButtonEP/CustomeButtonEP'
import CustomTextInputEP from './CutomTextInputEP/CustomTextInputEP'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import CustomDatePickerEP from './CustomDatePickerEP/CustomDatePickerEP'


export default class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state={
            dateofBirth: '12-12-1999',
            name: 'Nguyen Van A',
            phone: '1234567891',
            email: 'vana211@gmail.com',
            visible: false, //Hide or Show Date Picker
        }
    }


    render(){
        return(
            <View style={{flex:1}}>
                <DateTimePicker
                    isVisible={this.state.visible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                />
                <View style={styles.header}>
                    <HeaderStyle3 imageUrl={require('../../../assets/image/back.png')}
                                  title={"Sửa thông tin"}
                                  action={()=>{alert("Go Back")}} />
                </View>
                <ScrollView style={styles.main}>
                    <View style={styles.avatarSection}>
                        <Image source={require('../../../assets/image/user-default.png')} style={styles.avatar} />
                    </View>

                    <View style={[styles.TextInputSection,{marginTop:8+"%"}]}>
                        <CustomTextInputEP Value={this.state.name} IconName={'user'} placeholder={"Tên"} />
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomDatePickerEP IconName={'calendar'} NS={this.state.dateofBirth} onPress={()=>this.showPicker()}/>
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomTextInputEP Value={this.state.phone} IconName={'phone'} placeholder={"Số điện thoại"} />
                    </View>
                    <View style={styles.TextInputSection}>
                        <CustomTextInputEP Value={this.state.email} IconName={'mail-forward'}  placeholder={"Email"} />
                    </View>

                </ScrollView>
                <View style={styles.bottomBtnSection}>
                    <ButtonCustomEP onPress={()=>{alert("Edit Profile")}}
                                    title={"Sửa"}/>
                </View>
            </View>
        )
    }


    //Date picker
    handlePicker = (datetime)=>{
        this.setState({
            visible: false,
            dateofBirth: moment(datetime).format('DD-MM-YYYY')
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