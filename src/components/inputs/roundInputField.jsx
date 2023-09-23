import { Input, Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { colors, dimen, typography } from '../../../theme';
import { useState } from 'react';
export const RoundInputField = ({
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
  label,
  width,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(password);
  const inputContainerStyle = {
    ...styles.inputContainerStyle,
    borderColor: isFocused ? colors.primaryPink : errorMessage ? colors.error : colors.borderGray,
  };
  const container = {
    width: width ? width : '100%',
  }
  return (
    <View style={container}>
      <Text style={{ fontSize: typography.default, fontFamily: typography.medium, marginBottom: 12 }}>{label}</Text>
      <Input
        inputStyle={styles.inputStyle}
        placeholder={placeholder}
        onFocus={() => {
          if (onFocus) onFocus();
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
    fontSize: typography.small,
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    margin: 0,
    borderRadius: dimen.inputBorderRadius,
    fontSize:typography.default,
    borderWidth: 1,
    height: 50,
    borderColor: colors.borderGray,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});
