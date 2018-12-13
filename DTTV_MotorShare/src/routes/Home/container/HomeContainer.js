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

const mapStateToProps = (state) => ({
    name: state.home.name,
    region: state.home.region,
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
    getNearByDrivers
};
export default connect(mapStateToProps, mapActionCreators)(Home);