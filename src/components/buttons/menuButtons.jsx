import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { colors, typography } from '../../../theme';
import React from 'react';
export const MenuButton = ({ text, onPress, width, height, icon }) => {
  const buttonStyles = {
    backgroundColor: colors.primaryPink,
    borderWidth: 0,
    color: 'black',
    width: width || '100%',
    height: height || 60,
    borderRadius: 20,
  };
  return (
    <GestureHandlerRootView style={{width: '100%'}}>
      <Button
        TouchableComponent={TouchableOpacity}
        onPress={onPress}
        containerStyle={{}}
        buttonStyle={buttonStyles}
        titleStyle={styles.textStyles} 
        title={text}
        iconRight={true}
        icon={icon}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    color: '#ffffff',
    fontFamily: typography.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});