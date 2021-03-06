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
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Container } from "native-base";
import { Actions } from "react-native-router-flux";
import MapContainer from "./MapContainer";

import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";
import FindDriver from "./FindDriver";

var screenWidth = Dimensions.get("window").width; //full width
var ScreenHeight = Dimensions.get("window").height; //full height

const myLogo = require("../../../assets/img.jpg");
const carMarker = require("../../../assets/Linux-Avatar.png");
const destMarker = require("../../../assets/image/Down_Arrow.png");


export class Home extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    var rx = this;

    BackHandler.addEventListener('hardwareBackPress', function(){console.log("Home: press");
        if(!rx.props.selectedBox||rx.props.selectedBox!='map'){
          rx.props.setSelectedBox('map');
        }
        else if(rx.props.selectedBox=='map'){
          // BackHandler.removeEventListener('hardwareBackPress', function(){console.log("Home:delete press");
          //   return true;
          // });

          Actions.login({ type: "reset" });
        }
        return true;
    });
    // this.props.setName();
    // console.log(this.props.loginInfo._id);
    this.props.getAccountInfo();
    setTimeout(function() {
      rx.props.getNearByDrivers();
      rx.props.getNearByBookings();
    }, 1000);
  }

  
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.booking.status);

    if (this.props.booking.status === "confirmed") {
      Actions.trackDriver({ type: "reset" });
    }
    this.props.getCurrentLocation();
    var rx = this;
    setTimeout(function() {
      rx.props.getNearByDrivers();
      rx.props.getNearByBookings();
    }, 1000);

  }

  componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress', function(){console.log("Home:delete press");
        return true;
    });
  }

  render() {
    const region = {
      latitude: 10.882107,
      longitude: 106.782118,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0422
    };
    const { status } = this.props.booking;

    return (
      <Container>
        {/* {(status !== "pending" && ( */}
          <View style={{ flex: 1 }}>
            <HeaderComponent accountInfo={this.props.accountInfo} onPress={()=>Actions.bookingReview({type:"reset"})}/>
            {/* {!!this.props.region.latitude &&  */}
            <MapContainer
              region={this.props.region.latitude ? this.props.region : null}
              getInputData={this.props.getInputData}
              toggleSearchResultModal={this.props.toggleSearchResultModal}
              getAddressPredictions={this.props.getAddressPredictions}
              selectedBox={this.props.selectedBox}
              resultTypes={this.props.resultTypes}
              predictions={this.props.predictions}
              getSelectedAddress={this.props.getSelectedAddress}
              setSelectedBox={this.props.setSelectedBox}
              selectedAddress={this.props.selectedAddress}
              distanceDirection={this.props.distanceDirection}
              carMarker={carMarker}
              destMarker={destMarker}
              // nearByDrivers={this.props.nearByDrivers}
              nearByBookings={this.props.nearByBookings}
              loginInfo={this.props.loginInfo}
              changeBookingStatus={this.props.changeBookingStatus}
            />
            <Fab isAddressSelected={this.props.selectedAddress.selectedPickUp
                              &&this.props.selectedAddress.selectedDropOff?true:false}
              onPressAction={(time) => {this.props.bookCar(time); alert("đặt chuyến thành công!")}} />
            {this.props.fare && 
            <Fare fare={this.props.fare} />}
            {/* <FooterComponent /> */}
          </View>
        {/* )) || (
          <FindDriver
            selectedAddress={this.props.selectedAddress}
            onPressCancelAction={() => this.props.changeBookingStatus(this.props.booking, "cancelled", this.props.loginInfo._id)}
          />
        )} */}
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
