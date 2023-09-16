import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';
import { Home, Menu } from '../screens';
import UserProfile from '../screens/UserProfile';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
      name='Dashboard'
      component={Home}
      />
      <Tab.Screen
      name='Profile'
      component={UserProfile}
      />
      <Tab.Screen
      name='Menu'
      component={Menu}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})