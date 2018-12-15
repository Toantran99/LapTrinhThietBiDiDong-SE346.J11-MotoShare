import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
    findDriverContainer:{
        flex:1,
        backgroundColor:"#FF5E3A",
        justifyContent: "center",
        alignItems: "center"
    },
    tabText: {
        fontSize: 12
    },
    subTabText: {
        fontSize: 8
    },
    spinner: {
        marginBottom: 50
    }
};

export default styles;

