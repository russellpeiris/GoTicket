import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, InputField, Loader } from '../../components';
import { getErrorMessage } from '../../utils/errorMessages';
import { colors, dimen, typography } from '../../../theme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useLoader } from '../../context/LoaderContext';
import { auth } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const { isLoading, setIsLoading } = useLoader();
  const navigation = useNavigation();
  const handleSignUp = async () => {
    setError({ email: '', password: '' });

    if (!email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }));
      return;
    }

    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password is required',
      }));
      return;
    }
    setIsLoading(true);
    try {
      const loggedUser = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('userId', loggedUser.uid);
    } catch (error) {
      error && setIsLoading(false);
      const errorCode = error.code;
      const errorMessages = getErrorMessage(errorCode);

      setError((prevError) => ({
        ...prevError,
        email: errorMessages.email,
        password: errorMessages.password,
      }));
    }
  };

  validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError((prevError) => ({ ...prevError, email: '' }));
    } else if (!emailRegex.test(email)) {
      setError((prevError) => ({
        ...prevError,
        email: 'Please enter a valid email.',
      }));
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
          <ScrollView style={{ margin: dimen.default }}>
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
              </View>
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError((prevError) => ({ ...prevError, email: '' }));
                }}
                onBlur={validateEmail}
                errorMessage={error.email}
              />
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setError((prevError) => ({ ...prevError, password: '' }));
                }}
                password={true}
                errorMessage={error.password}
                rightIcon={{ type: 'font-awesome', name: 'eye', size: 18 }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={handleSignUp} text="Login" />
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: dimen.default,
                  fontFamily: typography.semiBold,
                  fontSize: typography.authSubTitle,
                }}
              >
                Don't have an account?
                <Text
                  onPress={() => navigation.replace('Register')}
                  style={{
                    color: colors.primaryPink,
                    fontFamily: typography.semiBold,
                  }}
                >
                  {' '}
                  Register
                </Text>
              </Text>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontSize: typography.authTitle,
    fontFamily: typography.bold,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
