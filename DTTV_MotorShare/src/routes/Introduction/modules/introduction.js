import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import request from "../../../util/request";


//--------------------
//Constants
//--------------------
const { 
	SET_NAME
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


const ACTION_HANDLERS = {
	SET_NAME:handleSetName
}
const initialState = {
	name:{}
	
};

export function IntroductionReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
