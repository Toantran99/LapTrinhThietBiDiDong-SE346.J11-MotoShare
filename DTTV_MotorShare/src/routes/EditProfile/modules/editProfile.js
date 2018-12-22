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
	UPDATE_PROFILE
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

export function updateProfile(name, dob, phoneNumber, email){
    return(dispatch,store)=>{
        let myId=store().login.loginInfo?store().login.loginInfo._id:"5c1300effb6fc04dd6ec86e1";
        request.put("http://"+myLocalHost+":3000/api/user/"+myId)
        	.query({
        		name: name,
                dob: dob,
                phoneNumber: phoneNumber,
                email: email
        	})
        	.finish((error, res)=>{
        		res&&
        			dispatch({
        				type:UPDATE_PROFILE,
        				payload: res.body
        			});
        		error&& console.log(error);
            });	
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

function handleUpdateProfile(state, action){
    return update(state,{
        updatedProfile:{
            $set:action.payload
        }
    })
}



const ACTION_HANDLERS = {
    SET_NAME:handleSetName,
    UPDATE_PROFILE:handleUpdateProfile
}
const initialState = {
	name:{}
	
};

export function EditProfileReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
