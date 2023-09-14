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
  rightIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const inputContainerStyle = {
    ...styles.inputContainerStyle,
    borderColor: isFocused ? theme.primaryPink : theme.borderGray,
  }
  return (
    <Input
      inputStyle={styles.inputStyle}
      placeholder={placeholder}
      onFocus={() => {
        if (onFocus) onFocus(); // Call onFocus if it's defined
        setIsFocused(true)
      }}
      onBlur={() => {
        if (onBlur) onBlur(); // Call onBlur if it's defined
        setIsFocused(false)
      }}
      value={value}
      onChangeText={onChangeText}
      containerStyle={{ paddingHorizontal: 0 }}
      inputContainerStyle={inputContainerStyle}
      secureTextEntry={placeholder === 'Password' ? true : false}
      errorMessage={errorMessage}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      leftIconContainerStyle={{ marginLeft: 20, marginRight: 15}}
      rightIconContainerStyle={{ marginHorizontal: 20}}
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
