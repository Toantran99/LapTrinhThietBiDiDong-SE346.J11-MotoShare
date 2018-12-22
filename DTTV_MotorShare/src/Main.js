import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, BackHandler } from "react-native";
//import { createStore } from "redux";

import createStore from "./store/createStore";
import AppContainer from "./AppContainer";
export default class Root extends Component {
  constructor (props) {
    super(props)
    this.onBackPress = this.onBackPress.bind(this)
    this.state={
      backpressed: false
    }
  }

  componentDidMount () {
    
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress () {
    console.log("Main: backpressed!");
    if (!this.state.backpressed)
      this.setState({backpressed:true});
    else
      BackHandler.exitApp();
    return true;
  }


  renderApp() {
    const initialState = window.___INITIAL_STATE__;
    const store = createStore(initialState);

    return(
        <AppContainer store={store}/>
    );

  }

  render() {
    return this.renderApp();
  }
}
