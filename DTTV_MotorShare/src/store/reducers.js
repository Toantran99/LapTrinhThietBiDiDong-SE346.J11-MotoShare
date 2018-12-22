import { combineReducers } from "redux";
import {SplashScreenReducer as splashScreen} from "../routes/SplashScreen/modules/splashScreen";
import {IntroductionReducer as introduction} from "../routes/Introduction/modules/introduction";
import {LoginReducer as login} from "../routes/Login/modules/login";
import {ForgetPasswordReducer as forgetPassword} from "../routes/ForgetPassword/modules/forgetPassword";
import {RegisterReducer as register} from "../routes/Register/modules/register";
import {HomeReducer as home} from "../routes/Home/modules/home";
import {BookingReviewReducer as bookingReview} from "../routes/BookingReview/modules/bookingReview";
import {EditProfileReducer as editProfile} from "../routes/EditProfile/modules/editProfile";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";

export const makeRootReducer = () => {
	return combineReducers({
		splashScreen,
		introduction,
		login,
		forgetPassword,
		register,
		home,
		bookingReview,
		editProfile,
		trackDriver
	});
}

export default makeRootReducer;