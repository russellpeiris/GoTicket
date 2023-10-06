import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SimpleSelectButton from 'react-native-simple-select-button';
import { colors } from '../../../theme';
import React, { useState } from 'react';

const MultipleSelector = ({ buttonList }) => {
    const [choice, setChoice] = useState([]);

    return (
      <View style={styles.gridContainer}>
        {buttonList.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.gridItem,
              {
                backgroundColor: choice.includes(item.value) ? colors.primaryPink : 'white',
              },
            ]}
            onPress={() => {
              const updatedChoice = choice.includes(item.value)
                ? choice.filter((value) => value !== item.value)
                : [...choice, item.value];
              setChoice(updatedChoice);
            }}
          >
            <Text
              style={{
                color: choice.includes(item.value) ? '#fff' : '#333',
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
    
export default MultipleSelector;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 8,
  },
  gridItem: {
    width: '47%', // Adjust the width as needed for the number of columns you want
    height: 50, // Set a fixed height or adjust as per your design
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderColor: colors.borderGray,
    borderWidth: 1,
  },
});
