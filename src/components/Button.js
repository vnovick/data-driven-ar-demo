import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { color, commonStyles, spacing } from '../styles'

export const Button = ({
    onPress,
    text
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={[styles.buttonText, commonStyles.text]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  }
})
