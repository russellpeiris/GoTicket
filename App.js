import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AuthNavigator from './src/navigation/AuthNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoaded] = useFonts({
    'nunito-medium': require('./src/assets/fonts/Nunito-Medium.ttf'), // 'Nunito-Medium
    'nunito-regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
    'nunito-semi-bold': require('./src/assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
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
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

