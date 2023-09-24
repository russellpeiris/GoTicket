import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
const Doctors = () => {
  const navigation = useNavigation();

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
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
  },
});
