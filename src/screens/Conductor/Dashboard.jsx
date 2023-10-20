import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Dashboard = () => {
  const navigation = useNavigation();

  // Function to navigate to "BusData" when the button is pressed
  const handleSetRideDataPress = () => {
    navigation.navigate("BusData");
  };

  // Function to navigate to "QR Scan" when the button is pressed
  const handleScanQRPress = () => {
    navigation.navigate("ScanQR");
  };

  // Function to navigate to "All Passengers" when the button is pressed
  const handleAllPassengersPress = () => {
    navigation.navigate("AllPass");
  };

  // Function to navigate to "Earnings" when the button is pressed
  const handleEarningsPress = () => {
    navigation.navigate("EarningsScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.png")}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Go Ticket</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSetRideDataPress}
        >
          <Text style={styles.buttonText}>Ride Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleScanQRPress}>
          <Text style={styles.buttonText}>Scan QR Codes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAllPassengersPress}
        >
          <Text style={styles.buttonText}>All Passengers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEarningsPress}>
          <Text style={styles.buttonText}>Daily Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5d03ab",
    borderRadius: 30,
    height: 120,
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: "100%",
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#5d03ab",
    fontSize: 34,
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
});


export default Dashboard;
