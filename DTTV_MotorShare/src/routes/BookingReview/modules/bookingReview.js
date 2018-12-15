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
    SET_SELECTED_BOX,
	GET_NEARBY_DRIVERS
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

//get Account info
export function getAccountInfo(){

	var id =/*"u0000001";*/ "5c1300effb6fc04dd6ec86e1";
	return(dispatch, store)=>{
		request.get("http://"+myLocalHost+":3000/api/users/"+id)
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

//get selected box
export function setSelectedBox(payload){
	//if(store().home.inputData.pickUp||store().home.inputData.dropOff)
	return{
		type:SET_SELECTED_BOX,
		payload
	}
}

//get nearby drivers
export function getNearByDrivers(){
	return(dispatch, store)=>{
		if(!isPositionChanged) return;
		// if(!store().home.region||!store().home.region.latitude) return;
		request.get("http://"+myLocalHost+":3000/api/driverLocation")
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
	console.log(state);
	return update(state,{
        accountInfo:{
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

//handle get nearby drivers
function handleGetNearbyDrivers(state, action){
	return update(state, {
		nearByDrivers:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
	SET_NAME:handleSetName,
	GET_ACCOUNT_INFO: handleGetAccountInfo,
	SET_SELECTED_BOX: handleSetSelectedBox,
	GET_NEARBY_DRIVERS:handleGetNearbyDrivers
}
const initialState = {
	name:{},
	accountInfo:{}
	
};

export function BookingReviewReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
