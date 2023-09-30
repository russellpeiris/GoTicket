import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors, dimen, typography } from '../../../theme'

export const DropDown = ({
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    placeholder,
    onOpen,
    onChangeValue,
}) => {
  return (
    <DropDownPicker
    style={styles.dropdown}
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder={placeholder}
    placeholderStyle={styles.placeholderStyles}
    onOpen={onOpen}
    onChangeValue={onChangeValue}
    zIndex={3000}
    zIndexInverse={1000}
    />
  )
}

const styles = StyleSheet.create({
    dropdown: {
        width: '50%',
        borderColor: colors.borderGray,
        borderWidth: 1,
        borderRadius: 24,
       zIndex: 3000,
        zIndexInverse: 1000,
        height: 50,
    },
    placeholderStyles: {
        fontSize: 14,
        paddingLeft: dimen.default,
        fontFamily: typography.medium
    },
})