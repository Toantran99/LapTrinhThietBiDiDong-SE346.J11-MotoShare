import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions, NativeModules} from "react-native";
import RNGooglePlaces from "react-native-google-places"; 

import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator.js";


//--------------------
//Constants
//--------------------
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION, 
	GET_INPUT, 
	TOGGLE_SEARCH_RESULT,
	GET_ADDRESS_PREDICTIONS,
	GET_SELECTED_BOX,
	GET_SELECTED_ADDRESS,
	GET_DISTANCE_MATRIX,
	GET_DISTANCE_DIRECTION,
	GET_FARE,
	BOOK_CAR,
	CANCEL_BOOK_CAR,
	GET_NEARBY_DRIVERS
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

//--------------------
//Get Localhost IP
//--------------------
const scriptURL = NativeModules.SourceCode.scriptURL;
const myAddress = scriptURL.split('://')[1].split('/')[0];
const myLocalHost = /*"192.168.0.102";*/myAddress.split(':')[0];
const myPort = myAddress.split(':')[1];

//--------------------
//Actions
//--------------------
export function setName(){
    return{
        type:SET_NAME,
        payload:"BDtren"
    }
}


export function getCurrentLocation(){
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
            (error)=> {console.log(error.message);
            },
			{enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
		);
	}
}

//GET USER INPUT
export function getInputData(payload){
	
	return{
		type:GET_INPUT,
		payload
	}
}

//toggle search result modal
export function toggleSearchResultModal(payload){
	return{
		type:TOGGLE_SEARCH_RESULT,
		payload
	}
}

//GET ADDRESSES FROM GOOGLE PLACE
export function getAddressPredictions(){
	return(dispatch, store)=>{
		let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
		RNGooglePlaces.getAutocompletePredictions(userInput,
			{
				country:"VN"
			}
		)
		.then((results)=>
			dispatch({
				type:GET_ADDRESS_PREDICTIONS,
				payload:results
			})
		)
		.catch((error)=> console.log(error.message));
	};
}

//get selected box
export function getSelectedBox(payload){
	//if(store().home.inputData.pickUp||store().home.inputData.dropOff)
    return(dispatch, store)=>{
        dispatch({type:GET_SELECTED_BOX,
		payload
		})
    }
}

//get selected address
var decode = (t,e)=>{
	if(!t) return;
	for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;)
		{a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
		return d=d.map(function(t)
		{return{latitude:t[0],longitude:t[1]}})};
// transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
export function getSelectedAddress(payload){
	const dummyNumbers ={
		baseFare:0.4,
		timeRate:0.14,
		distanceRate:0.97,
		surge:1
	}
	return(dispatch, store)=>{
		RNGooglePlaces.lookUpPlaceByID(payload)
		.then((results)=>{
			dispatch({
				type:GET_SELECTED_ADDRESS,
				payload:results
			})
		})
		.then(()=>{
			//Get the distance and time
			if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
					destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
					mode:"driving",
					key:"AIzaSyBanG6PT1VCc9mc8bBoWFQnnS5JIeKkqf0"

				})
				.finish((error, res)=>{
					dispatch({
						type:GET_DISTANCE_MATRIX,
						payload:res.body
					});
				});

				request.get("https://maps.googleapis.com/maps/api/directions/json")
				.query({
					origin:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
					destination:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
					mode:"driving",
					key:"AIzaSyBanG6PT1VCc9mc8bBoWFQnnS5JIeKkqf0"
				})
				.finish((error,res)=>{
					if(res.body.routes.length){
						dispatch({
							type:GET_DISTANCE_DIRECTION,
							//payload:res.body.routes[0].overview_polyline.points
							payload:decode(res.body.routes[0].overview_polyline.points)
						})
					}
				});
			}
			setTimeout(function(){
				if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
					const fare = calculateFare(
						dummyNumbers.baseFare,
						dummyNumbers.timeRate,
						store().home.distanceMatrix.rows[0].elements[0].duration.value,
						dummyNumbers.distanceRate,
						store().home.distanceMatrix.rows[0].elements[0].distance.value,
						dummyNumbers.surge,
					);
					dispatch({
						type:GET_FARE,
						payload:fare
					})
				}
			},2000)

		})
		.catch((error)=> console.log(error.message));
	}
}

//BOOK CAR
export function bookCar(){
	return (dispatch, store)=>{
		const Drivers = store().home.nearByDrivers;
		const selectedAddress= store().home.selectedAddress;
		if(!Drivers ||!selectedAddress.selectedPickUp||!selectedAddress.selectedDropOff) return;

		// var choose = Math.floor(Math.random() * Drivers.length);
		var choose = 1;
		console.log(choose);
		const nearByDriver = Drivers[choose];
		const payload = {
			data:{
				userName:"bdtren",
				pickUp:{
					address:store().home.selectedAddress.selectedPickUp.address,
					name:store().home.selectedAddress.selectedPickUp.name,
					latitude:store().home.selectedAddress.selectedPickUp.latitude,
					longitude:store().home.selectedAddress.selectedPickUp.longitude
				},
				dropOff:{
					address:store().home.selectedAddress.selectedDropOff.address,
					name:store().home.selectedAddress.selectedDropOff.name,
					latitude:store().home.selectedAddress.selectedDropOff.latitude,
					longitude:store().home.selectedAddress.selectedDropOff.longitude
				},
				fare:store().home.fare,
				status:"pending"
			},
			nearByDriver:{
				socketId:nearByDriver.socketId,
				driverId:nearByDriver.driverId,
				latitude:nearByDriver.coordinate.coordinates[1],
				longitude:nearByDriver.coordinate.coordinates[0]
			}
		};
		console.log("sending");
		request.post("http://"+myLocalHost+":3000/api/bookings")
		.send(payload)
		.finish((error, res)=>{
			dispatch({
				type:BOOK_CAR,
				payload:res.body
			});
			console.log(error);

		});

	};
}

