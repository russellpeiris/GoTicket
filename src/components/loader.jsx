import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import React from 'react';
export const Loader = ({ visible = false }) => {
  return (
    visible && (
      <View style={style.container}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={colors.primaryPink} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 40,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
