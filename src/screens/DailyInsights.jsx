import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors, dimen, typography } from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker'; 
import { DropDown } from '../components';
const DailyInsights = () => {
  const [moodOpen, setMoodOpen] = useState(false);
  const [moodValue, setMoodValue] = useState(null);
  const [mood, setMood] = useState([
    { label: "Happy", value: "happy" },
    { label: "Sad", value: "sad" },
  ]);
  return (
      <GestureHandlerRootView style={styles.container}>
        <View>
          <View style={styles.formContainer}>
          <Text
              style={{
                fontSize: typography.subTitle,
                fontFamily: typography.semiBold,
                marginBottom: 12,
              }}
            >
              Share your daily insights with your doctor
            </Text>
            <View>
            <DropDown
              open={moodOpen}
              value={moodValue} //moodValue
              items={mood}
              setOpen={setMoodOpen}
              setValue={setMoodValue}
              setItems={setMood}
              placeholder="Select Mood"
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
  );
};

export default DailyInsights;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  formContainer: {
    margin: dimen.default,
    padding: dimen.default,
    borderColor: colors.borderGray, 
    borderWidth: 1,
    borderRadius: 10,
  }
});
