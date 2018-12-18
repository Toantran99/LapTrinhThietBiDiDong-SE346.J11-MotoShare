import { connect } from "react-redux";
import BookingReview from "../components/BookingReview";
import {
    setName,
    getAccountInfo,
    getBookingHistory,
    setSelectedBox
} from "../modules/bookingReview";

const bookingReviewStateToProps = (state) => ({
    name: state.bookingReview.name||{},
    accountInfo:state.bookingReview.accountInfo||{},
    bookingHistory: state.bookingReview.bookingHistory||null
});

const bookingReviewActionCreators = {
    setName,
    getAccountInfo,
    getBookingHistory,
    setSelectedBox
};
export default connect(bookingReviewStateToProps, bookingReviewActionCreators)(BookingReview);