import React from "react";
import {Dimensions, NativeModules} from "react-native";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import styles from "./MapContainerStyles.js";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({ 
		region, 
		getInputData,
		toggleSearchResultModal,
		getAddressPredictions,
		selectedBox,
		resultTypes,
		predictions,
		getSelectedAddress,
		setSelectedBox,
		selectedAddress,
		distanceDirection,
		carMarker,
		nearByDrivers
	})=>{

	const { selectedPickUp, selectedDropOff } = selectedAddress || {};

	//console.log(distanceDirection);
	// var groupLocation = decode(distanceDirection)|| null;
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
	var reg =selectedDropOff||selectedPickUp||region||defaultRegion;
	
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
				// showsUserLocation={true}
				// followsUserLocation={true}
				zoomEnabled={true}
				onPress={()=>{setSelectedBox('map')}}
			>
			{/* {region && <MapView.Marker
            coordinate={region}
            pinColor="red"
            title={"My location"}
            description={"My description"}
            // image={require('./src/Linux-Avatar.png')}
            // style={{width:300, height:100}}
          		/>
			} */}

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

				{ distanceDirection &&
					<MapView.Polyline
						coordinates={[
							{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude},
							...distanceDirection,
							{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}
						
						]}
						strokeColor="pink"
						strokeWidth={3}
					/>	
				}

		  	{
				nearByDrivers && nearByDrivers.map &&nearByDrivers.map((marker, index)=>
					<MapView.Marker
						key={index}
						coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
						image={carMarker}
						title={marker._id}
					/>	
				)
			}
			</MapView>
			<SearchBox 
				getInputData={getInputData} 
				toggleSearchResultModal={toggleSearchResultModal}
				selectedBox={selectedBox}
				setSelectedBox={setSelectedBox}
				getAddressPredictions={getAddressPredictions}
				selectedAddress={selectedAddress}
			/>
			{ (resultTypes.pickUp || resultTypes.dropOff) && selectedBox!=="map" &&
			<SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
			}
		</View>
	)
}

export default MapContainer;