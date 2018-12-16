import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

export default class UserInfo extends Component{
    render(){
        //Vòng lặp render Số sao
        let star = [];
        let numStar = 4; //số sao
        for(let i=0; i<numStar; i++){
            star.push(
                <Image key={i} source={require('../../../../assets/image/star.png')} style={{width: 10, height: 10, marginLeft: 4+"%", marginTop: 1.5+"%"}}/>
            )
        }
        //Kết thúc Vòng lặp render Số sao

        return(
            <View style={{width: 100+"%", height: 100+"%", flexDirection: 'row', backgroundColor: '#fff'}}>
                <View style={styles.avatarSection}>
                    <Image source={require('../../../../assets/image/user-default.png')} style={styles.avatarStyle} />
                </View>
                <View style={styles.infoTextSection}>
                    <Text style={styles.InfoTextStyle}>Tên người dùng</Text>
                    <Text style={styles.InfoTextStyle}>Ngày sinh</Text>
                    <Text style={styles.InfoTextStyle}>Số điện thoại</Text>
                    <View style={styles.voteSectionStyle}>
                        <Text style={[styles.InfoTextStyle, {marginTop:0}]}>Uy tín</Text>
                        {star}
                    </View>
                    <Text style={styles.InfoTextStyle}>Ngày tham gia</Text>
                </View>
                <View style={styles.iconRightSection}>
                    <View style={styles.iconRight}>
                        <TouchableOpacity>
                            <Image source={require('../../../../assets/image/controls.png')} style={styles.iconBack}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRight}>
                        <TouchableOpacity>
                            <Image source={require('../../../../assets/image/settings.png')} style={styles.iconBack}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRight}>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    InfoTextStyle:{
        fontSize: 12,
        color: '#000000',
        marginTop: 1+"%"
    },
    voteSectionStyle:{
        marginTop: 1+"%",
        flexDirection: 'row'
    },
    avatarSection:{
        width: 34+"%", height:100+"%", alignItems: 'center'
    },
    avatarStyle:{
        width: 100, height: 100, borderRadius: 50, marginTop: 2+"%",
    },
    iconRightSection:{
        width: 10+"%", height:100+"%", justifyContent: 'space-between'
    },
    infoTextSection:{
        width: 56+"%", height:100+"%",
    },
    iconRight:{
        width: 100+"%",
        height: 20+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBack:{
        width: 20, height: 20,
    },
});