import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import IntroductionContainer from "./Introduction/container/IntroductionContainer";
import LoginContainer from "./Login/container/LoginContainer";
import ForgetPasswordContainer from "./ForgetPassword/container/ForgetPasswordContainer";
import HomeContainer from "./Home/container/HomeContainer";
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";
import RegisterContainer from "./Register/container/RegisterContainer";
import BookingReview from "./BookingReview/container/BookingReviewContainer"

const scenes = Actions.create(
	<Scene key="root" hideNavBar>
		<Scene key="introduction" component={IntroductionContainer} title="introduction" />
		<Scene key="login" component={LoginContainer} title="login" initial/>
		<Scene key="forgetPassword" component={ForgetPasswordContainer} title="forgetPassword" />
		<Scene key="register" component={RegisterContainer} title="register" />
		<Scene key="home" component={HomeContainer} title="home" />
		
		<Scene key="bookingReview" component={BookingReview} title="bookingReview" />
		<Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
	</Scene>

);

export default scenes;