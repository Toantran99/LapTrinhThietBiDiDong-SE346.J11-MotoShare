import { connect } from "react-redux";
import Login from "../components/Login";
import {
    setName,
    getLoginInfo,
    setSelectedBox
} from "../modules/login";

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