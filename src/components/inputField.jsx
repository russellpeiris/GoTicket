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
        onFocus
        setIsFocused(true)
      }}
      onBlur={() => {
        onBlur
        setIsFocused(false)
      }}
      value={value}
      onChangeText={onChangeText}
      inputContainerStyle={inputContainerStyle}
      secureTextEntry={placeholder === 'Password' ? true : false}
      errorMessage={errorMessage}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      leftIconContainerStyle={{ marginHorizontal: 10}}
      rightIconContainerStyle={{ marginHorizontal: 10}}
    />
  )
}
const styles = StyleSheet.create({
  inputStyle: {
    margin: 0,
    color: 'black',
    fontSize: 16,
  },
  inputContainerStyle: {
    margin: 0,
    borderRadius: 8,
    borderWidth: 1,
    height: 65,
    width: 360,
    borderColor: theme.borderGray,
    paddingHorizontal: 15,
  },
})
