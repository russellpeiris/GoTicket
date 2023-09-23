import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
          <Text>Dashboard</Text>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
  },
});
