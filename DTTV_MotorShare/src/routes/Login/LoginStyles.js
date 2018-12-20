import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    textSection:{
        width: 100+"%",
        height: 105,
        marginTop: 23+"%"
    },
    form:{
        width: 100+"%",
        height: 145,
        marginTop: 9+"%",
    },
    btnS:{
        width: 100+"%",
        height: 46,
        marginTop: 5+"%",
        alignItems: 'center'
    },

    sectionText:{
        width: 100+"%", justifyContent: 'center',alignItems: 'center'
    },
    textS:{
        color: '#ffffff'
    },
    inputStyle:{
        width: 310,
        height: 100+"%",
        backgroundColor: 'rgba(255, 255, 255, 0.36)',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.85)',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    inputSection:{
        height: 46,
        width: 100+"%",
        alignItems: 'center',
    },
    forgetPassS:{
        width: 100+"%",
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0

    },
    forgetPass:{
        color: '#ffffff'
    },
    line:{
        width: 85+"%",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
    },
    lineSection:{
        marginTop: 7+"%",
        width: 100+"%",
        alignItems: 'center'
    },
    createAccSection:{
        width: 100+"%",
        height: 30,
        alignItems: 'center',
    },
    childcreateAcc: {
        width: 237,
        height: 100+"%",
        flexDirection: 'row'
    },
    textCreateAcc:{
        fontSize: 13,
        color: '#ffffff',
    },
    customBTNStyle:{
        width: 310, height: 46, backgroundColor: '#FDA400', justifyContent: 'center', alignItems: 'center', borderRadius: 5
    }


});

export default styles;