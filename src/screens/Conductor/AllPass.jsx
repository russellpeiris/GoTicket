import bg from "../../assets/bg.png"; // Import the background image
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";

class AllPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedUsernames: [],
    };
  }

  addScannedUsername = (username) => {
    this.setState((prevState) => ({
      scannedUsernames: [...prevState.scannedUsernames, username],
    }));
  };

  render() {
    return (
      <ImageBackground source={bg} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Scanned Passengers</Text>
          <FlatList
            data={this.state.scannedUsernames}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.username}>{item}</Text>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    marginBottom: 8,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default AllPass;
