import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from './src/screens/SignUpScreen';
import React, { useEffect, useCallback } from 'react';
import LogInScreen from './src/screens/LogInScreen';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoaded] = useFonts({
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'), // 'Nunito-Medium
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semi-bold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={handleOnLayout}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Register" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LogInScreen} />
          <Stack.Screen options={{ headerShown: true }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
