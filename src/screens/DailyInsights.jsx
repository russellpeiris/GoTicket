import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { DescInputField, DropDown, IncrementDecrement, PrimaryButton, RoundInputField } from '../components';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import MultipleSelector from '../components/buttons/multipleSelect';
const DailyInsights = () => {
  const [moodOpen, setMoodOpen] = useState(false);
  const [moodValue, setMoodValue] = useState(null);
  const [mood, setMood] = useState([
    { label: 'Happy', value: 'happy' },
    { label: 'Sad', value: 'sad' },
  ]);
  const buttonList = [
    { label: "Button 1", value: "1" },
    { label: "Button 2", value: "2" },
    { label: "Button 3", value: "3" },
    { label: "Custom Button", value: "4" },
  ];
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
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
              label="How are you feeling today?"
              open={moodOpen}
              value={moodValue}
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
          <View>
            <IncrementDecrement label="Baby kick count" />
          </View>
          <View>
            <Text style={{fontFamily:typography.semiBold, fontSize: typography.default}}>Let’s keep track of your vitals </Text>
            <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 }}
              >
                <RoundInputField
                  // value={userInfo.phoneNumber}
                  // onChangeText={(value) => {
                  //   setUserInfo({ ...userInfo, phoneNumber: value });
                  //   setError((prevError) => ({ ...prevError, phoneNumber: '' }));
                  // }}
                  // errorMessage={error.phoneNumber}
                  // type={'tel'}
                  onBlur={() => {}}
                  width="47%"
                  label="Weight"
                  placeholder="0.0 Kg"
                />
                <RoundInputField
                  // value={userInfo.emergencyContact}
                  // onChangeText={(value) => {
                  //   setUserInfo({ ...userInfo, emergencyContact: value });
                  //   setError((prevError) => ({ ...prevError, emergencyContact: '' }));
                  // }}
                  // errorMessage={error.emergencyContact}
                  type={'tel'}
                  onBlur={() => {}}
                  width="47%"
                  label="Blood Pressure"
                  placeholder="0/0 mm Hg"
                />
              </View>
              <Text style={{fontFamily:typography.semiBold, fontSize: typography.default, paddingBottom: 12}}>Pains and discomforts you are facing today </Text>
              <MultipleSelector buttonList={buttonList}/>
              <DescInputField
                // value={userInfo.medicalHistory}
                // onChangeText={(value) => {
                //   setUserInfo({ ...userInfo, medicalHistory: value });
                //   setError((prevError) => ({ ...prevError, medicalHistory: '' }));
                // }}
                // errorMessage={error.medicalHistory}
                type={'text'}
                onBlur={() => {}}
                label="Medical history"
                placeholder="Add your medial history here..."
                height={180}
                multiline={true}
                textAlignVertical={'top'}
              />
          </View>
        <PrimaryButton text="Save" />
        </View>
      </ScrollView>
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
  },
});
