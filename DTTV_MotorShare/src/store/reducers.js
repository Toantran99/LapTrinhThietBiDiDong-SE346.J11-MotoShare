import { combineReducers } from "redux";
import {HomeReducer as home} from "../routes/Home/modules/home";
import {BookingReviewReducer as bookingReview} from "../routes/BookingReview/modules/bookingReview";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";

export const makeRootReducer = () => {
	return combineReducers({
			home,
			bookingReview,
			trackDriver
	});
}

export default makeRootReducer;