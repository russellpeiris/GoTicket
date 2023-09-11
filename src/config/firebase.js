import { initializeApp } from 'firebase/app'
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA_JudvElNsrENi9O0bCZAiwpltyJn3Zo8',
  authDomain: 'sample-b8dee.firebaseapp.com',
  projectId: 'sample-b8dee',
  storageBucket: 'sample-b8dee.appspot.com',
  messagingSenderId: '967558148369',
  appId: '1:967558148369:web:eeebfaf360af3710ab1cb0',
}

const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export { auth }
