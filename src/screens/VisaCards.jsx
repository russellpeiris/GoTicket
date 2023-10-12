import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, dimen, typography } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { VisaCard } from '../components';
import { useState } from 'react';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const VisaCards = () => {
  const navigation = useNavigation();
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <VisaCard cardNumber="1234 5678 9012 3456" cardHolder="John Doe" expiryDate="12/24" />
            <VisaCard cardNumber="1234 5678 9012 3456" cardHolder="John Doe" expiryDate="12/24" />
            <View style={styles.addButton}>
              <TouchableOpacity
              style={{ width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                  navigation.navigate('AddVisa');
                }}
              >

                <View style={{flexDirection: 'column', alignItems: 'center', width:'100%'}}>
                <FontAwesome 
                name="plus"
                size={30}
                style={{color: colors.primaryPink}}
                />

                <Text style={styles.addButtonText}>Add Card
                </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default VisaCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  formContainer: {
    margin: dimen.default,
  },
  addButton: {
    backgroundColor: '#ECE8FF',
    borderRadius: 8,
    padding: dimen.default,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    height: 200,

  },
  addButtonText: {

  }
});

