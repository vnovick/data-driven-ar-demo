import React, { Component } from 'react';

import {StyleSheet, SafeAreaView, Button, View } from 'react-native';
import { graphql, Subscription } from 'react-apollo'
import { spacing } from "../styles"

import gql from 'graphql-tag';
import { commonStyles } from '../styles';

const FETCH_PORTALS = gql`
subscription fetchPortals($portalId: uuid!) {
  portals_by_pk(id:"d70cd1b6-ae6f-43ca-a66a-874d8c3ad473") {
    id
    portalMedia360
    thumbnailImage
  }
}
`;

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroPortalScene,
  ViroNode,
  ViroConstants,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroMaterials,
  ViroPortal,
  ViroText,
  Viro360Image
} from 'react-viro';


const LoadingComponent = ({ text }) => (
  <ViroText position={[0,0,-6]} text={text} width={2} height={2} transformBehaviors={["billboard"]}/>
)

export class ARPortalsScene extends Component {


  state = {
    isTracking: false,
    initialized: false,
  }


  getARScene(){
    return (
      <Subscription subscription={FETCH_PORTALS} variables={{ portalId: this.props.id }}>
        {({loading, error, data }) => {
          if (error) {
            alert("Error", "Could not fetch marker");
            return null;
          }

          if (loading) {
            return (
              <LoadingComponent text="Loading Marker" />
            )
          }

          return (
            <ViroARPlaneSelector dragType="FixedToWorld">
                <ViroPortalScene 
                  passable={true} dragType="FixedDistance" onDrag={()=>{}}>
                  <ViroPortal 
                    scale={[.5, .5, .5]}
                  >
                      <Viro3DObject
                        onLoadStart={() => {
                          alert("Loading portal")
                        }}
                        source={require('../res/portal_wood_frame.vrx')}
                        resources={[require('../res/portal_wood_frame_diffuse.png'),
                                    require('../res/portal_wood_frame_normal.png'),
                                    require('../res/portal_wood_frame_specular.png')]}
                        type="VRX"/>
                    </ViroPortal>
                  <Viro360Image source={{ uri: data.portals_by_pk.portalMedia360 }} />
                </ViroPortalScene>
            </ViroARPlaneSelector>
          )}}
        </Subscription>
    )
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <LoadingComponent text={initialized ? 'Initializing AR...' 
      : "No Tracking"}/>
    )
  }


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroDirectionalLight color="#777777"
          direction={[0, -1, -2]}
          shadowOrthographicPosition={[0, 8, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          lightInfluenceBitMask={2}
          castsShadow={true} 
        />
          { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
    )
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  }
});

 ViroMaterials.createMaterials({
  ground:{
    cullMode: "None",
    shininess: 2.0,
    diffuseColor: "#ff9999",
    lightingModel: "Blinn",
  }
 });
