import { combineReducers } from "redux";
import {LoginReducer as login} from "../routes/Login/modules/login";
import {HomeReducer as home} from "../routes/Home/modules/home";
import {BookingReviewReducer as bookingReview} from "../routes/BookingReview/modules/bookingReview";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";

export const makeRootReducer = () => {
	return combineReducers({
			login,
			home,
			bookingReview,
			trackDriver
	});
}

export default makeRootReducer;