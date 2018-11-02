import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
//import { createStore } from "redux";

import createStore from "./store/createStore";
import AppContainer from "./AppContainer";
export default class Root extends Component {
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
