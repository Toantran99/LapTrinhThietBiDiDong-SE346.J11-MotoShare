import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight, Button
} from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {Container} from "native-base";
import MapContainer from "./MapContainer";

import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";

var screenWidth = Dimensions.get("window").width; //full width
var ScreenHeight = Dimensions.get("window").height; //full height

const myLogo = require("../../../assets/img.jpg");
const carMarker = require("../../../assets/Linux-Avatar.png");

export class Home extends React.Component {
  componentDidMount() {
    var rx = this;
    this.props.setName();
    this.props.getCurrentLocation();
    setTimeout(function(){
			rx.props.getNearByDrivers();

		}, 1000);

  }
  componentWillMount(){
  }

  render() {
    const region = {
        latitude: 10.882107,
        longitude: 106.782118,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0422
      }
    return (
      <Container>
        <HeaderComponent logo={myLogo}/>
        {/* {!!this.props.region.latitude &&  */}
        {this.props.region.latitude &&
        <MapContainer 
          region={this.props.region} 
          getInputData={this.props.getInputData} 
          toggleSearchResultModal={this.props.toggleSearchResultModal}
          getAddressPredictions={this.props.getAddressPredictions}
          resultTypes={this.props.resultTypes}
          predictions={this.props.predictions}
          getSelectedAddress = {this.props.getSelectedAddress}
          selectedAddress = {this.props.selectedAddress}
          carMarker={carMarker}
					nearByDrivers={this.props.nearByDrivers}
        />
        } 
        <Fab onPressAction={()=>this.props.bookCar()}/>
        {
          this.props.fare&&
          <Fare fare={this.props.fare}/>
        }
        <FooterComponent/>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#f00"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  map: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  mapCallout: {
    margin: 10
  }
});

export default Home;
