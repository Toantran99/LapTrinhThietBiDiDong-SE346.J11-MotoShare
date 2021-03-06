import React, {Component} from 'react'
import {View, Text, StyleSheet,StatusBar,ScrollView, ImageBackground, Dimensions, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Actions } from "react-native-router-flux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import moment from "moment";
import styles from './RegisterStyle';


const { width,height } = Dimensions.get("window");

class ButtonCustom extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){console.log("Register: press");
            Actions.login({ type: "reset" });
            return true;
        });
    }
    componentWillUnMount() {
        BackHandler.removeEventListener('hardwareBackPress', function(){console.log("Register:delete press");
            return true;
        });
      }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.customButtonStyle, this.props.styleBtn]}>
                    <Text  style={{fontSize: 16, color: '#ffffff'}}>Tạo tài khoản</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


class CustomeInputText extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[{width: 327, height: 34}, this.props.styleInput]}>
                <View style={{width: 100+"%", height: 16, flexDirection: 'row'}}>
                    <Icon name={this.props.IconName} size={16} color="#2699FB" />
                    <TextInput secureTextEntry={this.props.secure} placeholder={this.props.placeholder}
                    placeholderTextColor={"#2699FB"} onChangeText={this.props.onChangeText}
                    style={{width: 250, height: 16, fontSize: 14, marginLeft: 20, paddingVertical: 0, paddingHorizontal: 0, color:'#2699FB'}}/>
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
                    <View style={{width: 100+"%", height: 18, flexDirection: 'row'}}>
                        <Icon name={this.props.IconName} size={16} color={'#2699FB'} />
                        <Text style={{fontSize: 14, marginLeft: 20, color: '#2699FB'}}>{this.props.NS}</Text>
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
    }

    state={
        showAvatarPick:false,
        visible: false,

        name: "",
        dob: "Ngày Sinh",
        phoneNumber: "",
        email: "",
        rating: "5",
        dCreate: new Date(),
        profilePic: null,
        vehicle: false,

        userName: "",
        password: "",
        password2: ""
    }
    
    render(){
        const radio_props = [
            {label: 'Không', value: false },
            {label: 'có', value: true }
          ];
        return(
            <View  style={{flex:1, backgroundColor: '#ffffff'}}>
                <ScrollView style={{flex:1}}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <DateTimePicker
                    isVisible={this.state.visible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                />

                <View style={styles.avatarChosen}>
                    
                    <TouchableOpacity onPress={()=>{this.setState({showAvatarPick:true})}}>
                        <Image source={this.state.profilePic&&{uri:this.state.profilePic}||require('../../../assets/image/user-default.png')} style={styles.avatarStyle} />
                    </TouchableOpacity>
                                 
                </View>

                <KeyboardAvoidingView enabled behavior={'padding'}>
                    <View style={{width: 100+"%", height: 80+"%"}}>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Tên"} IconName={"user-circle"} onChangeText={(name)=>this.setState({ name: name })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeDatePicker NS={this.state.dob} IconName={"calendar"} onPress={()=>this.showPicker()}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Số điện thoại"} IconName={"phone"} onChangeText={(ph)=>this.setState({ phoneNumber: ph })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Email"} IconName={"at"} onChangeText={(e)=>this.setState({ email: e })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"tên tài khoản"} IconName={"user-plus"} onChangeText={(uname)=>this.setState({ userName: uname} )}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Mật khẩu"} secure={true} IconName={"lock"} onChangeText={(pwd)=>this.setState({ password: pwd} )}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Xác nhận mật khẩu"} secure={true} IconName={"lock"} onChangeText={(pwd)=>this.setState({ password2: pwd} )}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <Text style={{color: '#000000', marginBottom: 5}}>
                                Bạn có xe không:
                            </Text>
                            <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#2699FB'}
                            labelColor={"#000000"}
                            animation={true}
                            onPress={(value) => {this.setState({vehicle:value}); console.log(this.state.vehicle)}}
                            />
                        </View>

                        <View style={styles.sectionButton}>
                            <ButtonCustom onPress={()=>{if(this.state.name==""|| this.state.dob=="Ngày Sinh"|| this.state.phoneNumber==""|| this.state.email.indexOf("@")<1||
                                            this.state.userName==""|| this.state.password ==""||this.state.password!=this.state.password2){
                                                Alert.alert('Không thành công!', "Vui lòng kiểm tra lại thông tin");
                                                return;
                                            }
                                            
                                            this.props.createAccount(this.state.name, this.state.dob, this.state.phoneNumber, this.state.email, this.state.dCreate,
                                                this.state.profilePic,this.state.vehicle, this.state.userName, this.state.password)
                                            Alert.alert('Thành công', "Xin chào, "+this.state.name.toString()+"! Chúc bạn sử dụng ứng dụng vui vẻ!");
                                            Actions.login({type:"reset"});
                                        }}/>
                            <TouchableOpacity onPress={()=>{Actions.login({type:"reset"})}}>
                                    <Text style={{color: '#2699FB', marginTop: 10}}>Quay lại</Text>
                            </TouchableOpacity>
                            <View style={{height: 50}}>

                            </View>
                        </View>

                    </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </View>
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