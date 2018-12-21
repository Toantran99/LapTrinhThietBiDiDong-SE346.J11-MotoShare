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
        marginTop: 2+"%"
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
    avatarStyle:{
        width: 100, height: 100, borderRadius: 50
    },
    btnBack:{
        width: 310, height: 46,backgroundColor: '#24C12F', justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 10
    }

});

export default styles;