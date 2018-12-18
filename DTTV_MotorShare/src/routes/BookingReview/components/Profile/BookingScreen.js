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

const BookingScreen =({getBookingHistory,bookingHistory})=> {
    // setTimeout(function() {
    //         getBookingHistory("confirmed");
    //     }, 1000);
    // console.log(Object.values(bookingHistory).filter(item=>item.status=="confirmed"));

    const data = bookingHistory&& Object.values(bookingHistory).filter(item=>item.status=="pending")||[];

    return (
        (
            bookingHistory &&(
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                {
                    data.map((item)=>{
                        return<ListItem key={item._id}
                                        addressStart={item.pickUp.address}
                                        destination={item.dropOff.address}
                                        time={item.fare}
                                        // date={item.date}
                                        onRemovePress={()=>alert('remove Item:'+ item._id)}
                        />
                    })
                }
            </ScrollView>
            )
        )||(
            <Spinner style={{flex:1, jusifyContent:'center', alignItems: 'center'}} isVisible size={60} type="Circle" color="#000"/>
        )  
    );
}

export default BookingScreen;