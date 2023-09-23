import { LoaderProvider, useLoader } from './src/context/LoaderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { Loader } from './src/components';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

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
      <LoaderProvider>
        <AppContents />
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </LoaderProvider>
    </SafeAreaProvider>
  );
}

function AppContents() {
  const { isLoading } = useLoader();

  return <Loader visible={isLoading} />;
}
