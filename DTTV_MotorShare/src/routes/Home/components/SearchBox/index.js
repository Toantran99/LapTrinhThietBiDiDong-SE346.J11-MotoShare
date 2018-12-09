import React from "react";
import {Text, Dimensions} from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./SearchBoxStyles.js";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height


export const SearchBox = ({getInputData, toggleSearchResultModal, selectedBox, getAddressPredictions, selectedAddress})=> {
	var { selectedPickUp, selectedDropOff } = {};
	var selectedVal = selectedBox;

	function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}
	function handleFocus(val){
		selectedVal = val;
		toggleSearchResultModal(val);
	}

	//console.log(selectedVal);
	if(selectedVal=="pickUp"||selectedVal=="dropOff") {
		mtop=0;
		if(selectedVal=="pickUp"){
			selectedPickUp =null; selectedDropOff = selectedAddress.selectedDropOff;
		}
		if(selectedVal=="dropOff"){
			selectedDropOff = null; selectedPickUp = selectedAddress.selectedPickUp;
		}
	} else if(selectedAddress) {
		selectedPickUp = selectedAddress.selectedPickUp;
		selectedDropOff = selectedAddress.selectedDropOff;
		mtop=height-200;

	}


		return(
			<View style={[styles.searchBox,{top:mtop}]}>
				<View style={styles.inputWrapper}>
					{/* <Text style={styles.label}>Điểm xuất phát</Text> */}
					<InputGroup>
						<Icon name="dot-circle" size={15} color="#143cc1"/>
						<Input 
							onFocus={()=>{handleFocus("pickUp");selectedPickUp = null;}}
							style={styles.inputSearch}
							placeholder="Điểm xuất phát..."
							onChangeText={handleInput.bind(this, "pickUp")}
							value={selectedPickUp && selectedPickUp.name}
						/>
					</InputGroup>
				</View>
				<View style={styles.secondInputWrapper}>
					{/* <Text style={styles.label}>điểm đến</Text> */}
					<InputGroup>
						<Icon name="map-marker-alt" size={15} color="#000"/>
						<Input
							onFocus={()=>handleFocus("dropOff")}
							style={styles.inputSearch}
							placeholder="điểm đến..."
							onChangeText={handleInput.bind(this, "dropOff")}
							value={selectedDropOff && selectedDropOff.name}
						/>
					</InputGroup>
				</View>
			</View>

		);
};

export default SearchBox;