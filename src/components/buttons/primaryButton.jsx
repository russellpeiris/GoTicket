import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { colors, typography } from '../../../theme';
import React from 'react';
export const PrimaryButton = ({ text, onPress, width, height }) => {
  const buttonStyles = {
    backgroundColor: colors.primaryPink,
    borderWidth: 0,
    color: 'black',
    width: width || '100%',
    height: height || 65,
    borderRadius: 8,
  };
  return (
    <GestureHandlerRootView style={{ width: '100%' }}>
      <Button
        TouchableComponent={TouchableOpacity}
        onPress={onPress}
        containerStyle={{}}
        buttonStyle={buttonStyles}
        titleStyle={styles.textStyles}
        title={text}
      />
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  textStyles: {
    color: '#ffffff',
    fontFamily: typography.bold,
    fontSize: 18,
  },
});
