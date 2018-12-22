import { connect } from "react-redux";
import EditProfile from "../components/EditProfile";
import {
    getAccountInfo
} from "../../BookingReview/modules/bookingReview";
import {
    setName, 
    updateProfile
} from "../modules/editProfile";

const editProfileStateToProps = (state) => ({
    name: state.editProfile.name||{},
    accountInfo:state.bookingReview.accountInfo,    
    updatedProfile: state.editProfile.updatedProfile
});

const editProfileActionCreators = {
    getAccountInfo,
    setName,
    updateProfile
};
export default connect(editProfileStateToProps, editProfileActionCreators)(EditProfile);