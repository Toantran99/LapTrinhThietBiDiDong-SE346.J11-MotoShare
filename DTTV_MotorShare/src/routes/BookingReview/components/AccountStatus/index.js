import React from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./AccountStatusStyles";

export const AccountStatus = ({accountInfo})=>{
	console.log(accountInfo);
	return (
		<View style={{ flex: 1 }}>
			{
				accountInfo&&
				<Text>{accountInfo.name}</Text>
			}
		</View>

	);
}

export default  AccountStatus;