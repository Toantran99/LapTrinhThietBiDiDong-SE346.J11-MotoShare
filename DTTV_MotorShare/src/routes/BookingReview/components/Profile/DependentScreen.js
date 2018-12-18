import React from "react";
import {ScrollView, View} from "react-native";
import ListItem from './ListItem'

//JSON DATA  id = primary key
//Danh sách điểm đi nhờ
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
// const data=
var Spinner = require("react-native-spinkit");

export default class DependentScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const data = this.props.bookingHistory&& Object.values(this.props.bookingHistory).filter(item=>item.status=="confirmed")||[];

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
                                                this.props.getBookingHistory();}}                            />
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