import { connect } from "react-redux";
import BookingReview from "../components/BookingReview";
import {
    setName,
    getAccountInfo,
    setSelectedBox
} from "../modules/bookingReview";

const bookingReviewStateToProps = (state) => ({
    name: state.bookingReview.name||{},
    accountInfo:state.bookingReview.accountInfo||{}
});

const bookingReviewActionCreators = {
    setName,
    getAccountInfo,
    setSelectedBox
};
export default connect(bookingReviewStateToProps, bookingReviewActionCreators)(BookingReview);