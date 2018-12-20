import { connect } from "react-redux";
import Introduction from "../components/Introduction";
import {
    setName
} from "../modules/introduction";

const introductionStateToProps = (state) => ({
    name: state.introduction.name||{}
});

const introductionActionCreators = {
    setName
};
export default connect(introductionStateToProps, introductionActionCreators)(Introduction);