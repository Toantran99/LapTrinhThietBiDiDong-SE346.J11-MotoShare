import { connect } from "react-redux";
import SplashScreen from "../components/SplashScreen";
import {
    setName
} from "../modules/splashScreen";

const splashScreenStateToProps = (state) => ({
    name: state.splashScreen.name||{}
});

const splashScreenActionCreators = {
    setName
};
export default connect(splashScreenStateToProps, splashScreenActionCreators)(SplashScreen);