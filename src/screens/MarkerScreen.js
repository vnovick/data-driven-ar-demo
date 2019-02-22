'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARCamera,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad
} from 'react-viro';
import { graphql, Subscription } from 'react-apollo'

import gql from 'graphql-tag';
import { ModelComponent } from '../components/ModelComponent';

const MARKER_DETAILS = gql`
subscription fetchMarker($markerId: uuid!) {
  markers_by_pk(id: $markerId) {
    user {
      name
      lastname,
      twitterProfile,
      avatarUrl
    }
    bottomBar
  }
}
`;

const LoadingComponent = ({ text }) => (
    <ViroText position={[0,0,-6]} text={text} width={2} height={2} transformBehaviors={["billboard"]}/>
)


export class MarkerScreen extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <LoadingComponent text={initialized ? 'Initializing AR...' 
      : "No Tracking"}/>
    )
  }

  

  componentDidMount(){
    ViroARTrackingTargets.createTargets({
      "businessCard" : {
        source : { uri: this.props.markerImageUrl},
        orientation : "Up",
        physicalWidth : this.props.physicalWidth // real world width in meters
      }
    });
  }

  
  render3d(model) {
    return (
        <ViroNode>
          <ViroAmbientLight color="#FFFFFF"/>
          <ViroARImageMarker target={"businessCard"} onAnchorFound={(anchor3dModel) => {
            this.setState({
              anchorId: anchor3dModel.anchorId,
              runAnimation: true
            })
          }}>
            <ModelComponent model={this.props.model} runAnimation={this.state.runAnimation} />
          </ViroARImageMarker>
        </ViroNode>
    )
  }
  


  getARScene() {
    return (
      <ViroNode>
          <Subscription subscription={MARKER_DETAILS} variables={{ markerId: this.props.id }}>
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

              const markerData = data.markers_by_pk
              if (this.props.is3d) {
                return this.render3d()
              }
              return (
                <ViroARImageMarker target={"businessCard"} 
                  onAnchorFound={
                    () => this.setState({
                        runAnimation: true
                    })}
                >
                <ViroNode key="card" onTouch={() => alert("twitter")}>
                  <ViroNode 
                    opacity={0} position={[0, -0.02, 0]} 
                    animation={{
                      name:'animateImage', 
                      run: this.state.runAnimation 
                      }}
                  >
                    <ViroFlexView 
                        rotation={[-90, 0, 0]}
                        height={0.03} 
                        width={0.05}
                        style={styles.card} 
                    >
                      <ViroFlexView 
                        style={styles.cardWrapper} 
                      >
                        <ViroImage
                          height={0.015}
                          width={0.015}
                          style={styles.image}
                          source={{uri: markerData.user.avatarUrl}}
                        />
                        <ViroText 
                          textClipMode="None"
                          text={`${markerData.user.name} ${markerData.user.lastname}`}
                          scale={[.015, .015, .015]}
                          style={styles.textStyle}
                        />
                      </ViroFlexView>
                      <ViroFlexView 
                        style={styles.subText} 
                      >
                        <ViroText 
                          width={0.01}
                          height={0.01}
                          textAlign="left"
                          textClipMode="None"
                          text={`@${markerData.user.twitterProfile}`}
                          scale={[.01, .01, .01]}
                          style={styles.textStyle}
                        />
                        <ViroAnimatedImage
                          height={0.01}
                          width={0.01}
                          loop={true}
                          source={require('../res/tweet.gif')}
                        />
                      </ViroFlexView>
                    </ViroFlexView>
                  </ViroNode>  
                  <ViroNode opacity={0} position={[0, 0, 0]} 
                    animation={{
                      name:'animateViro', 
                      run: this.state.runAnimation 
                    }}
                  >
                    { markerData.bottomBar && <ViroText text={markerData.bottomBar}
                      rotation={[-90, 0, 0]}
                      scale={[.01, .01, .01]}
                      style={styles.textStyle}
                  /> }
                  </ViroNode>
                </ViroNode>
                </ViroARImageMarker>
              )
            }}
            
          </Subscription>
          <ViroQuad
            position={[0,0,0]}
            rotation={[-90, 0, 0]}
            height={10} 
            width={10}
            arShadowReceiver={true}
          />
      </ViroNode>
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
    );
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
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column' 
  },
  cardWrapper: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    padding: 0.001, 
    flex: .5
  },
  subText: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    flex: .5
  }
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce", 
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce", 
    duration: 500
}});

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

