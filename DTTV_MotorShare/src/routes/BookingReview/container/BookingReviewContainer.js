import { connect } from "react-redux";
import BookingReview from "../components/BookingReview";
import {
    setName,
    getAccountInfo,
    getBookingHistory,
    setBookingStatus,
    setSelectedBox
} from "../modules/bookingReview";

const bookingReviewStateToProps = (state) => ({
    name: state.bookingReview.name||{},
    accountInfo:state.bookingReview.accountInfo||{},
    bookingHistory: state.bookingReview.bookingHistory||null,
    bookingStatus: state.bookingReview.bookingStatus||null
});

const bookingReviewActionCreators = {
    setName,
    getAccountInfo,
    getBookingHistory,
    setBookingStatus,
    setSelectedBox
};
export default connect(bookingReviewStateToProps, bookingReviewActionCreators)(BookingReview);