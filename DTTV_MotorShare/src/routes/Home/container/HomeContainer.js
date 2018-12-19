import { connect } from "react-redux";
import Home from "../components/Home";
import {
    setName,
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPredictions,
    getSelectedAddress,
    setSelectedBox,
    bookCar,
    cancelBookCar,
    getNearByDrivers
} from "../modules/home";
import{
    getAccountInfo
} from "../../BookingReview/modules/bookingReview"

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
    accountInfo:state.bookingReview.accountInfo||{},
    inputData:state.home.inputData || {},
    resultTypes:state.home.resultTypes || {},
    predictions:state.home.predictions ||  [],
    selectedAddress:state.home.selectedAddress || {},
    selectedBox:state.home.selectedBox,
    distanceDirection:state.home.distanceDirection,
    fare:state.home.fare,
    booking:state.home.booking || {},
    nearByDrivers:state.home.nearByDrivers || []
});

const mapActionCreators = {
    setName,
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPredictions,
    getSelectedAddress,
    setSelectedBox,
    bookCar,
    cancelBookCar,
    getNearByDrivers,
    getAccountInfo
};
export default connect(mapStateToProps, mapActionCreators)(Home);