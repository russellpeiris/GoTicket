import {
    DailyInsights,
    Doctors,
    Home,
    Menu,
    UserProfile,
    TopUp,
    VisaCards,
    AddVisa,
    ViewQR,
    Dashboard,
    AllPass,
    BusData,
    EarningsScreen,
  } from '../screens';
  import { MenuIcon, HomeIcon, AvatarIcon, DoctorIcon } from '../assets/icons';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { BottomTabBar } from '@react-navigation/bottom-tabs';
  import { useNavigation } from '@react-navigation/native';
  import { colors, dimen, typography } from '../../theme';
  import { StyleSheet, View } from 'react-native';
  import { BackArrow } from '../components';
  import React from 'react';
  
  const Tab = createBottomTabNavigator();
  const ConductorNavigation = () => {
    const navigation = useNavigation();
  
    const getTabBarIcon = (route, focused, color) => {
      if (route.name === 'Dashboard') {
        return <HomeIcon width={dimen.icon} height={dimen.icon} fill={color} />;
      } else if (route.name === 'Profile') {
        return <AvatarIcon width={dimen.icon} height={dimen.icon} fill={color} />;
      } else if (route.name === 'Doctors') {
        return <DoctorIcon width={dimen.icon} height={dimen.icon} fill={color} />;
      } else if (route.name === 'Menu') {
        return <MenuIcon width={dimen.icon} height={dimen.icon} fill={color} />;
      }
   
    };
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: colors.inactiveGray,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primaryPink,
          tabBarIcon: ({ color, size, focused }) => getTabBarIcon(route, focused, color),
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
          options={({ navigation, route }) => ({
            title: 'Profile',
            headerShown: true,
            headerLeft: () => <BackArrow />,
          })}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={({ navigation, route }) => ({
            title: 'Menu',
            headerShown: true,
            // tabBarItemStyle: {display: 'none'},
            // tabBarStyle: {display: 'none'},
            headerLeft: () => <BackArrow />,
          })}
        />
        <Tab.Screen
          name="AddVisa"
          options={({ navigation, route }) => ({
            title: 'Add a card',
            headerShown: true,
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
            headerLeft: () => <BackArrow />,
          })}
          component={AddVisa}
        />
          <Tab.Screen
          name="ViewQR"
          component={ViewQR}
          options={({ navigation, route }) => ({
            title: 'User QR',
            headerShown: true,
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
            headerLeft: () => <BackArrow />,
          })}      
        />
         <Tab.Screen
          name="AllPass"
          component={AllPass}
          options={({ navigation, route }) => ({
            title: 'All passes',
            headerShown: true,
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
            headerLeft: () => <BackArrow />,
          })}      
        />
         <Tab.Screen
          name="BusData"
          component={BusData}
          options={({ navigation, route }) => ({
            title: 'Bus Data',
            headerShown: true,
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
            headerLeft: () => <BackArrow />,
          })}      
        />
         <Tab.Screen
          name="Earnings"
          component={EarningsScreen}
          options={({ navigation, route }) => ({
            title: 'Earnings',
            headerShown: true,
            tabBarItemStyle: { display: 'none' },
            tabBarStyle: { display: 'none' },
            headerLeft: () => <BackArrow />,
          })}      
        />
      </Tab.Navigator>
    );
  };
  
  export default ConductorNavigation;
  
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'white',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      height: 63,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 6,
      bottom: 0,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 100,
      // shadowRadius: 2,
      // elevation: 8,
      // shadowColor: '#000', shadowOffset: { width: 0, height: 0.4 }, shadowOpacity: 0.5
    },
    headerTitleStyle: {
      fontFamily: typography.bold,
      fontSize: typography.titleBar,
    },
  });
  