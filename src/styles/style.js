import { StyleSheet } from 'react-native'
import { color, typography } from './'

//common styles which can be shared
export const commonStyles = StyleSheet.create({
  //tabbar stuff
  tabBar: {
    backgroundColor: color.background,
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.5,
  },
  tabBarLabel: {
    fontFamily: typography.primary,
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: color.background,
  },

  //text style
  text: {
    // fontFamily: typography.primary,
    color: color.text,
    fontSize: 15,
  },

  header: {
    color: color.text,
    fontSize: 30
  }
})
