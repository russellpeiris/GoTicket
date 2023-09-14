import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { PrimaryButton, InputField } from '../components'
import { Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
const LogInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ email: '', password: '' })
  const navigation = useNavigation()
  const handleSignUp = async () => {
    setError({ email: '', password: '' })

    if (!email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }))
      return
    }

    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password is required',
      }))
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
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

   validateEmail = () =>{
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
      <View>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value)
            setError((prevError) => ({ ...prevError, email: '' }))
          }}
          onBlur={validateEmail}
          errorMessage={error.email}
          leftIcon={{ type: 'font-awesome', name: 'envelope', size: 18 }}
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
          leftIcon={{ type: 'font-awesome', name: 'lock', size: 18 }}
          rightIcon={{ type: 'font-awesome', name: 'eye', size: 18 }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleSignUp} text="Login" />
      </View>
      <View>
        <Text onPress={() => navigation.replace('Register')}>Register</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LogInScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 46,
    fontFamily: 'nunito-bold',
    marginBottom: 40,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '60%',
  },
})
