import React from "react";
import {ScrollView} from "react-native";
import ListItem from './ListItem'

//JSON DATA  id = primary key
//Danh sách điểm đặt
const data = [
    {
        id: 1,
        addressStart: 'KTX khu B - Đông Hòa, Dĩ An,Bình Dương',
        destination: 'ĐH Công nghệ Thông Tin - UIT ,ĐHQG, TPHCM',
        time: '10:30',
        date: '21-11-2018'
    },
    {
        id: 2,
        addressStart: 'KTX Khu A - ĐHQG -TPHCM',
        destination: 'Trường ĐH Kinh tế Luật- ĐHQG-TPHCM',
        time: '14:47',
        date: '14-12-2018'
    }
];


export default class BookingScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                {
                    data.map((item)=>{
                        return<ListItem key={item.id}
                                        addressStart={item.addressStart}
                                        destination={item.destination}
                                        time={item.time}
                                        date={item.date}
                                        onRemovePress={()=>alert('remove Item:'+ item.id)}
                        />
                    })
                }
            </ScrollView>
        );
    }
}
