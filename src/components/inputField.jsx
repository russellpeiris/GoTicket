import { Input } from '@rneui/themed'
import { StyleSheet } from 'react-native'
import theme from '../../theme'
import { useState } from 'react'
export const InputField = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  onBlur,
  onFocus,
  leftIcon,
  password,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(password);
  const inputContainerStyle = {
    ...styles.inputContainerStyle,
    borderColor: isFocused
      ? theme.primaryPink
      : errorMessage
      ? theme.error
      : theme.borderGray,
  };
  return (
    <Input
      inputStyle={styles.inputStyle}
      placeholder={placeholder}
      onFocus={() => {
        if (onFocus) onFocus() // Call onFocus if it's defined
        setIsFocused(true)
      }}
      onBlur={() => {
        if (onBlur) onBlur() // Call onBlur if it's defined
        setIsFocused(false)
      }}
      value={value}
      onChangeText={onChangeText}
      containerStyle={{ paddingHorizontal: 0 }}
      inputContainerStyle={inputContainerStyle}
      secureTextEntry={hidePass}
      errorMessage={errorMessage}
      leftIcon={leftIcon}
      inputMode={type}
      maxLength={type === 'tel' ? 10 : null}
      rightIcon={ password && {
        type: 'font-awesome',
        name: hidePass ? 'eye-slash' : 'eye',
        size: 18,
        onPress: () => setHidePass(!hidePass), // Toggle "showPassword" state
      }}
    />
  )
}
const styles = StyleSheet.create({
  inputStyle: {
    margin: 0,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    margin: 0,
    borderRadius: 8,
    borderWidth: 1,
    height: 65,
    width: '100%',
    maxWidth: '100%',
    borderColor: theme.borderGray,
    paddingHorizontal: 20,
  },
})
