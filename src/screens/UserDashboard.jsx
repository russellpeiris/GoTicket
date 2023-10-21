import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const UserDashboard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg2.png")}
        style={styles.appBackground}
      />

      <View style={styles.header}>
        <Image
          source={require("../assets/profPic.png")}
          style={styles.profilePicture}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>Lily Smith</Text>
          <Text style={styles.user}>Local Passenger</Text>
        </View>
        <Text style={styles.AppName}>Go Ticket</Text>
      </View>

      <View style={styles.scrollContainer}>
        <Image
          source={require("../assets/bg.png")}
          style={styles.scrollViewBackground}
        />
        <ScrollView style={styles.scrollView} borderRadius={30}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Account Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>My Cards</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start", // Align the items at the top
    marginTop: 60,
    marginLeft: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flexDirection: "column",
    marginLeft: 0,
  },
  username: {
    fontSize: 20,
    color: "purple",
  },
  user: {
    fontSize: 14,
    color: "black",
  },
  AppName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginTop: 80,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  appBackground: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
    borderRadius: 30,
    overflow: "hidden",
  },
  scrollViewBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 0.5,
    backgroundColor: "transparent",
    marginBottom: 0,
    borderRadius: 30,
  },
  card: {
    width: "90%",
    height: 150,
    margin: 10,
    backgroundColor: "#a18cff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 12,
    
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 34,
  },
});
