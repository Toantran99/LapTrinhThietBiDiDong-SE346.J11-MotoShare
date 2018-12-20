import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, StatusBar, TouchableOpacity, ImageBackground} from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './IntroStyle';
import { Actions } from "react-native-router-flux";


const data =[
    {
        id: 1,
        title: 'Cơ hội làm quen và bắt đầu các mối quan hệ mới',
        imageUrl: require('../../../assets/image/findfriend.png')
    },
    {
        id: 2,
        title: 'Chia sẻ chuyến đi để tiết kiệm thời gian và chi phí cho cả hai bên',
        imageUrl: require('../../../assets/image/share.png')
    },
    {
        id: 3,
        title: 'Kết nối mọi người lại gần nhau hơn bằng những chuyến đi',
        imageUrl: require('../../../assets/image/connect.png')
    },
    {
        id: 4,
        title: 'Bắt đầu khám phá những điều thú vị ngay bây giờ',
        imageUrl: require('../../../assets/image/complete.png')
    },

];



export default class Introduction extends Component{
    renderButton = function (i) {
        if(i===4) return(
            <View style={styles.bottomBtnSection}>
                <TouchableOpacity onPress={()=>Actions.login({type:"reset"})}>
                <View style={styles.btnStyle}>
                    <Text style={styles.btnText}>Sẵn sàng</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    };


    render(){
        return(
            <ImageBackground source={require('../../../assets/image/intro-background.jpg')} style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <SwiperFlatList
                    index={0}
                    showPagination
                    paginationActiveColor={'#ffffff'}
                >
                    {
                        data.map((item, i)=>{
                            return(
                                <View key={i} style={[styles.child, { backgroundColor: 'transparent' }]}>
                                    <View style={styles.imageSection}>
                                        <Image source={item.imageUrl} style={styles.imageStyle} />
                                    </View>
                                    <View style={styles.titleSection}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                    {this.renderButton(item.id)}
                                </View>
                            );
                        })
                    }
                </SwiperFlatList>
            </ImageBackground>
        );
    }
}

