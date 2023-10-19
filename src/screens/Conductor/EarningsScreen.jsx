import earningsStore from "./EarningsStore";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class EarningsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earnings: {
        trip01: 0,
        trip02: 0,
        trip03: 0,
        trip04: 0,
        trip05: 0,
      },
    };
  }

  componentDidMount() {
    earningsStore.addObserver(this);
  }

  componentWillUnmount() {
    earningsStore.removeObserver(this);
  }

  updateEarnings(newEarnings) {
    this.setState({ earnings: newEarnings });
  }

  render() {
    const { trip01, trip02, trip03, trip04, trip05 } = this.state.earnings;
    const totalEarnings = trip01 + trip02 + trip03 + trip04 + trip05;

    return (
      <View style={styles.container}>
        <Text style={styles.earningsText}>Trip 01 Earnings: ${trip01}</Text>
        <Text style={styles.earningsText}>Trip 02 Earnings: ${trip02}</Text>
        <Text style={styles.earningsText}>Trip 03 Earnings: ${trip03}</Text>
        <Text style={styles.earningsText}>Trip 04 Earnings: ${trip04}</Text>
        <Text style={styles.earningsText}>Trip 05 Earnings: ${trip05}</Text>
        <Text style={styles.totalEarningsText}>
          Total Earnings: ${totalEarnings}
        </Text>
      </View>
    );
  }
}



export default EarningsScreen;
