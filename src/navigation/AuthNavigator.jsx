import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, Login, Home, DailyInsights } from '../screens';
import BottomNavigation from './BottomNavigation';
import React from 'react';
import { BackArrow } from '../components';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Register" component={SignUp} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomNavigation} />
      {/* <Stack.Screen name="DailyInsights" options={{}} component={DailyInsights} /> */}

    </Stack.Navigator>
  );
};

export default AuthNavigator;
