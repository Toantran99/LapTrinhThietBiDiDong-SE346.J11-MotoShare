import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  BackHandler
} from "react-native";

import { Container } from "native-base";
import { Actions } from "react-native-router-flux";

import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import AccountStatus from "./AccountStatus";


var screenWidth = Dimensions.get("window").width; //full width
var ScreenHeight = Dimensions.get("window").height; //full height

const myLogo = require("../../../assets/img.jpg");
const carMarker = require("../../../assets/Linux-Avatar.png");

export class BookingReview extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    var rx = this;

    BackHandler.addEventListener('hardwareBackPress', function(){console.log("BookingReview: press");
        return true;
    });
    this.props.setName();
    this.props.getAccountInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    var rx = this;
  }

  componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress', function(){console.log("BookingReview:delete press");
        return true;
    });
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
                <HeaderComponent logo={myLogo} />
                <AccountStatus accountInfo={this.props.accountInfo}/>
                <Text>{this.props.name}</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default BookingReview;
