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
	CREATE_ACCOUNT,
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
export function createAccount(name,dob, phoneNumber, email, dCreate, profilePic, vehicle, userName, password){
	return(dispatch, store)=>{
		const account = {
			
		}
		const payload = {
			data:{
				name: name,
				dob: dob.toString(),
				phoneNumber: phoneNumber,
				email: email,
				rating: "5",
				dCreate: dCreate.toString(),
				profilePic: profilePic,
				vehicle: vehicle,
				account: {
					userName: userName,
            		password: password
				}
			}
		};
		console.log(account)
		request.post("http://"+myLocalHost+"/api/users")
		.send(payload)
		.finish((error, res)=>{
			res&&dispatch({
				type:CREATE_ACCOUNT,
				payload:res.body
			});
			error&&console.log(error);

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

function handleCreateAccount(state, action){
	return update(state,{
        accountCreationInfo:{
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
	CREATE_ACCOUNT: handleCreateAccount,
	SET_SELECTED_BOX: handleSetSelectedBox
}
const initialState = {
	name:{}
	
};

export function RegisterReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
