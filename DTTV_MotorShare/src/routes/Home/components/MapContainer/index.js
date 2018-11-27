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
		selectedBox,
		resultTypes,
		predictions,
		getSelectedAddress,
		selectedAddress,
		distanceDirection,
		carMarker,
		nearByDrivers
	})=>{

	const { selectedPickUp, selectedDropOff } = selectedAddress || {};

	// var decode = (t,e)=>{
	// 	if(!t||!e) return d=null;
	// 	for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;)
	// 		{a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
	// 	return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
	// };
	// // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

	console.log(distanceDirection);
	// var groupLocation = decode(distanceDirection)|| null;
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
				selectedBox={selectedBox}
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