import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { VisaCard } from '../components';
import { colors, dimen, typography } from '../../theme';
import { rdb } from '../config/firebase';
const VisaCards = () => {
  const navigation = useNavigation();

  const handleAddCardPress = () => {
    navigation.navigate('AddVisa');
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.formContainer}>
            <VisaCard cardNumber="1234 5678 9012 3456" cardHolder="John Doe" expiryDate="12/24" />
            <VisaCard cardNumber="1234 5678 9012 3456" cardHolder="John Doe" expiryDate="12/24" />
            <View style={styles.addButton}>
              <TouchableOpacity
                style={styles.addButtonTouchable}
                onPress={handleAddCardPress}
              >
                <View style={styles.addCardContainer}>
                  <FontAwesome
                    name="plus"
                    size={30}
                    style={styles.addIcon}
                  />
                  <Text style={styles.addButtonText}>Add Card</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  addButtonTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  addIcon: {
    color: colors.primaryPink,
  },
  addButtonText: {
    ...typography.h2, // Assuming you have a typography style for heading 2
    color: colors.primaryPink,
  },
});

export default VisaCards;
