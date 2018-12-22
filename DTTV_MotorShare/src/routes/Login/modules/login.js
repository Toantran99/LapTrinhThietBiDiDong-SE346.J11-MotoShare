import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import request from "../../../util/request";
import {myLocalHost} from "../../../util/serverConnection";


//--------------------
//Constants
//--------------------
const { 
	SET_NAME,
	GET_LOGIN_INFO,
	SET_SELECTED_BOX
} = constants;

const { width, height } = Dimensions.get("window");


//--------------------
//Variables
//--------------------



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
export function getLoginInfo(userName,password){
	return(dispatch, store)=>{
		if(!userName||!password) return;

		request.get("http://"+myLocalHost+":3000/api/userlogin")
		.query({
			userName:userName,
			password:password
		})
		.finish((error, res)=>{
			res&&
				dispatch({
					type:GET_LOGIN_INFO,
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

function handleGetLoginInfo(state, action){
	return update(state,{
        loginInfo:{
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
	GET_LOGIN_INFO: handleGetLoginInfo,
	SET_SELECTED_BOX: handleSetSelectedBox
}
const initialState = {
	name:{}
	
};

export function LoginReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
