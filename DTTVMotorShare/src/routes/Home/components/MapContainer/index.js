import React from "react";
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
		resultTypes,
		predictions,
		getSelectedAddress,
		selectedAddress,
		carMarker,
		nearByDrivers
	})=>{

	const { selectedPickUp, selectedDropOff } = selectedAddress || {};

	return(
		<View style={styles.container}>
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>
			<MapView.Marker
            coordinate={region}
            pinColor="red"
            title={"My location"}
            description={"My description"}
            // image={require('./src/Linux-Avatar.png')}
            // style={{width:300, height:100}}
          		/>

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

		  	{
				nearByDrivers && nearByDrivers.map((marker, index)=>
					<MapView.Marker
						key={index}
						coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
						image={carMarker}
					/>	
				)
			}
			</MapView>
			<SearchBox 
				getInputData={getInputData} 
				toggleSearchResultModal={toggleSearchResultModal}
				getAddressPredictions={getAddressPredictions}
				selectedAddress={selectedAddress}
			/>
			{ (resultTypes.pickUp || resultTypes.dropOff) &&
			<SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
			}
		</View>
	)
}

export default MapContainer;