import { colors, dimen, typography } from '../../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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
  label,
}) => {
  return (
    <View style={{marginBottom: 19}}>
      <Text
        style={{ fontSize: typography.default, fontFamily: typography.medium, marginBottom: 12 }}
      >
        {label}
      </Text>
      <DropDownPicker
        style={styles.dropdown}
        textStyle={{ fontSize: 12, fontFamily: typography.medium }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '50%',
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 24,
    height: 50,
  },
  placeholderStyles: {
    fontSize: 14,
    paddingLeft: dimen.default,
    fontFamily: typography.medium,
  },
});
