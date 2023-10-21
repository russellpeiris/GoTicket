import { DatePicker, DescInputField, Loader, PrimaryButton, RoundInputField } from '../components';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { auth, db, setDoc, doc, ref, rdb } from '../config/firebase';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, dimen, typography } from '../../theme';
import { useLoader } from '../context/LoaderContext';
import { get, set } from 'firebase/database';
import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useLoader(() => {
    setIsLoading(true);
  });
  const [isVisible, setIsVisible] = useState({ DOB: false, dueDate: false });
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    balance: '',
  });
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contactNo: '',
    balance: '',
  });

  const userId = auth.currentUser.uid;
  const updateUser = async () => {
    setIsLoading(true);
    try {
      const userRef = ref(rdb, `users/${userId}`);

      // Update user data using set method
      await set(userRef, userInfo);
      console.log('User data updated successfully');
    } catch (error) {
      error && setIsLoading(false);
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const userRef = ref(rdb, `users/${userId}`);

    const fetchUserData = async () => {
      try {
        const dataSnapshot = await get(userRef);

        if (dataSnapshot.exists()) {
          // Extract user data from the snapshot
          const userData = dataSnapshot.val();
          console.log('userData: ', userData);

          // Update the state with user data
          setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...userData }));
        } else {
          console.log('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
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
              Personal Information
            </Text>
            <View style={styles.inputsContainer}>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField
                  value={userInfo.firstname}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, firstname: value });
                    setError((prevError) => ({ ...prevError, firstName: '' }));
                  }}
                  errorMessage={error.firstName}
                  type={'text'}
                  onBlur={() => {}}
                  width="47%"
                  label="First name"
                  placeholder="First name"
                />
                <RoundInputField
                  value={userInfo.lastname}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, lastname: value });
                    setError((prevError) => ({ ...prevError, lastName: '' }));
                  }}
                  errorMessage={error.lastName}
                  type={'text'}
                  onBlur={() => {}}
                  width="47%"
                  label="Last name"
                  placeholder="Last name"
                />
              </View>
              <RoundInputField
                value={userInfo.email}
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, email: value });
                  setError((prevError) => ({ ...prevError, email: '' }));
                }}
                errorMessage={error.email}
                type={'email'}
                onBlur={() => {}}
                label="Email"
                placeholder="Email"
              />
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <RoundInputField
                  value={userInfo.contactNo}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, contactNo: value });
                    setError((prevError) => ({ ...prevError, phoneNumber: '' }));
                  }}
                  errorMessage={error.phoneNumber}
                  type={'tel'}
                  dataType={'tel'}
                  onBlur={() => {}}
                  width="47%"
                  label="Phone Number"
                  placeholder="07X-XXX-XXXX"
                />
              </View>
            </View>
            <PrimaryButton text="Save" onPress={updateUser} />
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
  },
  formContainer: {
    margin: dimen.default,
    padding: dimen.default,
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputsContainer: {
    marginTop: 11,
  },
});
