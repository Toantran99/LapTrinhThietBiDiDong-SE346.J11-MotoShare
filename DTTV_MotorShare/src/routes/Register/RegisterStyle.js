import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    line:{
        width: 100+"%",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        marginTop: 16
    },
    avatarChosen:{
        width: 100+"%",
        height: 20+"%",
        alignItems: 'center',
        marginTop: 10+"%"
    },
    InputTextSection:{
        marginTop: 6+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionButton: {
        marginTop: 10+"%", width: 100+"%", height: 10+"%", alignItems: 'center'
    },
    customButtonStyle:{
        width: 310, height: 46, backgroundColor: '#FDA400', justifyContent: 'center', alignItems: 'center', borderRadius: 5
    },
    btnText:{
        fontSize: 16, color: '#ffffff', fontWeight: 'bold'
    },
    avatarStyle:{
        width: 100, height: 100, borderRadius: 50
    },
    textInputC:{
        width: 250, height: 16, fontSize: 14, marginLeft: 20, paddingVertical: 0, paddingHorizontal: 0, color:'#ffffff'
    },
    textInputCS:{
        width: 100+"%", height: 16, flexDirection: 'row'
    },
    dateTSection:{
        width: 100+"%", height: 18, flexDirection: 'row'
    },
    dateText:{
        fontSize: 14, marginLeft: 20, color: '#ffffff'
    }

});

export default styles;