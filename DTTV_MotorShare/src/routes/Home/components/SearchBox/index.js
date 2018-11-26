import React from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./SearchBoxStyles.js";


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
		if(selectedVal=="pickUp"){
			selectedPickUp =null; selectedDropOff = selectedAddress.selectedDropOff;
		}
		if(selectedVal=="dropOff"){
			selectedDropOff = null; selectedPickUp = selectedAddress.selectedPickUp;
		}
	} else if(selectedAddress) {
		selectedPickUp = selectedAddress.selectedPickUp;
		selectedDropOff = selectedAddress.selectedDropOff;
	}


		return(
			<View style={styles.searchBox}>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>PICK UP</Text>
					<InputGroup>
						<Icon name="search" size={15} color="#FF5E3A"/>
						<Input 
							onFocus={()=>{handleFocus("pickUp");selectedPickUp = null;}}
							style={styles.inputSearch}
							placeholder="Choose pick-up location"
							onChangeText={handleInput.bind(this, "pickUp")}
							value={selectedPickUp && selectedPickUp.name}
						/>
					</InputGroup>
				</View>
				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>DROP-OFF</Text>
					<InputGroup>
						<Icon name="search" size={15} color="#FF5E3A"/>
						<Input
							onFocus={()=>handleFocus("dropOff")}
							style={styles.inputSearch}
							placeholder="Choose drop-off location"
							onChangeText={handleInput.bind(this, "dropOff")}
							value={selectedDropOff && selectedDropOff.name}
						/>
					</InputGroup>
				</View>
			</View>

		);
};

export default SearchBox;