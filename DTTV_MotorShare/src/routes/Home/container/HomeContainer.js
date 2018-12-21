import { connect } from "react-redux";
import Home from "../components/Home";
import{
    getLoginInfo
} from "../../Login/modules/login"
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
    getNearByDrivers,
    getNearByBookings
} from "../modules/home";
import{
    getAccountInfo
} from "../../BookingReview/modules/bookingReview"

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
    accountInfo:state.bookingReview.accountInfo||{},
    updatedLocation:state.home.updatedLocation||{},
    loginInfo:state.login.loginInfo||{},
    inputData:state.home.inputData || {},
    resultTypes:state.home.resultTypes || {},
    predictions:state.home.predictions ||  [],
    selectedAddress:state.home.selectedAddress || {},
    selectedBox:state.home.selectedBox,
    distanceDirection:state.home.distanceDirection,
    fare:state.home.fare,
    booking:state.home.booking || {},
    nearByDrivers:state.home.nearByDrivers || [],
    nearByBookings:state.home.nearByBookings || []
    
});

const mapActionCreators = {
    setName,
    getLoginInfo,
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPredictions,
    getSelectedAddress,
    setSelectedBox,
    bookCar,
    cancelBookCar,
    getNearByDrivers,
    getNearByBookings,
    getAccountInfo
};
export default connect(mapStateToProps, mapActionCreators)(Home);