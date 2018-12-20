import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions, NativeModules} from "react-native";
import request from "../../../util/request";


//--------------------
//Constants
//--------------------
const { 
	SET_NAME,
	GET_ACCOUNT_INFO,
	GET_BOOKING_HISTORY,
	SET_BOOKING_STATUS,
    SET_SELECTED_BOX
} = constants;

const { width, height } = Dimensions.get("window");


//--------------------
//Get Localhost IP
//--------------------
const scriptURL = NativeModules.SourceCode.scriptURL;
const myAddress = scriptURL.split('://')[1].split('/')[0];
// const myLocalHost = "192.168.0.106";
const myLocalHost = myAddress.split(':')[0];
const myPort = myAddress.split(':')[1];

//--------------------
//Variables
//--------------------
var historySearch = "";


//--------------------
//Actions
//--------------------
export function setName(){
    return{
        type:SET_NAME,
        payload:"BDtren"
    }
}

//get Account info
export function getAccountInfo(id){
	return(dispatch, store)=>{
		// console.log(store().login.loginInfo);
		// console.log(id);
		var ID = id?id:store().login.loginInfo[0]._id;
		// console.log("id"+ID);

		request.get("http://"+myLocalHost+":3000/api/users/"+ID)
		.finish((error, res)=>{
			res&&
				dispatch({
					type:GET_ACCOUNT_INFO,
					payload: res.body
				});
			error&& console.log(error);
		});	
	};
}

//get Booking history
export function getBookingHistory(title){

	var id =/*"u0000001";*/ "5c1300effb6fc04dd6ec86e1";
	if(title){
		return(dispatch, store)=>{
			request.get("http://"+myLocalHost+":3000/api/bookingHistory")
			.query({
				status:title
			})
			.finish((error, res)=>{
				res&&
					dispatch({
						type:GET_BOOKING_HISTORY,
						payload: res.body
					});
				error&& console.log(error);
			});	
		};
	}
	return(dispatch, store)=>{
		request.get("http://"+myLocalHost+":3000/api/bookings")
		.finish((error, res)=>{
			res&&
				dispatch({
					type:GET_BOOKING_HISTORY,
					payload: res.body
				});
			error&& console.log(error);
		});	
	};
}

//get Booking history
export function setBookingStatus(status, type){

	if(type!="update"&&type!="delete") return;
	var id =/*"u0000001";*/ "5c1300effb6fc04dd6ec86e1";
	if(type=="delete"){
		return(dispatch, store)=>{
			request.del("http://"+myLocalHost+":3000/api/bookings/"+status._id)
			.finish((error, res)=>{
				res&&
					dispatch({
						type:SET_BOOKING_STATUS,
						payload: res.body
					});

				error&& console.log(error);
			});	
		};
	}
	return;
	// return(dispatch, store)=>{
	// 	request.get("http://"+myLocalHost+":3000/api/bookings")
	// 	.finish((error, res)=>{
	// 		res&&
	// 			dispatch({
	// 				type:SET_BOOKING_STATUS,
	// 				payload: res.body
	// 			});
	// 		error&& console.log(error);
	// 	});	
	// };
}

//get selected box
export function setSelectedBox(payload){
	//if(store().home.inputData.pickUp||store().home.inputData.dropOff)
	return{
		type:SET_SELECTED_BOX,
		payload
	}
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

function handleGetAccountInfo(state, action){
	return update(state,{
        accountInfo:{
			$set: action.payload
        }
	})
}

function handleGetBookingHistory(state, action){
	// var title = 
	return update(state,{
        bookingHistory:{
			$set: action.payload
        }
	})
}

function handleSetBookingStatus(state, action){
	return update(state,{
        bookingStatus:{
			$set: action.payload
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

const ACTION_HANDLERS = {
	SET_NAME:handleSetName,
	GET_ACCOUNT_INFO: handleGetAccountInfo,
	GET_BOOKING_HISTORY:handleGetBookingHistory,
	SET_BOOKING_STATUS:handleSetBookingStatus,
	SET_SELECTED_BOX: handleSetSelectedBox
}
const initialState = {
	name:{},
	accountInfo:{}
	
};

export function BookingReviewReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
