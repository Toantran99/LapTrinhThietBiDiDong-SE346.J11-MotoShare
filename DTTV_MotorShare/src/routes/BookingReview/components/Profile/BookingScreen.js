import React from "react";
import {ScrollView, View, Text} from "react-native";
import ListItem from './ListItem'

//JSON DATA  id = primary key
//Danh sách điểm đặt
// const data = [
//     {
//         id: 1,
//         addressStart: 'KTX khu B - Đông Hòa, Dĩ An,Bình Dương',
//         destination: 'ĐH Công nghệ Thông Tin - UIT ,ĐHQG, TPHCM',
//         time: '10:30',
//         date: '21-11-2018'
//     },
//     {
//         id: 2,
//         addressStart: 'KTX Khu A - ĐHQG -TPHCM',
//         destination: 'Trường ĐH Kinh tế Luật- ĐHQG-TPHCM',
//         time: '14:47',
//         date: '14-12-2018'
//     }
// ];
var Spinner = require("react-native-spinkit");

export default class BookingScreen extends React.Component {
    constructor(props){
        super(props)
    }
    // setTimeout(function() {
    //         getBookingHistory("confirmed");
    //     }, 1000);
    // console.log(Object.values(bookingHistory).filter(item=>item.status=="confirmed"));
    render(){
        const data = this.props.bookingHistory&& Object.values(this.props.bookingHistory).filter(item=>item.status=="pending")||[];

        return (
            (
                this.props.bookingHistory &&(
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    {
                        data.map((item)=>{
                            return<ListItem key={item._id}
                                            addressStart={item.pickUp.address}
                                            destination={item.dropOff.address}
                                            time={item.fare}
                                            // date={item.date}
                                            onRemovePress={()=>{alert('remove Item:'+ item._id);
                                                this.props.setBookingStatus(item,"delete");
                                                this.props.getBookingHistory();}}
                            />
                        })
                    }
                </ScrollView>
                )
            )||(
                <View style={{flex:1, flexDirection: 'column',justifyContent:'center', alignItems: 'center'}}>
                    <Spinner isVisible size={60} type="Circle" color="#000"/>
                </View>
            )  
        );
    }
}
