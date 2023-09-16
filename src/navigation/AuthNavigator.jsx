import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, Login, Home } from '../screens';
import { StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Register" component={SignUp} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomNavigation} />
      {/* <Stack.Screen options={{headerShown: false }} name="UserProfile" component={BottomNavigation}/> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
