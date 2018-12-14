import {StyleSheet, Dimensions} from 'react-native'

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    child: {
        height: height ,
        width,
    },
    textHeaderSection:{
        width: 100+"%",
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 10+"%"
    },
    headerText:{
        fontSize: 20,
        color: '#2f19ff',
        backgroundColor: 'transparent'
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
        color: '#2f19ff',
        fontSize: 15,
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
        width: 100, height: 40, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#0000FE'
    },
    btnText:{
        fontSize: 15, color: '#0000FE'
    }

});

export default styles;