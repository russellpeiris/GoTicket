import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../components';
import { auth } from '../config/firebase';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const Menu = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
      <ScrollView style={{padding: 16}}>
      <PrimaryButton text="Logout" onPress={handleSignOut} />
      </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};


export default Menu

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
  }
});
