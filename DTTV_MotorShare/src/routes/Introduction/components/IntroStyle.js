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
        marginTop: 130+"%"
    },
    bottomBtnSection:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10+"%"
    },
    title:{
        color: '#2C9AF8',
        fontSize: 16,
        fontWeight: "100",
        width: 75+"%",
        textAlign: 'center',
    },


    //Btn Style
    btnStyle:{
        width: 250, height: 40, backgroundColor: '#2C83DB', justifyContent: 'center', alignItems: 'center',
    },
    btnText:{
        fontSize: 18, color: '#ffffff'
    }

});

export default styles;