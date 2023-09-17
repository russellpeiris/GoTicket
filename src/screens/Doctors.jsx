import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
const Doctors = () => {
  const navigation = useNavigation();

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
      <ScrollView >
      <Text>Doctors</Text>
      </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
  }
});
