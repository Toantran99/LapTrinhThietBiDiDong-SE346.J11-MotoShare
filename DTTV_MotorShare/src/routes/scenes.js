import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/container/HomeContainer";
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";
import LoginContainer from "./Login/container/LoginContainer";
import BookingReview from "./BookingReview/container/BookingReviewContainer"

const scenes = Actions.create(
	<Scene key="root" hideNavBar>
		{/* <Scene key="login" component={LoginContainer} title="login" initial /> */}

		<Scene key="bookingReview" component={BookingReview} title="bookingReview" initial/>
		<Scene key="home" component={HomeContainer} title="home"/>
		<Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>
	</Scene>

);

export default scenes;