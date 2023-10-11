import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD6VxP1C6wHVpsYdUQRMGObtEaOYB9hOjc",
  authDomain: "goticket-56757.firebaseapp.com",
  projectId: "goticket-56757",
  storageBucket: "goticket-56757.appspot.com",
  messagingSenderId: "158739808795",
  appId: "1:158739808795:web:b86dded94f811491f8eebe"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app); // Initialize Firestore

export { auth, db, setDoc, doc, getDocs }