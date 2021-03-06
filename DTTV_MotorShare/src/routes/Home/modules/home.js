import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions, NativeModules} from "react-native";
import RNGooglePlaces from "react-native-google-places"; 

import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator.js";
import {myLocalHost} from "../../../util/serverConnection";


//--------------------
//Constants
//--------------------
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION, 
	UPDATE_LOCATION,
	GET_INPUT, 
	TOGGLE_SEARCH_RESULT,
	GET_ADDRESS_PREDICTIONS,
	SET_SELECTED_BOX,
	GET_SELECTED_ADDRESS,
	GET_DISTANCE_MATRIX,
	GET_DISTANCE_DIRECTION,
	GET_FARE,
	BOOK_CAR,
	CHANGE_BOOKING_STATUS,
	GET_NEARBY_DRIVERS,
	GET_NEARBY_BOOKINGS
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

// //--------------------
// //Get Localhost IP
// //--------------------
// const scriptURL = NativeModules.SourceCode.scriptURL;
// const myAddress = scriptURL.split('://')[1].split('/')[0];
// // const myLocalHost = "192.168.0.106";
// const myLocalHost = myAddress.split(':')[0];
// const myPort = myAddress.split(':')[1];

//--------------------
//Variables
//--------------------
var isPositionChanged = false;


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
	return(dispatch, store)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				//Trường hợp không bật GPS
				if(position.coords.latitude==0 && position.coords.longitude==0 
					&& position.coords.heading==0 && position.coords.speed==0) return;

				//Tọa độ GPS cập nhật mới, tránh nhận lại tọa độ cũ nhiều lần liên tiếp
				if(!store().home.region.latitude || (position.coords.latitude!=store().home.region.latitude
					|| position.coords.longitude!=store().home.region.longitude)) {
					dispatch({
						type:GET_CURRENT_LOCATION,
						payload:position
					});
					isPositionChanged = true;
					// console.log(store().login.loginInfo._id);
					let myId=store().login.loginInfo?store().login.loginInfo._id:"5c1300effb6fc04dd6ec86e1";
					request.put("http://"+myLocalHost+"/api/user/"+myId)
					.query({
						latitude: position.coords.latitude,
                    	longitude: position.coords.longitude
					})
					.finish((error, res)=>{
						res&&
							dispatch({
								type:UPDATE_LOCATION,
								payload: res.body
							});
						error&& console.log(error);
					});	
				}
				
			},
            (error)=> {console.log(error.message);
            },
			{enableHighAccuracy: true, timeout: 20000}
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
export function setSelectedBox(payload){
	//if(store().home.inputData.pickUp||store().home.inputData.dropOff)
	return{
		type:SET_SELECTED_BOX,
		payload
	}
}

//get selected address
// transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
var decode = (t,e)=>{
	if(!t) return;
	for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;)
		{a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
		return d=d.map(function(t)
		{return{latitude:t[0],longitude:t[1]}})};
//main function get selected address
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
export function bookCar(time){

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
				userName:store().bookingReview.accountInfo.account.userName,
				pickUp:{
					address:store().home.selectedAddress.selectedPickUp.address,
					name:store().home.selectedAddress.selectedPickUp.name,
					coordinates:[parseFloat(store().home.selectedAddress.selectedPickUp.longitude),
								parseFloat(store().home.selectedAddress.selectedPickUp.latitude)
					]
				},
				dropOff:{
					address:store().home.selectedAddress.selectedDropOff.address,
					name:store().home.selectedAddress.selectedDropOff.name,
					coordinates:[parseFloat(store().home.selectedAddress.selectedDropOff.longitude),
								parseFloat(store().home.selectedAddress.selectedDropOff.latitude)
					]
				},
				fare:store().home.fare,
				time: time.toString(),
				status:"pending"
			},
			nearByDriver:{
				socketId:nearByDriver.socketId,
				driverId:nearByDriver.driverId,
				latitude:nearByDriver.coordinate.coordinates[1],
				longitude:nearByDriver.coordinate.coordinates[0]
			}
		};
		console.log(payload);
		request.post("http://"+myLocalHost+"/api/bookings")
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

//Change booking status
export function changeBookingStatus(booking, status, changerId){
	
	return (dispatch, store)=>{
		// var payload = store().home.booking;
		// var payload = booking;

		var dataToSend = {
			oldInfo: booking,
			"status": status,
			"changer": changerId
		};

		request.put("http://"+myLocalHost+"/api/changeBooking/"+booking._id)
		.send(dataToSend)
		.finish((error, res)=>{
			dispatch({
				type:CHANGE_BOOKING_STATUS,
				payload:res.body
			});
			console.log(error);
		});
	}
}

//get nearby drivers

export function getNearByDrivers(){
	return(dispatch, store)=>{
		if(!isPositionChanged) return;
		// if(!store().home.region||!store().home.region.latitude) return;
		request.get("http://"+myLocalHost+"/api/driverLocation")
		.query({
			latitude:store().home.region.latitude,
			longitude:store().home.region.longitude	
		})
		.finish((error, res)=>{
			// if(res && JSON.stringify(res.body)!=JSON.stringify(store().home.nearByDrivers))
			res&&
				dispatch({
					type:GET_NEARBY_DRIVERS,
					payload:res.body
				});
			isPositionChanged = false;
			error&& console.log(error);

		});
	};
}

//get nearby bookings
export function getNearByBookings(){
	return(dispatch, store)=>{
		if(!isPositionChanged) return;
		// if(!store().home.region||!store().home.region.latitude) return;
		request.get("http://"+myLocalHost+"/api/bookingLocation")
		.query({
			userName:store().login.loginInfo?store().login.loginInfo.account.userName:"bdtren",
			latitude:store().home.region.latitude,
			longitude:store().home.region.longitude	
		})
		.finish((error, res)=>{
			// if(res && JSON.stringify(res.body)!=JSON.stringify(store().home.nearByDrivers))
			res&&
				dispatch({
					type:GET_NEARBY_BOOKINGS,
					payload:res.body
				});
			isPositionChanged = false;
			error&& console.log(error);

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
	//if(!action.payload) return;

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

function handleUpdateLocation(state, action){
	return update(state, {
		updatedLocation:{
			$set:action.payload
		}
	})
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
			// selectedBox:{
			// 	$set:"pickUp"
			// },
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
			// selectedBox:{
			// 	$set:"dropOff"
			// },
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

function handleSetSelectedBox(state, action){
	return update(state, {
		selectedBox:{
			$set:action.payload
		}
	})
}

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
function handleChangeBookingStatus(state, action){
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

//handle get nearby booking
function handleGetNearbyBookings(state, action){
	return update(state, {
		nearByBookings:{
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
	UPDATE_LOCATION: handleUpdateLocation,
	GET_INPUT:handleGetInputData,
	TOGGLE_SEARCH_RESULT:handleToggleSearchResult,
	GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
	SET_SELECTED_BOX: handleSetSelectedBox,
	GET_SELECTED_ADDRESS:handleGetSelectedAddress,
	GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
	GET_DISTANCE_DIRECTION:handleGetDistanceDirection,
	GET_FARE:handleGetFare,
	BOOK_CAR:handleBookCar,
	CHANGE_BOOKING_STATUS:handleChangeBookingStatus,
	GET_NEARBY_DRIVERS:handleGetNearbyDrivers,
	GET_NEARBY_BOOKINGS:handleGetNearbyBookings,
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
