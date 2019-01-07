import { StyleSheet } from "react-native";

const styles = {
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",

	},
	map:{
		...StyleSheet.absoluteFillObject,

	},
	lineStyle:{
		flexDirection: 'row'
	},
	boldText:{
        color:'#545454',
		fontSize: 15,
		fontWeight: 'bold'
	},
	textStyle:{
		fontSize: 15,
		color:'#545454',
		marginLeft: 5
	}
};

export default styles;