//Cancel book car
export function cancelBookCar(){
	
	return (dispatch, store)=>{
		// const nearByDrivers = store().home.nearByDrivers;
		// var choose = Math.floor(Math.random() * nearByDrivers.length);
		// console.log(choose);
		// const nearByDriver = nearByDrivers[choose];
		var payload = store().home.booking;
		payload.status="cancelled";

		var dataToSend = {
			"id": payload._id,
			"status": payload.status,
		};

		request.put("http://"+myLocalHost+":3000/api/bookings/"+payload._id)
		.send(dataToSend)
		.finish((error, res)=>{
			dispatch({
				type:CANCEL_BOOK_CAR,
				payload:res.body
			});
			console.log(error);
		 });
	}
}

//get nearby drivers

export function getNearByDrivers(){
	return(dispatch, store)=>{
		request.get("http://"+myLocalHost+":3000/api/driverLocation")
		.query({
			latitude:store().home.region.latitude,
			longitude:store().home.region.longitude	
		})
		.finish((error, res)=>{
			if(res){
				dispatch({
					type:GET_NEARBY_DRIVERS,
					payload:res.body
				});
			}

		});
	};
}

//--------------------
//Action Handlers
//--------------------
function handleSetName(state, action){
    return update(state,{
        name:{
            $set:action.payload
        }
    })
}

function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set:action.payload.coords.latitude
			},
			longitude:{
				$set:action.payload.coords.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		}
	})
}

function handleGetInputData(state, action){
	const { key, value } = action.payload;
	return update(state, {
		inputData:{
			[key]:{
				$set:value
			}
		}
	});
}


function handleToggleSearchResult(state, action){
	if(action.payload === "pickUp"){
		return update(state, {
			resultTypes:{
				pickUp:{
					$set:true,
				},
				dropOff:{
					$set:false
				}
			},
			selectedBox:{
				$set:"pickUp"
			},
			predictions:{
				$set:{}
			},

		});
	}
	if(action.payload === "dropOff"){
		return update(state, {
			resultTypes:{
				pickUp:{
					$set:false,
				},
				dropOff:{
					$set:true
				}
			},
			selectedBox:{
				$set:"dropOff"
			},
			predictions:{
				$set:{}
			},
		});
	}
}

function handleGetAddressPredictions(state, action){
	return update(state, {
		predictions:{
			$set:action.payload
		}
	})
}

// function handleGetSelectedBox(state, action){
// 	if(action.payload === "pickUp"){
// 		return update(state, {
// 			selectedBox:{
// 				$set:"pickUp"
// 			}
// 		});
// 	}
// 	if(action.payload === "dropOff"){
// 		return update(state, {
// 			selectedBox:{
// 				$set:"dropOff"
// 			}
// 		});
// 	}
// }

function handleGetSelectedAddress(state, action){
	let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
	return update(state, {
		selectedAddress:{
			[selectedTitle]:{
				$set:action.payload
			}		
		},
		selectedBox:{
			$set:"resultBox"
		},
		resultTypes:{
			pickUp:{
				$set:false
			},
			dropOff:{
				$set:false
			}
		}
	})
}

function handleGetDistanceMatrix(state, action){
	return update(state, {
		distanceMatrix:{
			$set:action.payload
		}
	})
}


function handleGetDistanceDirection(state, action){
	return update(state, {
		distanceDirection:{
			$set:action.payload
		}
	})
}

function handleGetFare(state, action){
	return update(state, {
		fare:{
			$set:action.payload
		}
	})
}

//handle book car
function handleBookCar(state, action){
	return update(state, {
		booking:{
			$set:action.payload
		}
	})
}
//handle cancel book car
function handleCancelBookCar(state, action){
	return update(state, {
		booking:{
			$set:action.payload
		}
	})

}

//handle get nearby drivers
function handleGetNearbyDrivers(state, action){
	return update(state, {
		nearByDrivers:{
			$set:action.payload
		}
	});
}

//handle confirm from driver
function handleConfirmBooking(state, action){
	return update(state,{
		booking:{
			$set:action.payload
		}
	})
}

const ACTION_HANDLERS = {
    SET_NAME:handleSetName,
    GET_CURRENT_LOCATION:handleGetCurrentLocation,
	GET_INPUT:handleGetInputData,
	TOGGLE_SEARCH_RESULT:handleToggleSearchResult,
	GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
	//GET_SELECTED_BOX: handleGetSelectedBox,
	GET_SELECTED_ADDRESS:handleGetSelectedAddress,
	GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
	GET_DISTANCE_DIRECTION:handleGetDistanceDirection,
	GET_FARE:handleGetFare,
	BOOK_CAR:handleBookCar,
	CANCEL_BOOK_CAR:handleCancelBookCar,
	GET_NEARBY_DRIVERS:handleGetNearbyDrivers,
	BOOKING_CONFIRMED:handleConfirmBooking
}
const initialState = {
	region:{},
	inputData:{},
	resultTypes:{},
	selectedAddress:{}
};

export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
