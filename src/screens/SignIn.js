import React, { Component } from 'react'
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Button, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { color, commonStyles, spacing } from '../styles'

export class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            Welcome to AR Business card viewer
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.field}>
            <Text style={commonStyles.text}>email</Text>
            <TextInput style={styles.input}/>
          </View>
          <View style={styles.field}>
            <Text style={commonStyles.text}>password</Text>
            <TextInput style={styles.input}/>
          </View>
        </View>
        <TouchableOpacity onPress={this._signInAsync} style={styles.button}>
          <Text style={[styles.buttonText, commonStyles.text]}>
            Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'token');
    this.props.navigation.navigate('App');
  };
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
  button: {
    width: 200,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20
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
    marginTop: spacing[3]
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  }
})