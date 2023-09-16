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
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
