import {StyleSheet, Dimensions} from 'react-native'

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    child: {
        height: height ,
        width,
    },
    titleSection:{
        width: 100+"%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBtnSection:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10+"%"
    },
    title:{
        color: '#ffffff',
        fontSize: 18,
        fontWeight: "100",
        width: 75+"%",
        textAlign: 'center'
    },
    imageSection:{
        width: 100+"%", height: 35+"%", marginTop: 25+"%", justifyContent: 'center', alignItems: 'center'
    },
    imageStyle:{
        width: 140, height: 140, borderRadius: 70, marginTop: 10+"%"
    },


    //Btn Style
    btnStyle:{
        width: 100, height: 40, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ffffff'
    },
    btnText:{
        fontSize: 18, color: '#ffffff'
    }

});

export default styles;