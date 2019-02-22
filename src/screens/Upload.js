import React, { Component } from 'react'
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { color, commonStyles, spacing } from '../styles'
import { Button } from "../components"
import { graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
const uuidv4 = require('uuid/v4');


const ADD_MARKER = gql`
  mutation addMarker($id: uuid!, $markerUrl:String!, $bottomBar: String, $avatarUrl: String!, $name: String, $lastname: String, $twitter: String!) { 
    insert_markers(objects:[{
      physicalWidth: 0.05,
      markerImageUrl: $markerUrl,
      bottomBar:$bottomBar
      user: {
        data:{
          id: $id,
          avatarUrl:$avatarUrl,
          name:$name,
          lastname:$lastname,
          twitterProfile:$twitter
        }
      }
    }]) {
      affected_rows
    }
  }
`;

export  class Upload extends Component {

  state = {
    name: "",
    lastName: "",
    twitter: "",
    freeText: "",
    avatarUrl: "",
    markerUrl: ""
  }

  changeState = (key) => (text) => {
    this.setState({
      [key]: text
    })
  }
  
  


  render() {
    return (
      <Mutation
        mutation={ADD_MARKER}
       >
      { (addMarker) => (
          <View style={styles.container}>
          <Text style={styles.header}>Create New Marker</Text>
          <View style={styles.formContainer}>
             <View style={styles.field}>
              <Text style={commonStyles.text}>Marker Url</Text>
              <TextInput 
                style={styles.input} 
                onChangeText={this.changeState("markerUrl")} 
                value={this.state.markerUrl}/>
            </View>
            <View style={styles.field}>
              <Text style={commonStyles.text}>Avatar Url</Text>
              <TextInput style={styles.input} onChangeText={this.changeState("avatarUrl")} value={this.state.avatarUrl}/>
            </View>
            <View style={styles.field}>
              <Text style={commonStyles.text}>user name</Text>
              <TextInput style={styles.input} onChangeText={this.changeState("name")} value={this.state.name}/>
            </View>
            <View style={styles.field}>
              <Text style={commonStyles.text}>lastname</Text>
              <TextInput style={styles.input} onChangeText={this.changeState("lastName")} value={this.state.lastName}/>
            </View>
            <View style={styles.field}>
              <Text style={commonStyles.text}>twitter</Text>
              <TextInput style={styles.input} onChangeText={this.changeState("twitter")} value={this.state.twitter}/>
            </View>
            <View style={styles.field}>
              <Text style={commonStyles.text}>additional data</Text>
              <TextInput style={styles.input} onChangeText={this.changeState("freeText")} value={this.state.freeText}/>
            </View>
          </View>
          <Button text="Add" onPress={() => {
            alert(JSON.stringify(this.state))
            addMarker({ variables: {
              id: uuidv4(),
              markerUrl: this.state.markerUrl,
              bottomBar: this.state.freeText,
              avatarUrl: this.state.avatarUrl,
              name: this.state.name,
              lastname: this.state.lastName,
              twitter: this.state.twitter
             } });
          }} />
          <Button text="Go Back" onPress={() => {
            this.props.navigation.navigate("Home")
          }} />
        </View>
      )}
    </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[7],
  },
  headerContainer: {
    marginBottom: spacing[4],
    padding: spacing[4],
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    ...commonStyles.header,
    paddingBottom: spacing[4]
  },
  formContainer: {
    marginBottom: spacing[3],
    alignSelf: 'flex-start',
    width: '100%'
  },
  field: {
    paddingBottom: spacing[2],
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    marginBottom: spacing[3]
  },
  input: {
    color: '#FFF',
    marginTop: spacing[3]
  },

})