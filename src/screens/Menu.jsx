import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components';
import { auth } from '../config/firebase';
import React from 'react';
import { MenuButton } from '../components/buttons/menuButtons';

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
        <ScrollView style={{ padding: 16}}>       
           <MenuButton text="User Profile" onPress={() => navigation.navigate('Menu')} 
          />
           <View style={styles.buttonGap} /> 
           <MenuButton text="View QR Code" onPress={() => navigation.navigate('ViewQR')} 
          />
          <View style={styles.buttonGap} /> 
           <MenuButton text="Scan Passengers" onPress={() => navigation.navigate('ScanQRCode')} 
          />
           <View style={styles.buttonGap} /> 
          <MenuButton text="Logout" onPress={handleSignOut} />
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
  },
  buttonGap: {
    marginTop:16,
  }
});
