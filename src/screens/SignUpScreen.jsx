import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, doc, setDoc } from '../config/firebase'
import { PrimaryButton, InputField, Loader} from '../components'
import { Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import theme from '../../theme'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';
const SignUpScreen = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dueDate: '',
  })
  const [date, setDate] = useState(new Date())
  const [error, setError] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()

  const toggleDatePicker = () => {
    setIsVisible(!isVisible);
  }
      
  const handlePicker = (event, selectedDate) => {
    if(event.type == "set"){
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === 'android'){
        toggleDatePicker();
        setInputs({ ...inputs, dueDate: currentDate.toDateString() })
        setError((prevError) => ({ ...prevError, dueDate: '' }))
      }
    }else{
      toggleDatePicker()
    }
  };
  
  const updateDueDate = (value) => {
    setInputs({ ...inputs, dueDate: value });
  };

  const handleSignUp = async () => {
    setError({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      dueDate: '',
    })

    if (!inputs.firstName) {
      setError((prevError) => ({
        ...prevError,
        firstName: 'First Name is required',
      }))
      return
    }
    if (!inputs.lastName) {
      setError((prevError) => ({
        ...prevError,
        lastName: 'Last Name is required',
      }))
      return
    }

    if (!inputs.email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }))
      return
    }

    if (!inputs.password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password is required',
      }))
      return
    }

    if (!inputs.phoneNumber) {
      setError((prevError) => ({
        ...prevError,
        phoneNumber: 'Phone Number is required',
      }))
      return
    }
    setIsLoading(true)
    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password,
      )
      // Step 2: Store additional user data in Firestore
      const { user } = userCredential
      const userDocRef = doc(db, 'users', user.uid) 

      const userData = {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        dueDate: inputs.dueDate || '',
      }
      try{
        const userDoc = await setDoc(userDocRef, userData)
      }catch(error){
        console.log('error: ', error);
      }

    } catch (error) {
      error && setIsLoading(false)
      const errorCode = error.code
      const errorMessage = error.message

      if (errorCode === 'auth/email-already-in-use') {
        setError((prevError) => ({
          ...prevError,
          email: 'Email is already in use. Please use a different email.',
        }))
      } else if (errorCode === 'auth/weak-password') {
        setError((prevError) => ({
          ...prevError,
          password: 'Weak password. Please use a stronger password.',
        }))
      } else if (errorCode === 'auth/invalid-email') {
        setError((prevError) => ({
          ...prevError,
          email: 'Please enter a valid email.',
        }))
      } else {
        setError((prevError) => ({ ...prevError, email: errorMessage }))
      }
    }
  }

  const validate = (field) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const nameRegex = /^[A-Za-z\s\-']+$/
    const phoneNumberRegex = /^\d{10}$/

    switch (field) {
      case 'email':
        if (!inputs.email) {
          setError((prevError) => ({ ...prevError, email: '' }))
        } else if (!emailRegex.test(inputs.email)) {
          setError((prevError) => ({
            ...prevError,
            email: 'Please enter a valid email.',
          }))
        }
        break
      case 'firstName':
        if (!inputs.firstName) {
          setError((prevError) => ({ ...prevError, firstName: '' }))
        } else if (!nameRegex.test(inputs.firstName)) {
          setError((prevError) => ({
            ...prevError,
            firstName: 'Name can only contain alphabetic characters',
          }))
        }
        break
      case 'lastName':
        if (!inputs.lastName) {
          setError((prevError) => ({ ...prevError, lastName: '' }))
        } else if (!nameRegex.test(inputs.lastName)) {
          setError((prevError) => ({
            ...prevError,
            lastName: 'Name can only contain alphabetic characters',
          }))
        }
        break
      case 'phoneNumber':
        if (!inputs.phoneNumber) {
          setError((prevError) => ({ ...prevError, phoneNumber: '' }))
        } else if (!phoneNumberRegex.test(inputs.phoneNumber)) {
          setError((prevError) => ({
            ...prevError,
            phoneNumber: 'Please enter a valid phone number',
          }))
        }
        break
    }
  }




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home')
      }
    })
    return unsubscribe
  }, [])

  return (
    <>
      <Loader visible={isLoading} />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <GestureHandlerRootView>
          <ScrollView style={{ margin: 16 }}>
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
                <Text
                  style={{
                    fontFamily: 'nunito-semi-bold',
                    fontSize: 18,
                    marginTop: 10,
                    marginBottom: 30,
                  }}
                >
                  Already have an account?
                  <Text
                    onPress={() => navigation.replace('Login')}
                    style={{
                      color: theme.primaryPink,
                      fontFamily: 'nunito-semi-bold',
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
                  setInputs({ ...inputs, firstName: value })
                  setError((prevError) => ({ ...prevError, firstName: '' }))
                }}
                onBlur={() => validate('firstName')}
                errorMessage={error.firstName}
                type={'text'}
              />
              <InputField
                placeholder="Last Name"
                value={inputs.lastName}
                onChangeText={(value) => {
                  setInputs({ ...inputs, lastName: value })
                  setError((prevError) => ({ ...prevError, lastName: '' }))
                }}
                onBlur={() => validate('lastName')}
                errorMessage={error.lastName}
                type={'text'}
              />
              <InputField
                placeholder="Email"
                value={inputs.email}
                onChangeText={(value) => {
                  setInputs({ ...inputs, email: value })
                  setError((prevError) => ({ ...prevError, email: '' }))
                }}
                onBlur={() => validate('email')}
                errorMessage={error.email}
                type={'email'}
              />
              <InputField
                placeholder="Password"
                value={inputs.password}
                onChangeText={(value) => {
                  setInputs({ ...inputs, password: value })
                  setError((prevError) => ({ ...prevError, password: '' }))
                }}
                password={true}
                errorMessage={error.password}
                type={'text'}
              />
              <InputField
                placeholder="Phone Number"
                value={inputs.phoneNumber}
                onChangeText={(value) => {
                  setInputs({ ...inputs, phoneNumber: value })
                  setError((prevError) => ({ ...prevError, phoneNumber: '' }))
                }}
                onBlur={() => validate('phoneNumber')}
                errorMessage={error.phoneNumber}
                type={'tel'}
                max
              />
                          {isVisible && (
                    <>
                      <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={handlePicker}
    
                      />
                      {console.log(isVisible)}
                    </>
                  )}
              <Pressable onPress={
                toggleDatePicker
              }>
              <InputField
                  placeholder="Expected due date"
                  value={inputs.dueDate}
                  onChangeText={
                    (value) => {
                    setInputs({ ...inputs, dueDate: value.toDateString()})
                    // setDate(new Date(value))
                    // setError((prevError) => ({ ...prevError, dueDate: '' }))
                    }
                }
                  editable={false}
                  errorMessage={error.dueDate}
                />
              </Pressable>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'nunito-medium',
                  marginBottom: 20,
                  marginHorizontal: 3,
                }}
              >
                By setting up the account you agree to share your data with the
                Hospital
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={handleSignUp} text="Register" />
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
    // paddingLeft: 10
  },
  title: {
    fontSize: 36,
    fontFamily: 'nunito-bold',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 0,
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
})
