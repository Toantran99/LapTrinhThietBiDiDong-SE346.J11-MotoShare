import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import SplashScreen from "./SplashScreen/container/SplashScreenContainer";
import IntroductionContainer from "./Introduction/container/IntroductionContainer";
import LoginContainer from "./Login/container/LoginContainer";
import RegisterContainer from "./Register/container/RegisterContainer";
import ForgetPasswordContainer from "./ForgetPassword/container/ForgetPasswordContainer";
import HomeContainer from "./Home/container/HomeContainer";
import BookingReview from "./BookingReview/container/BookingReviewContainer"
import EditProfile from "./EditProfile/container/EditProfileContainer"
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";

const scenes = Actions.create(
	<Scene key="root" hideNavBar>
		<Scene key="splashScreen" component={SplashScreen} title="splashScreen" initial/>
		<Scene key="introduction" component={IntroductionContainer} title="introduction"/>
		<Scene key="login" component={LoginContainer} title="login" />
		<Scene key="forgetPassword" component={ForgetPasswordContainer} title="forgetPassword" />
		<Scene key="register" component={RegisterContainer} title="register" />

		<Scene key="home" component={HomeContainer} title="home" />
		<Scene key="bookingReview" component={BookingReview} title="bookingReview" />
		<Scene key="editProfile" component={EditProfile} title="editProfile" />
		<Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
	</Scene>

);

export default scenes;