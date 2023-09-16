import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Doctors, Home, Menu, UserProfile } from '../screens';
import React from 'react';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name= "Doctors" component={Doctors} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
