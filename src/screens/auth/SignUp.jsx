import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { PrimaryButton, InputField, Loader, DatePicker } from '../../components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, doc, setDoc } from '../../config/firebase';
import { getErrorMessage } from '../../utils/errorMessages';
import { colors, dimen, typography } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { useLoader } from '../../context/LoaderContext';
import { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import User from '../../models/User';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dueDate: '',
  });
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState({ email: '', password: '' });
  const { isLoading, setIsLoading } = useLoader();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  const toggleDatePicker = () => {
    setIsVisible(!isVisible);
  };

  const handlePicker = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setInputs({ ...inputs, dueDate: currentDate.toDateString() });
        setError((prevError) => ({ ...prevError, dueDate: '' }));
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleSignUp = async () => {
    setError({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      dueDate: '',
    });

    if (!inputs.firstName) {
      setError((prevError) => ({
        ...prevError,
        firstName: 'First Name is required',
      }));
      return;
    }
    if (!inputs.lastName) {
      setError((prevError) => ({
        ...prevError,
        lastName: 'Last Name is required',
      }));
      return;
    }

    if (!inputs.email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }));
      return;
    }

    if (!inputs.password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password is required',
      }));
      return;
    }

    if (!inputs.phoneNumber) {
      setError((prevError) => ({
        ...prevError,
        phoneNumber: 'Phone Number is required',
      }));
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const { user } = userCredential;
      const userDocRef = doc(db, 'users', user.uid);

      const newUser = new User(
        inputs.firstName,
        inputs.lastName,
        inputs.email,
        inputs.phoneNumber,
        inputs.dueDate || ''
      );
      const userData = { ...newUser };

      await setDoc(userDocRef, userData);
    } catch (error) {
      error && setIsLoading(false);
      const errorCode = error.code;
      const errorMessages = getErrorMessage(errorCode);

      setError((prevError) => ({
        ...prevError,
        email: errorMessages.email,
        password: errorMessages.password,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const validate = (field) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s\-']+$/;
    const phoneNumberRegex = /^\d{10}$/;

    switch (field) {
      case 'email':
        if (!inputs.email) {
          setError((prevError) => ({ ...prevError, email: '' }));
        } else if (!emailRegex.test(inputs.email)) {
          setError((prevError) => ({
            ...prevError,
            email: 'Please enter a valid email.',
          }));
        }
        break;
      case 'firstName':
        if (!inputs.firstName) {
          setError((prevError) => ({ ...prevError, firstName: '' }));
        } else if (!nameRegex.test(inputs.firstName)) {
          setError((prevError) => ({
            ...prevError,
            firstName: 'Name can only contain alphabetic characters',
          }));
        }
        break;
      case 'lastName':
        if (!inputs.lastName) {
          setError((prevError) => ({ ...prevError, lastName: '' }));
        } else if (!nameRegex.test(inputs.lastName)) {
          setError((prevError) => ({
            ...prevError,
            lastName: 'Name can only contain alphabetic characters',
          }));
        }
        break;
      case 'phoneNumber':
        if (!inputs.phoneNumber) {
          setError((prevError) => ({ ...prevError, phoneNumber: '' }));
        } else if (!phoneNumberRegex.test(inputs.phoneNumber)) {
          setError((prevError) => ({
            ...prevError,
            phoneNumber: 'Please enter a valid phone number',
          }));
        }
        break;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <GestureHandlerRootView>
          <ScrollView style={{ padding: dimen.default }}>
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
                <Text
                  style={{
                    fontFamily: typography.semiBold,
                    fontSize: typography.authSubTitle,
                    marginTop: 10,
                    marginBottom: 30,
                  }}
                >
                  Already have an account?
                  <Text
                    onPress={() => navigation.replace('Login')}
                    style={{
                      color: colors.primaryPink,
                      fontFamily: typography.semiBold,
                    }}
                  >
                    {' '}
                    Login
                  </Text>
                </Text>
              </View>
              <InputField
                placeholder="First Name"
                value={inputs.firstName}
                onChangeText={(value) => {
                  setInputs({ ...inputs, firstName: value });
                  setError((prevError) => ({ ...prevError, firstName: '' }));
                }}
                onBlur={() => validate('firstName')}
                errorMessage={error.firstName}
                type={'text'}
              />
              <InputField
                placeholder="Last Name"
                value={inputs.lastName}
                onChangeText={(value) => {
                  setInputs({ ...inputs, lastName: value });
                  setError((prevError) => ({ ...prevError, lastName: '' }));
                }}
                onBlur={() => validate('lastName')}
                errorMessage={error.lastName}
                type={'text'}
              />
              <InputField
                placeholder="Email"
                value={inputs.email}
                onChangeText={(value) => {
                  setInputs({ ...inputs, email: value });
                  setError((prevError) => ({ ...prevError, email: '' }));
                }}
                onBlur={() => validate('email')}
                errorMessage={error.email}
                type={'email'}
              />
              <InputField
                placeholder="Password"
                value={inputs.password}
                onChangeText={(value) => {
                  setInputs({ ...inputs, password: value });
                  setError((prevError) => ({ ...prevError, password: '' }));
                }}
                password={true}
                errorMessage={error.password}
                type={'text'}
              />
              <InputField
                placeholder="Phone Number"
                value={inputs.phoneNumber}
                onChangeText={(value) => {
                  setInputs({ ...inputs, phoneNumber: value });
                  setError((prevError) => ({ ...prevError, phoneNumber: '' }));
                }}
                onBlur={() => validate('phoneNumber')}
                errorMessage={error.phoneNumber}
                type={'tel'}
                max
              />
              {isVisible && (
                <DatePicker mode="date" display="spinner" value={date} onChange={handlePicker} />
              )}
              <Pressable onPress={toggleDatePicker}>
                <InputField
                  placeholder="Expected due date"
                  value={inputs.dueDate}
                  onChangeText={(value) => {
                    setInputs({ ...inputs, dueDate: value.toDateString() });
                    setDate(new Date(value));
                    setError((prevError) => ({ ...prevError, dueDate: '' }));
                  }}
                  editable={false}
                  errorMessage={error.dueDate}
                />
              </Pressable>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: typography.medium,
                  marginBottom: 20,
                  marginHorizontal: 3,
                  fontSize: typography.default,
                }}
              >
                By setting up the account you agree to share your data with the Hospital
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={handleSignUp} text="Register" />
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: typography.authTitle,
    fontFamily: typography.bold,
    backgroundColor: colors.white,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: dimen.default,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
  },
});
