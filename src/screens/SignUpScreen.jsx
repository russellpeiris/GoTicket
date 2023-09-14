import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { PrimaryButton, InputField } from '../components'
import { Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
const SignUpScreen = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dueDate: '',
  })
  const [error, setError] = useState({ email: '', password: '' })
  const navigation = useNavigation()
  const handleSignUp = async () => {
    setError({ email: '', password: '' })

    if (!user.email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }))
      return
    }

    if (!user.password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password is required',
      }))
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
    } catch (error) {
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

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      setError((prevError) => ({ ...prevError, email: '' }))
    } else if (!emailRegex.test(email)) {
      setError((prevError) => ({
        ...prevError,
        email: 'Please enter a valid email.',
      }))
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
    <KeyboardAvoidingView style={styles.container} behavior="scroll">
      <View style={styles.inputContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={{}}>Already have an account?
          <Text onPress={() => navigation.replace('Login')}> Login</Text>
        </Text>
      </View>
      <InputField
          placeholder="First Name"
          value={email}
          onChangeText={(value) => {
            setEmail(value)
            setError((prevError) => ({ ...prevError, email: '' }))
          }}
          errorMessage={error.email}
        />
        <InputField
          placeholder="Last Name"
          value={email}
          onChangeText={(value) => {
            setEmail(value)
            setError((prevError) => ({ ...prevError, email: '' }))
          }}
          errorMessage={error.email}
        />
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value)
            setError((prevError) => ({ ...prevError, email: '' }))
          }}
          onBlur={
            validateEmail
          }
          errorMessage={error.email}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value)
            setError((prevError) => ({ ...prevError, password: '' }))
          }}
          secureTextEntry
          errorMessage={error.password}
        />
        <InputField
          placeholder="Phone Number"
          value={password}
          onChangeText={(value) => {
            setPassword(value)
            setError((prevError) => ({ ...prevError, password: '' }))
          }}
          secureTextEntry
          errorMessage={error.password}
        />
        <InputField
          placeholder="Expected due date"
          value={password}
          onChangeText={(value) => {
            setPassword(value)
            setError((prevError) => ({ ...prevError, password: '' }))
          }}
          secureTextEntry
          errorMessage={error.password}
        />
      </View>
      <View>
        <Text >By setting up the account you agree to share your data with the Hospital</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleSignUp} text="Register" />
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    backgroundColor:'white',
    // paddingLeft: 10
  },
  title: {
    fontSize: 36,
    fontFamily: 'nunito-bold',
    backgroundColor: 'white'
  },
  container: {
    // padding: 20,
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
    paddingHorizontal:0,
    backgroundColor: 'white'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
  },
})
