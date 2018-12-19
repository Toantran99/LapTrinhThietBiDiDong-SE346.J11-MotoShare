import React, {Component} from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";

import styles from "./FabStyles.js";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Fab extends Component{
	constructor(props){
		super(props)
	}

	state = {
		isDateTimePickerVisible: false,
	  };
	
	  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
	
	  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
	
	  _handleDatePicked = (date) => {

		// console.log('A date has been picked: ', date);
		this._hideDateTimePicker();
		this.props.onPressAction(date);
	  };

	render(){
		return (
			<Button style={styles.fabContainer} onPress={ this.props.isAddressSelected?this._showDateTimePicker:()=>{}}>
				<Text style={styles.btnText}> Hẹn ngay! </Text>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					mode={'datetime'}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
				/>
			</Button>

			

		);
	}
}
