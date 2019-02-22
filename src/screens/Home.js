import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { MarkerItem } from "../components";
import { SafeAreaView } from 'react-navigation';
import { Button } from "../components"
import { graphql, Subscription } from 'react-apollo'
import { spacing } from "../styles"

import gql from 'graphql-tag';
import { commonStyles } from '../styles';

const FETCH_MARKERS = gql`
  subscription fetchMarkers{
    markers {
      id
      is3d
      markerImageUrl
      physicalWidth
      user {
        name
        lastname,
        twitterProfile,
        avatarUrl
      }
      bottomBar
      model {
        url
        scale
        lightingModel
        resources {
          resourceType
          resourceUrl
        }
      }
    }
  }
`;

export class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  _uploadScreen = () => {
    this.props.navigation.navigate("Upload")
  }

  _navigateToAR = (item) => () => {
    this.props.navigation.navigate("ARScreen", item)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Subscription subscription={FETCH_MARKERS}>
            {({loading, error, data}) => {
              if (error) {
                alert("Error", "Could not fetch markers");
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
                  data={data.markers}
                  keyExtractor = {(item, index) => item.id}
                  renderItem={({ item }, index) => (
                    <MarkerItem 
                      {...item} 
                      index={index}
                      navigateToAR={this._navigateToAR(item)} 
                    />
                  )}
                />
              );
            }}
          </Subscription>
        <View style={styles.bottomPannel}>
          <Button text="Log out" onPress={this._signOutAsync}/>
        </View>
        <TouchableOpacity onPress={this._uploadScreen} style={styles.addButton}>
          <Icon name="add-circle-outline" size={50} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('ARScreen');
  };


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
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