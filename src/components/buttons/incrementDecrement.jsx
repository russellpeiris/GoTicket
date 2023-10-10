import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../../theme';
import React, { useState } from 'react';
import { Button } from '@rneui/base';

export const IncrementDecrement = ({ label }) => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }
  return (
    <>
      <Text
        style={{ fontSize: typography.default, fontFamily: typography.medium, marginBottom: 12 }}
      >
        {label}
      </Text>
      <View style={styles.container}>
        <Button
          title="-"
          titleStyle={styles.buttonText}
          buttonStyle={styles.decrementButton}
          onPress={decrement}
        />
        <View style={styles.count}>
          <Text style={{ padding: 0, margin: 0 }}>{count}</Text>
        </View>
        <Button
          title="+"
          titleStyle={styles.buttonText}
          buttonStyle={styles.incrementButton}
          onPress={increment}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    marginBottom: 19
  },
  decrementButton: {
    width: 55,
    height: 50,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    backgroundColor: colors.count,
    borderColor: colors.borderGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
  incrementButton: {
    width: 55,
    height: 50,
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    backgroundColor: colors.count,
    borderColor: colors.borderGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
  count: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin: 0,
    padding: 0,
    height: 50,
    width: 54,
    borderColor: colors.borderGray,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});
