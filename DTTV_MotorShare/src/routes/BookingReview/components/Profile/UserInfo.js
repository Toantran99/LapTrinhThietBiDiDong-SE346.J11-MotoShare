import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from "moment";

const UserInfo = ({accountInfo}) =>{
    //Vòng lặp render Số sao
    let star = [];
    let numStar = accountInfo&&accountInfo.rating||0; //số sao
    for(let i=0; i<numStar; i++){
        star.push(
            <Image key={i} source={require('../../../../assets/image/star.png')} style={{width: 10, height: 10, marginLeft: 4+"%", marginTop: 1.5+"%"}}/>
        )
    }

    let accountAvatar = {uri: accountInfo&&accountInfo.profilePic}||require('../../../../assets/image/user-default.png');
    //Kết thúc Vòng lặp render Số sao      
    return(
        <View style={{width: 100+"%", height: 100+"%", flexDirection: 'row', backgroundColor: '#fff'}}>
            <View style={styles.avatarSection}>
                <Image source={accountAvatar} style={styles.avatarStyle} />
            </View>
            {accountInfo&&
            <View style={styles.infoTextSection}>
                {accountInfo.name &&
                    <Text style={styles.InfoTextStyle}>{/*Tên người dùng:*/} {accountInfo.name}</Text>
                }
                {accountInfo.dob &&
                    <Text style={styles.InfoTextStyle}>{/*Ngày sinh: */} {accountInfo.dob}</Text>
                }
                {accountInfo.phoneNumber &&
                    <Text style={styles.InfoTextStyle}>{/*Số điện thoại: */} {accountInfo.phoneNumber}</Text>
                }
                {accountInfo.rating &&
                    <View style={styles.voteSectionStyle}>
                    <Text style={[styles.InfoTextStyle, {marginTop:0}]}>Uy tín:</Text>
                    {star}
                </View>
                }
                {accountInfo.dCreate &&
                    <Text style={styles.InfoTextStyle}>Ngày tham gia: {moment(new Date(accountInfo.dCreate)).format('DD/MM/YYYY')}</Text>
                }
            </View>
            }
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
    );
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

export default UserInfo;