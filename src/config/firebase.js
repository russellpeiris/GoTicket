import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdzDwEi9sEa90EWcbkCYOQ_AL-ASnL9qw",
  authDomain: "goticket-d73bb.firebaseapp.com",
  databaseURL: "https://goticket-d73bb-default-rtdb.firebaseio.com",
  projectId: "goticket-d73bb",
  storageBucket: "goticket-d73bb.appspot.com",
  messagingSenderId: "753202050140",
  appId: "1:753202050140:web:6fee00b3384a88050de299"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app); // Initialize Firestore
const rdb = getDatabase(app); // initialize real time database

export { auth, db, setDoc, doc, getDocs, rdb }