import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles, spacing } from '../styles';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export const MarkerItem = ({
  navigateToAR,
  id,
  is3d,
  index,
  markerImageUrl,
  thumbnailImage
}) => (
    <TouchableOpacity style={styles.itemWrapper} onPress={navigateToAR}>
      <Animatable.View  duration={300} animation="slideInLeft">
        <Image key={id} source={{uri: markerImageUrl || thumbnailImage }} style={styles.image}/>
        { is3d && (
          <Icon name="video-3d" size={30} color="#FFF"/>
        )}
      </Animatable.View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    height: 200,
    paddingTop: 10
  },
  itemWrapper: {
    padding: spacing[4],
    position: 'relative'
  },
  indicator: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 2,
    height: 2,
    backgroundColor: 'red'
  }
})