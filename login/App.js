import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import LoginScreen from './src/components/Login/Login'
import HomeScreen from './src/components/Home/Home'
import SignupScreen from './src/components/SignUp/SignUp'
import ColabScreen from './src/components/Colab/Colab'

const Telas = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Colab: { screen: ColabScreen },
  Signup: { screen: SignupScreen },
}, {
  initialRouteName: 'Login',
});

//AppRegistry.registerComponent('login', () => Telas);

export default createAppContainer(Telas);

