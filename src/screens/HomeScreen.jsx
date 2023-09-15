import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components';
import { auth } from '../config/firebase';
import React from 'react';
const HomeScreen = () => {
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
    <View>
      <PrimaryButton text="Logout" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
