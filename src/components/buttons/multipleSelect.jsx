import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme';
import React, { useState } from 'react';

export const MultipleSelector = ({ buttonList, onSelectionChange }) => {
    const [choice, setChoice] = useState([]);
    const handleSelection = (item) => {
      setChoice(item.value);
      onSelectionChange(item.value); // Call the callback function with the selected value
    };
    return (
      <View style={styles.gridContainer}>
        {buttonList.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.gridItem,
              {
                backgroundColor: choice === item.value ? colors.primaryPink : 'white',
              },
            ]}
            onPress={() => {
              handleSelection(item);
            }}
          >
            <Text
              style={{
                color: choice === item.value ? '#fff' : '#333',
                fontSize: 14,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
    }


const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '47%',
    height: 50, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderColor: colors.borderGray,
    borderWidth: 1,
  },
});
