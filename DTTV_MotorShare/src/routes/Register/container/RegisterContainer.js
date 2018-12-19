import { connect } from "react-redux";
import Register from "../components/Register";
import {
    setName,
    createAccount,
    setSelectedBox
} from "../modules/register";

const registerStateToProps = (state) => ({
    name: state.register.name||{},
    accountCreationInfo: state.register.accountCreationInfo||{},
    selectedBox:state.register.selectedBox||{}
});

const registerActionCreators = {
    setName,
    createAccount,
    setSelectedBox
};
export default connect(registerStateToProps, registerActionCreators)(Register);