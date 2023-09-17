import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, StyleSheet, Text, Touchable, View } from 'react-native';
import { BackIcon } from '../../assets/icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const BackArrow = () => {
    const navigation = useNavigation();
  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.container} source={BackIcon} />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 16,
  },
});
