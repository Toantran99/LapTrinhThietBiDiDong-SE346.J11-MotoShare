import React from "react";
import {ScrollView} from "react-native";
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

 const DependentScreen =({getBookingHistory,bookingHistory})=> {
    const data = Object.values(bookingHistory).filter(item=>item.status=="confirmed");
    return (
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
    );
}

export default DependentScreen;