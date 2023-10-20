import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BusData = () => {
 // const { control, handleSubmit, errors, setValue } = useForm();
  const navigation = useNavigation();

  const handleSubmit = (data) => {
    // Handle the form submission here
    console.log(data);
    // Navigate to the ScanQR screen and pass the form data as route params
    navigation.navigate("ScanQR", { formData: data });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.container}
    >
      <Text style={styles.title}>Ride Data</Text>
      {/* ... (Rest of the form) ... */}
      <View style={styles.button}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          color="#5d03ab"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    borderColor: "#5d03ab",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 40,
    paddingBottom: 40,
    width: "90%",
  },
  Heads: {
    color: "#5d03ab",
    fontSize: 22,
    marginTop: 20,
  },
  textInput1: {
    marginTop: 10,
  },
  textInput2: {
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    color: "#5d03ab",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
  },
});


export default BusData;
