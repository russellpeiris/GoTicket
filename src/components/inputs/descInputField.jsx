import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { colors, typography } from '../../../theme';
export const DescInputField = ({
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
  dataType,
  label,
  height,
    multiline,
    textAlignVertical,
  maxLength
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(password);
  const inputContainerStyle = {
    ...styles.inputContainerStyle,
    borderColor: isFocused ? colors.primaryPink : errorMessage ? colors.error : colors.borderGray,
    height: height ? height : 65,
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={{ fontSize: 16, fontFamily: typography.medium, marginBottom: 5 }}>{label}</Text>
    <Input
      inputStyle={styles.inputStyle}
      placeholder={placeholder}
      multiline={multiline}
      textAlignVertical={textAlignVertical}
      onFocus={() => {
        if (onFocus) onFocus(); // Call onFocus if it's defined
        setIsFocused(true);
      }}
      onBlur={() => {
        if (onBlur) onBlur(); // Call onBlur if it's defined
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
      maxLength={dataType === 'tel' ? 10 : maxLength ? maxLength : null}
      rightIcon={
        password && {
          type: 'font-awesome',
          name: hidePass ? 'eye-slash' : 'eye',
          size: 18,
          onPress: () => setHidePass(!hidePass), // Toggle "showPassword" state
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
    fontSize: 14,
    height: '100%',
  },
  inputContainerStyle: {
    width: '100%',
    margin: 0,
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
    maxWidth: '100%',
    borderColor: colors.borderGray,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});
