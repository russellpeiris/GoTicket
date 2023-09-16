import { MenuIcon, HomeIcon, AvatarIcon, DoctorIcon } from '../assets/icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Doctors, Home, Menu, UserProfile } from '../screens';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Platform } from 'react-native';
import theme from '../../theme';
import React from 'react';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const navigation = useNavigation();

  const getTabBarIcon = (route, focused, color) => {
    if (route.name === 'Dashboard') {
      return <HomeIcon width={24} height={24} fill={color} />;
    } else if (route.name === 'Profile') {
      return <AvatarIcon width={24} height={24} fill={color} />;
    } else if (route.name === 'Doctors') {
      return <DoctorIcon width={24} height={24} fill={color} />;
    } else if (route.name === 'Menu') {
      return <MenuIcon width={24} height={24} fill={color} />;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: theme.inactiveGray,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.primaryPink,
        tabBarIcon: ({ color, size, focused }) =>
          // Here, use your custom icon component HomeIcon
          getTabBarIcon(route, focused, color),
      })}
    >
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Doctors" component={Doctors} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: 63,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0, 
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 100,
    shadowRadius: 2,
    elevation: 3,
    // shadowColor: '#000', shadowOffset: { width: 0, height: 0.4 }, shadowOpacity: 0.5 
  },
});
