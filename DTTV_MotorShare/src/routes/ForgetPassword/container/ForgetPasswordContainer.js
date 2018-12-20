import { connect } from "react-redux";
import ForgetPassword from "../components/ForgetPassword";
import {
    setName,
    getEmail,
    setPassword
} from "../modules/forgetPassword";

const forgetPasswordStateToProps = (state) => ({
    name: state.forgetPassword.name||{},
    hasEmailAccount:state.forgetPassword.hasEmailAccount||{},
    changedAccount: state.forgetPassword.changedAccount||{}
});

const forgetPasswordActionCreators = {
    setName,
    getEmail,
    setPassword
};
export default connect(forgetPasswordStateToProps, forgetPasswordActionCreators)(ForgetPassword);