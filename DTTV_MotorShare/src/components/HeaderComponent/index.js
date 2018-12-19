import React, { Component } from 'react';
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";

export default class HeaderComponent extends Component{
	constructor(props){
		super(props)
	}

	render(){
		let accountAvatar = {uri: this.props.accountInfo.profilePic}||require('../../assets/image/user-default.png');
		return (
			<Header style={{backgroundColor:"#fff"}} iosBarStyle="dark-content" androidStatusBarColor="#fff">
				<Left style={{flex:1}}>
					<Button transparent onPress={this.props.onPress}>
						{this.props.accountInfo &&
							<Image resizeMode="contain" style={styles.logo} source={accountAvatar}/>
							||
							<Text >noImage</Text>
						}
						{
							this.props.accountInfo.account&& this.props.accountInfo.account.userName&&
								<Text>  {this.props.accountInfo.account.userName}</Text>
						}
						
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
}