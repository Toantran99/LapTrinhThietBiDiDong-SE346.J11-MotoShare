import { connect } from "react-redux";
import Register from "../components/Register";
import {
    setName,
    getLoginInfo,
    setSelectedBox
} from "../modules/register";

const loginStateToProps = (state) => ({
    name: state.login.name||{},
    loginInfo: state.login.loginInfo||{},
    selectedBox:state.login.selectedBox||{}
});

const loginActionCreators = {
    setName,
    getLoginInfo,
    setSelectedBox
};
export default connect(loginStateToProps, loginActionCreators)(Login);