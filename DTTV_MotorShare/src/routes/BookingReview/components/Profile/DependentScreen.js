import React from "react";
import {ScrollView, View} from "react-native";
import ListItem from './ListItem';
import moment from "moment";

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
                            let day = item.time&&new Date(item.time);
                            return<ListItem key={item._id}
                                            addressStart={item.pickUp.name}
                                            destination={item.dropOff.name}
                                            time={item.time&& moment(day).format('LT')}
                                            date={item.time&& moment(day).format('DD/MM/YYYY')}
                                            onRemovePress={()=>{
                                                var rx = this;
                                                Alert.alert("Bạn có thực sự xóa chuyến đi này?","",
                                                [
                                                    {text: 'Cancel', onPress: () => {return;}, style: 'cancel'},
                                                    {text: 'OK', onPress: () =>{rx.props.setBookingStatus(item,"delete");
                                                                                var pos = data.indexOf(item._id);
                                                                                if(pos>-1)
                                                                                    data.splice(pos,1);
                                                                                Alert.alert('Đã xóa thành công!');} },
                                                ])
                                                this.props.getBookingHistory();
                                            }}/>
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