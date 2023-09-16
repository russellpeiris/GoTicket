import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components';
import { auth } from '../config/firebase';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const Home = () => {
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
    <SafeAreaView>
      <PrimaryButton text="Logout" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
