import { Dimensions } from "react-native";
const { width,height } = Dimensions.get("window");

const styles = {
    fareContainer: {
        position:'absolute',
        width:width,
        height:40,
        top: height/2-20,
        padding:10,
        backgroundColor:"grey"
    },
    fareText: {
        fontSize: 12
    },
    amount:{
        fontWeight:"bold",
        fontSize: 12
    }
};

export default styles;