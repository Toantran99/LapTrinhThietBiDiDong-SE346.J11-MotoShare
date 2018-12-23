import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, StatusBar, TouchableOpacity, ImageBackground} from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './IntroStyle';
import { Actions } from "react-native-router-flux";


const data =[
    {
        id: 1,
        title: 'Di chuyển chẳng bao giờ lại thuận lợi đến như vậy',
        imageUrl: require('../../../assets/image/intro01.png')
    },
    {
        id: 2,
        title: 'Chia sẻ chuyến đi tiết kiệm chi phí thời gian cho cả đôi bên',
        imageUrl: require('../../../assets/image/intro02.png')
    },
    {
        id: 3,
        title: 'Cơ hội làm quen bắt đầu các mối quan hệ mới',
        imageUrl: require('../../../assets/image/intro03.png')
    },
    {
        id: 4,
        title: 'Không còn cảnh tượng chen chúc trễ giờ vì xe buýt',
        imageUrl: require('../../../assets/image/intro04.png')
    },
    {
        id: 5,
        title: 'Hey! Tạo tài khoản và cùng tham gia với chúng tôi nào',
        imageUrl: require('../../../assets/image/intro05.png')
    },
];



export default class Introduction extends Component{
    renderButton = function (i) {
        if(i===5) return(
            <View style={styles.bottomBtnSection}>
                <TouchableOpacity onPress={()=>Actions.login({type:"reset"})}>
                <View style={styles.btnStyle}>
                    <Text style={styles.btnText}>Tham gia ngay nào</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    };


    render(){
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <SwiperFlatList
                    index={0}
                    showPagination
                    paginationActiveColor={'#2C9AF8'}
                >
                    {
                        data.map((item, i)=>{
                            return(
                                <ImageBackground key={i} source={item.imageUrl} style={[styles.child]}>
                                    <View style={styles.titleSection}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                    {this.renderButton(item.id)}
                                </ImageBackground>
                            );
                        })
                    }
                </SwiperFlatList>
            </View>
        );
    }
}

