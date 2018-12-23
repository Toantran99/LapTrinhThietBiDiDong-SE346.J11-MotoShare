import React,{Component} from "react";
import {Dimensions, NativeModules, Image, TouchableOpacity, Text, Alert} from "react-native";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import moment from "moment";

import styles from "./MapContainerStyles.js";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

// export const MapContainerConst = ({ 
// 		region, 
// 		getInputData,
// 		toggleSearchResultModal,
// 		getAddressPredictions,
// 		selectedBox,
// 		resultTypes,
// 		predictions,
// 		getSelectedAddress,
// 		setSelectedBox,
// 		selectedAddress,
// 		distanceDirection,
// 		carMarker,
// 		destMarker,
// 		// nearByDrivers,
// 		nearByBookings,
// 		loginInfo,
// 		changeBookingStatus,
// 		updateDMarker,
// 		dstMarker
// 	})=>{
// }

export default class MapContainer extends Component{
	constructor(props){
		super(props)
	}
	state={
		dstMarker:{}
	}

	render(){
		const { selectedPickUp, selectedDropOff } = this.props.selectedAddress || {};

	//console.log(this.props.distanceDirection);
	// var groupLocation = decode(this.props.distanceDirection)|| null;
	const { width, height } = Dimensions.get("window");

	const defaultRegion = {
        latitude: 10.882107,
        longitude: 106.782118,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0422
      }

	const ASPECT_RATIO = width / height;
	const LATITUDE_DELTA = 0.0922;
	const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
	var reg =selectedDropOff||selectedPickUp||this.props.region||defaultRegion;
	var destinationMarker = {};
	
	reg = {
		latitude:reg.latitude,
		longitude:reg.longitude,
		latitudeDelta:LATITUDE_DELTA,
		longitudeDelta:LONGITUDE_DELTA
	}
	return(
		<View style={styles.container}>
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={reg}
				showsUserLocation={true}
				followsUserLocation={true}
				zoomEnabled={true}
				onPress={()=>{this.props.setSelectedBox('map')}}
			>
			{this.props.region && <MapView.Marker
            coordinate={this.props.region}
            pinColor="red"
            title={"My location"}
            description={"My description"}
            // image={require('./src/Linux-Avatar.png')}
            // style={{width:300, height:100}}
          		/>
			}

            	{ selectedPickUp &&
					<MapView.Marker
						coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
						pinColor="green"
						title={"Start"}
					/>	
				}
				{ selectedDropOff &&
					<MapView.Marker
						coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
						pinColor="blue"
						title={"Stop"}
					/>	
				}

				{ this.props.distanceDirection &&
					<MapView.Polyline
						coordinates={[
							{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude},
							...this.props.distanceDirection,
							{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}
						
						]}
						strokeColor="pink"
						strokeWidth={3}
					/>	
				}

		  	{/* {
				this.props.nearByDrivers && this.props.nearByDrivers.map &&this.props.nearByDrivers.map((marker, index)=>
					<MapView.Marker
						key={index}
						coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
						image={this.props.carMarker}
						title={marker._id}
					/>	
				)
			} */}
			{
				this.props.nearByBookings && this.props.nearByBookings.map &&
				this.props.nearByBookings.map((marker, index)=>{
					let day = marker.time&&new Date(marker.time);
					console.log(marker.account[0].profilePic);
					let pic = marker.account[0].profilePic?{uri:marker.account[0].profilePic}:this.props.carMarker;
					return <MapView.Marker
						key={index}
						coordinate={{latitude:marker.pickUp.coordinates[1], longitude:marker.pickUp.coordinates[0] }}
						// image={pic}
						title={marker._id}
						onPress={() => {
										this.setState({dstMarker:marker.dropOff});
										console.log(destinationMarker);
						}}
						onCalloutPress={() => {
							if(!this.props.loginInfo.vehicle){
								alert("Có xe đâu mà đòi chở người ta -_-");
								return;
							}
							Alert.alert("Bạn sẽ đồng ý cho người này quá giang?","",
                                        [
                                            {text: 'Cancel', onPress: () => {return;}, style: 'cancel'},
                                            {text: 'OK', onPress: () =>{this.props.changeBookingStatus(marker, "Confirmed", this.props.loginInfo._id)
                                                                        } },
                                        ])
							}}
					>
						<View>
							<Image
								source={pic}
								style={{width:18, height:18}}
							/>
						</View>
						
					    <MapView.Callout style={{width: 250}}>
							<View style={styles.lineStyle}>
								<Text style={styles.boldText}>Tên người dùng:</Text>
								<Text style={styles.textStyle}>{marker.userName}</Text>
							</View>
                            <View style={styles.lineStyle}>
                                <Text style={styles.boldText}>Từ:</Text>
                                <Text style={styles.textStyle}>{marker.pickUp.name}</Text>
                            </View>
                            <View style={styles.lineStyle}>
                                <Text style={styles.boldText}>Đến:</Text>
                                <Text style={styles.textStyle}>{marker.dropOff.name}</Text>
                            </View>
                            <View style={styles.lineStyle}>
                                <Text style={styles.boldText}>Ngày:</Text>
                                <Text style={styles.textStyle}>{moment(day).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={styles.lineStyle}>
                                <Text style={styles.boldText}>Giờ:</Text>
                                <Text style={styles.textStyle}>{moment(day).format('LT')}</Text>
                            </View>

							<View style={{width: 100+"%", alignItems: 'center'}}>
                                <TouchableOpacity onPress={()=>alert("tpes")}>
                                    <Text style={{color:'#1994ff', fontWeight: 'bold'}}>{"<Nhấn để đồng ý>"}</Text>
                                </TouchableOpacity>
							</View>

							
							
						</MapView.Callout>
						
					</MapView.Marker>	
				}
				)
			}
			{/*hiển thị điểm đến khi nhấn chọn điểm đi  */}
			{
				this.state.dstMarker!={}&&this.state.dstMarker.coordinates&&
				<MapView.Marker
							coordinate={{latitude:this.state.dstMarker.coordinates[1], longitude:this.state.dstMarker.coordinates[0] }}
							title={"Điểm đến"}
							description={this.state.dstMarker.name}
						>
                    <Image
                        source={require('../../../../assets/image/marker.png')}
                        style={{width:40, height:40}}
                    />
				</MapView.Marker>
					
			}
			</MapView>
			<SearchBox 
				getInputData={this.props.getInputData} 
				toggleSearchResultModal={this.props.toggleSearchResultModal}
				selectedBox={this.props.selectedBox}
				setSelectedBox={this.props.setSelectedBox}
				getAddressPredictions={this.props.getAddressPredictions}
				selectedAddress={this.props.selectedAddress}
			/>
			{ (this.props.resultTypes.pickUp || this.props.resultTypes.dropOff) && this.props.selectedBox!=="map" &&
			<SearchResults predictions={this.props.predictions} getSelectedAddress={this.props.getSelectedAddress}/>
			}
		</View>
	)}
}