import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { PrimaryButton, InputField, Loader } from '../components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { Text } from '@rneui/themed';
import theme from '../../theme';
const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      error && setIsLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        setError((prevError) => ({
          ...prevError,
          email: 'Email is already in use. Please use a different email.',
        }));
      } else if (errorCode === 'auth/weak-password') {
        setError((prevError) => ({
          ...prevError,
          password: 'Weak password. Please use a stronger password.',
        }));
      } else if (errorCode === 'auth/invalid-email') {
        setError((prevError) => ({
          ...prevError,
          email: 'Please enter a valid email.',
        }));
      } else {
        setError((prevError) => ({ ...prevError, email: errorMessage }));
      }
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
      <Loader visible={isLoading} />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <GestureHandlerRootView>
          <ScrollView style={{ margin: 16 }}>
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
                  marginTop: 16,
                  fontFamily: 'nunito-semi-bold',
                  fontSize: 18,
                }}
              >
                Don't have an account?
                <Text
                  onPress={() => navigation.replace('Register')}
                  style={{
                    color: theme.primaryPink,
                    fontFamily: 'nunito-semi-bold',
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
export default LogInScreen;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontSize: 36,
    fontFamily: 'nunito-bold',
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
