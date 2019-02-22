import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { MarkerItem } from "../components";
import { SafeAreaView } from 'react-navigation';
import { Button } from "../components"
import { graphql, Subscription } from 'react-apollo'
import { spacing } from "../styles"

import gql from 'graphql-tag';
import { commonStyles } from '../styles';

const FETCH_PORTALS = gql`
subscription fetchPortals{
  portals {
    id
    thumbnailImage
  }
}
`;

export class PortalsList extends React.Component {
  static navigationOptions = {
    header: null
  };

  _navigateToAR = (item) => () => {
    this.props.navigation.navigate("ARPortalScreen", item)
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Subscription subscription={FETCH_PORTALS}>
            {({loading, error, data}) => {
              if (error) {
                alert("Error", "Could not fetch portal thumbnails");
                console.log(error);
                return null;
              }

              if (loading) {
                return (
                  <View style={styles.loadingScreen}>
                    <Text style={styles.loaderText}>Please Wait</Text>
                    <ActivityIndicator size="large" />
                  </View>
                )
              }
              return (
                <FlatList
                  style={styles.list}
                  data={data.portals}
                  keyExtractor = {(item, index) => item.id}
                  renderItem={({ item }, index) => (
                    <MarkerItem 
                      {...item} 
                      index={index}
                      navigateToAR={this._navigateToAR({ ...item, screenType: "portal" })} 
                    />
                  )}
                />
              );
            }}
          </Subscription>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  list: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20
  },
  image: {  
    height:200,
    paddingTop: 10
  },
  loaderText: {
    ...commonStyles.text,
    margin: spacing[3]
  },
  bottomPannel: {
    alignItems: 'center'
  }
})