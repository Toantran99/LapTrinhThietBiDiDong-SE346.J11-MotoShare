import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";

import BookingScreen from './Components/BookingScreen'
import DependentScreen from './Components/DependentScreen'
import UserInfo from './Components/UserInfo'
import HeaderStyle2 from '../../../../components/HeaderComponent/HeaderStyle2'

export default class Profile extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.headerStyle} >
                    <HeaderStyle2/>
                </View>
                <View style={styles.userInfoSection}>
                    <UserInfo/>
                </View>
                <View style={styles.listTripSection}>
                    <AppEx />
                </View>
            </View>
        )
    }
}

const AppNavigator = createMaterialTopTabNavigator({
    Booking: {screen: BookingScreen, navigationOptions:{tabBarLabel:'Đặt chuyến'} },
    Dependent: {screen: DependentScreen, navigationOptions:{tabBarLabel:'Đi nhờ'}}
},{
    tabBarOptions: {
        style: {
            backgroundColor: '#ffffff',
        },
        labelStyle:{
            color: '#000000'
        },
    }
});

const AppEx = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
    userInfoSection:{
        width: 100+"%", height: 20+"%", flexDirection: 'row'
    },
    listTripSection:{
        flex: 1,
    },
    headerStyle:{
        width: 100+"%", height:10+'%', padding:0, flexDirection: 'row'
    },
});