import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { colors, typography } from '../../../theme';
export const InputField = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  onBlur,
  onFocus,
  leftIcon,
  password,
  editable,
  type,
  label
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(password);
  const inputContainerStyle = {
    ...styles.inputContainerStyle,
    borderColor: isFocused ? colors.primaryPink : errorMessage ? colors.error : colors.borderGray,
    height: 65,
  };

  return (
    <View style={{width: '100%'}}>
    <Input
      inputStyle={styles.inputStyle}
      placeholder={placeholder}
      onFocus={() => {
        if (onFocus) onFocus(); // Call onFocus if it's defined
        setIsFocused(true);
      }}
      onBlur={() => {
        if (onBlur) onBlur(); 
        setIsFocused(false);
      }}
      value={value}
      onChangeText={onChangeText}
      containerStyle={{ paddingHorizontal: 0 }}
      inputContainerStyle={inputContainerStyle}
      secureTextEntry={hidePass}
      errorMessage={errorMessage}
      editable={editable}
      leftIcon={leftIcon}
      inputMode={type}
      maxLength={type === 'tel' ? 10 : null}
      rightIcon={
        password && {
          type: 'font-awesome',
          name: hidePass ? 'eye-slash' : 'eye',
          size: 18,
          onPress: () => setHidePass(!hidePass),
        }
      }
    />
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    margin: 0,
    color: 'black',
    paddingHorizontal: 0,
    fontFamily: typography.regular,
    height: '100%'
  },
  inputContainerStyle: {
    width: '100%',
    margin: 0,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '100%',
    borderColor: colors.borderGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
