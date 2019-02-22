import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { SignIn, Home, ARScreen, AuthLoadingScreen, Upload, PortalsList } from '../screens'

const AppStack = createBottomTabNavigator({
  Markers: createStackNavigator({ 
    Home: Home, 
    ARScreen: ARScreen 
  }),
  Portals: createStackNavigator({ 
    Portals: PortalsList, 
    ARPortalScreen: ARScreen 
  })
});
const AuthStack = createStackNavigator({ SignIn: SignIn }); 

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Upload
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
