import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.addressSection}>
                        <View style={styles.lineStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/image/location-circle.png')} style={styles.iconStyle} />
                                <Text numberOfLines={1} style={styles.textStyle}>{this.props.addressStart}</Text>
                            </View>
                        </View>
                        <View style={styles.lineStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/image/location.png')} style={styles.iconStyle} />
                                <Text numberOfLines={1} style={styles.textStyle}>{this.props.destination}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.datetimeSection}>
                        <View style={styles.lineStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/image/clock.png')} style={styles.iconStyle} />
                                <Text numberOfLines={1} style={styles.textStyle}>{this.props.time}</Text>
                            </View>
                        </View>
                        <View style={styles.lineStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../../assets/image/calendar.png')} style={styles.iconStyle} />
                                <Text numberOfLines={1} style={styles.textStyle}>{this.props.date}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.iconRemoveSection}>
                        <TouchableOpacity onPress={this.props.onRemovePress}>
                            <Image source={require('../../../assets/image/close.png')} style={styles.iconStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        width: 100+"%", height: 75, flexDirection: 'row',marginTop: 1+"%", borderWidth: 1, borderColor: '#e1e1e1'
    },
    addressSection:{
        flex:1,
    },
    datetimeSection:{
        width: 27+"%",
        height: 100+"%",
    },
    iconRemoveSection:{
        width: 10+"%",
        height: 100+"%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineStyle:{
        width: 95+"%",
        height: 45+"%",
        marginHorizontal: 5+"%",
        marginTop:1+"%",
        justifyContent: 'center',
    },
    iconStyle:{
        width: 20,
        height: 20,
    },
    textStyle:{
        fontSize: 12,
        color: '#000000',
        marginLeft: 2+"%",
        flexGrow: 1,
        width: 70+"%",

    }
});