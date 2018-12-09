import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export const HeaderComponent =  ({logo})=>{
	return (
		<Header style={{backgroundColor:"#fff"}} iosBarStyle="dark-content" androidStatusBarColor="#fff">
			<Left style={{flex:1}}>
				<Button transparent>
					{logo &&
						<Image resizeMode="contain" style={styles.logo} source={logo}/>
						||
						<Text style={styles.headerText}>Đi nhờ xe</Text>
					}
					<Text>  BDtren</Text>
				</Button>
			</Left>
			<Body style={{flex:0,alignSelf: 'center'}}>
				{/* <Icon name="bars" style={styles.icon}/> */}
			</Body>

			<Right style={{flex:1}}>
				<Button transparent>
					<Icon name="comments" style={styles.icon} />
				</Button>

				<Button transparent>
					<Icon name="bell" style={styles.icon} />
				</Button>
			</Right>
		</Header>
	);
}

export default HeaderComponent;