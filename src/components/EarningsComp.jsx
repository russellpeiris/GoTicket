import React, { useEffect, useState } from "react";
import "firebase/database"; // Import the Firebase Realtime Database module
import firebaseConfig from "./firebaseConfig"; // Import Firebase config module
import firebase from "firebase/app";
import { View, Text } from "react-native";


// Initialize Firebase with the imported configuration
firebase.initializeApp(firebaseConfig);

class EarningsStore {
  constructor() {
    this.earnings = {
      trip01: 0,
      trip02: 0,
      trip03: 0,
      trip04: 0,
      trip05: 0,
    };
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Modify this method to fetch earnings data from Firebase
  async fetchEarningsFromFirebase() {
    const db = firebase.database();
    try {
      const snapshot = await db.ref("earnings").once("value");
      const earningsData = snapshot.val();
      if (earningsData) {
        this.earnings = earningsData;
        this.notifyObservers();
      }
    } catch (error) {
      console.error("Error fetching earnings from Firebase:", error);
    }
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.updateEarnings(this.earnings);
    });
  }
}

const earningsStore = new EarningsStore();

const Earnings = () => {
  const [earnings, setEarnings] = useState(earningsStore.earnings);

  useEffect(() => {
    // Fetch earnings data from Firebase when the component mounts
    earningsStore.fetchEarningsFromFirebase();

    // Add an observer to update the component's state when earnings change
    earningsStore.addObserver({
      updateEarnings: (newEarnings) => {
        setEarnings(newEarnings);
      },
    });

    // Cleanup by removing the observer when the component unmounts
    return () => {
      earningsStore.removeObserver({
        updateEarnings: (newEarnings) => {
          setEarnings(newEarnings);
        },
      });
    };
  }, []);

  return (
    <View>
      <Text>Earnings: {earnings.trip01}</Text>
      <Text>Earnings: {earnings.trip02}</Text>
      <Text>Earnings: {earnings.trip03}</Text>
      <Text>Earnings: {earnings.trip04}</Text>
      <Text>Earnings: {earnings.trip05}</Text>
    </View>
  );
};

export default Earnings;
