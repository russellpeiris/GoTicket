import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PrimaryButton } from '../components'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../config/firebase'
const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View>
      <PrimaryButton text='Logout' onPress={handleSignOut}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})