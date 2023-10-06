import { DatePicker, DescInputField, Loader, PrimaryButton, RoundInputField } from '../components';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth, db, setDoc, doc } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { colors, dimen, typography } from '../../theme';
import { useLoader } from '../context/LoaderContext';
import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
const UserProfile = () => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useLoader(() => {
    setIsLoading(true);
  });
  const [isVisible, setIsVisible] = useState({ DOB: false, dueDate: false });
  const [date, setDate] = useState({ DOB: new Date(), dueDate: new Date() });
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
    dateOfBirth: '',
    city: '',
    dueDate: '',
    height: '',
    medicalHistory: '',
  });
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
    dateOfBirth: '',
    city: '',
    dueDate: '',
    height: '',
    medicalHistory: '',
  });
  const toggleDatePicker = (type) => {
    if (type == 'DOB') {
      setIsVisible({ ...isVisible, DOB: !isVisible.DOB });
    } else {
      setIsVisible({ ...isVisible, dueDate: !isVisible.dueDate });
    }
  };

  const handlePicker = (event, selectedDate, type) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      switch (type) {
        case 'DOB':
          setDate({ ...date, DOB: currentDate });
          if (Platform.OS === 'android') {
            toggleDatePicker(type);
            setUserInfo({ ...userInfo, dateOfBirth: currentDate.toDateString() });
            setError((prevError) => ({ ...prevError, dateOfBirth: '' }));
          }
          break;
        case 'dueDate':
          setDate({ ...date, dueDate: currentDate });
          if (Platform.OS === 'android') {
            toggleDatePicker(type);
            setUserInfo({ ...userInfo, dueDate: currentDate.toDateString() });
            setError((prevError) => ({ ...prevError, dueDate: '' }));
          }
          break;
      }
    } else {
      toggleDatePicker(type);
    }
  };
  const userId = auth.currentUser.uid; // Get the currently logged in user data
  const updateUser = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', userId);

      await setDoc(userRef, userInfo, { merge: true });
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
    const userRef = doc(db, 'users', userId);

    const fetchUserData = async () => {
      try {
        const documentSnapshot = await getDoc(userRef);

        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...data }));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView >
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
                  value={userInfo.firstName}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, firstName: value });
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
                  value={userInfo.lastName}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, lastName: value });
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
                  value={userInfo.phoneNumber}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, phoneNumber: value });
                    setError((prevError) => ({ ...prevError, phoneNumber: '' }));
                  }}
                  errorMessage={error.phoneNumber}
                  type={'tel'}
                  onBlur={() => {}}
                  width="47%"
                  label="Phone Number"
                  placeholder="07X-XXX-XXXX"
                />
                <RoundInputField
                  value={userInfo.emergencyContact}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, emergencyContact: value });
                    setError((prevError) => ({ ...prevError, emergencyContact: '' }));
                  }}
                  errorMessage={error.emergencyContact}
                  type={'tel'}
                  onBlur={() => {}}
                  width="47%"
                  label="Emergency Contact"
                  placeholder="07X-XXX-XXXX"
                />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                {isVisible.DOB && (
                  <DatePicker
                    mode="date"
                    display="spinner"
                    value={date.DOB}
                    onChange={(event, selectedDate, type) => {
                      handlePicker(event, selectedDate, (type = 'DOB'));
                    }}
                  />
                )}
                <Pressable
                  style={{ margin: 0, padding: 0, width: '47%' }}
                  onPress={() => toggleDatePicker('DOB')}
                >
                  <RoundInputField
                    value={userInfo.dateOfBirth}
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, dateOfBirth: value.toDateString() });
                      setDate(new Date(value));
                      setError((prevError) => ({ ...prevError, dateOfBirth: '' }));
                    }}
                    errorMessage={error.dateOfBirth}
                    type={'text'}
                    onBlur={() => {}}
                    width="100%"
                    label="Date of Birth"
                    placeholder="DD MMM YYYY"
                    editable={false}
                  />
                </Pressable>
                <RoundInputField
                  value={userInfo.city}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, city: value });
                    setError((prevError) => ({ ...prevError, city: '' }));
                  }}
                  errorMessage={error.city}
                  type={'text'}
                  onBlur={() => {}}
                  width="47%"
                  label="City"
                  placeholder="City"
                />
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                {isVisible.dueDate && (
                  <DatePicker
                    mode="date"
                    display="spinner"
                    value={date.dueDate}
                    onChange={(event, selectedDate, type) => {
                      handlePicker(event, selectedDate, (type = 'dueDate'));
                    }}
                  />
                )}
                <Pressable
                  style={{ margin: 0, padding: 0, width: '47%' }}
                  onPress={() => toggleDatePicker('dueDate')}
                >
                  <RoundInputField
                    value={userInfo.dueDate}
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, dueDate: value.toDateString() });
                      setDate(new Date(value));
                      setError((prevError) => ({ ...prevError, dueDate: '' }));
                    }}
                    errorMessage={error.dueDate}
                    type={'text'}
                    onBlur={() => {}}
                    width="100%"
                    label="Expected due date"
                    placeholder="DD MMM YYYY"
                    editable={false}
                  />
                </Pressable>
                <RoundInputField
                  value={userInfo.height}
                  onChangeText={(value) => {
                    setUserInfo({ ...userInfo, height: value });
                    setError((prevError) => ({ ...prevError, height: '' }));
                  }}
                  errorMessage={error.height}
                  type={'numeric'}
                  onBlur={() => {}}
                  width="47%"
                  label="Height (in cm)"
                  placeholder="0.0 cm"
                />
              </View>
              <DescInputField
                value={userInfo.medicalHistory}
                onChangeText={(value) => {
                  setUserInfo({ ...userInfo, medicalHistory: value });
                  setError((prevError) => ({ ...prevError, medicalHistory: '' }));
                }}
                errorMessage={error.medicalHistory}
                type={'text'}
                onBlur={() => {}}
                label="Medical history"
                placeholder="Add your medial history here..."
                height={180}
                multiline={true}
                textAlignVertical={'top'}
              />
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
