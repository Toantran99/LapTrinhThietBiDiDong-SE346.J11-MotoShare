/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Root from "./src/Main"
import Home from "./src/routes/Home/components/Home" 
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Root {...this.props}/>
        {/* <Text>JADKDJAKJDKAJDKADJKDJ</Text>
        <Image
                style={{width:10, height:10}}
                source={require('./src/assets/img.jpg')}
                />  */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
