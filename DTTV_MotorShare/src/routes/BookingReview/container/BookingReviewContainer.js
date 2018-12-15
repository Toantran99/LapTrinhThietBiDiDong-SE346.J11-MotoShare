import { connect } from "react-redux";
import BookingReview from "../components/BookingReview";
import {
    setName,
    getAccountInfo,
    setSelectedBox,
    getNearByDrivers
} from "../modules/bookingReview";

const bookingReviewStateToProps = (state) => ({
    name: state.home.name,
    accountInfo:state.home.accountInfo,
    nearByDrivers:state.home.nearByDrivers || []
});

const bookingReviewActionCreators = {
    setName,
    getAccountInfo,
    setSelectedBox,
    getNearByDrivers
};
export default connect(bookingReviewStateToProps, bookingReviewActionCreators)(BookingReview);