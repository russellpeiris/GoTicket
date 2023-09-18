import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { DescInputField, PrimaryButton, RoundInputField } from '../components';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {colors, typography} from '../../theme';
import React from 'react';
const UserProfile = () => {
  const navigation = useNavigation();

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <Text style={{ fontSize: typography.subTitle, fontFamily: typography.semiBold }}>
              Personal Information
            </Text>
            <View style={styles.inputsContainer}>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField width="47%" label="First name" placeholder="John" />
                <RoundInputField width="47%" label="Last name" placeholder="Doe" />
              </View>
              <RoundInputField label="Email" placeholder="someone@example.com" />
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField width="47%" label="Phone" placeholder="0712341234" />
                <RoundInputField width="47%" label="Emergency Contact" placeholder="0723441231" />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField width="47%" label="Date of Birth" placeholder="0712341234" />
                <RoundInputField width="47%" label="City" placeholder="0723441231" />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField width="47%" label="Expected due date" placeholder="0712341234" />
                <RoundInputField width="47%" label="Height" placeholder="0723441231" />
              </View>
              <DescInputField
                label="Medical history"
                placeholder="Add your medial history here..."
                height={180}
                multiline={true}
                textAlignVertical={'top'}
              />
            </View>
            <PrimaryButton text="Save" onPress={() => navigation.navigate('Home')} />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',  
    paddingBottom: 63,
  },
  formContainer: {
    margin: 16,
    padding: 16,
    borderColor: colors.borderGray, // Use your theme variable or specify a color directly
    borderWidth: 1,
    borderRadius: 10,
  },
  inputsContainer: {
    marginTop: 11,
  },
});
