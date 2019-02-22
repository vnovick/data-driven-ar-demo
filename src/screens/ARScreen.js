import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

import { commonStyles, spacing } from "../styles"
import { MarkerScreen, ARPortalsScene } from './';
import { Button } from '../components';

export class ARScreen extends Component {

  static navigationOptions = {
    header: null
  }
  
  state = {
    arEnabled: true
  }
  
  _goBack = () => {
    this.setState({
      arEnabled: false
    }, () => {
      this.props.navigation.goBack()
    })
  }

  getARView() {
    return this.state.arEnabled ? (
      <ViroARSceneNavigator 
        apiKey="1839C275-6929-45AF-B638-EF2DEE44C1D9"
        numberOfTrackedImages={this.props.numberOfTrackedImages || 1}
        initialScene={{
          scene: this.props.navigation.state.params.screenType === "portal" ? ARPortalsScene: MarkerScreen,
          passProps: this.props.navigation.state.params
        }}
      />
    ) : null
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.getARView()}
        <View style={styles.bottomTab}>
          <Button text="Go Back" onPress={this._goBack} />
        </View>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  bottomTab: {
    alignItems: 'center',
    margin: spacing[4]
  }
})
