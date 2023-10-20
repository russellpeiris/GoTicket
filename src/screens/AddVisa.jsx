import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField, PrimaryButton } from '../components';
import { rdb, ref, set } from '../config/firebase';
import { colors, typography } from '../../theme';
import { push } from 'firebase/database';
import React, { useState } from 'react';
import { Visa } from '../models';
import { useNavigation } from '@react-navigation/native';
const AddVisa = () => {
  const [visa, setVisa] = useState(new Visa());
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  async function handleAddCard() {
    setErrors('');
    const validationErrors = {};

    if (!/^\d{16}$/.test(visa.cardNumber)) {
      validationErrors.cardNumber = 'Invalid card number';
    }
    if (visa.cardHolderName.trim() === '') {
      validationErrors.cardHolderName = 'Card holder name is required';
    }
    const currentYear = new Date().getFullYear().toString().slice(-2); // Get the current year (last two digits)
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-based)

    // Validate Expiry Month and Year
    if (
      visa.expiryMonth < 1 ||
      visa.expiryMonth > 12 ||
      (visa.expiryYear < currentYear && visa.expiryYear !== currentYear) ||
      (visa.expiryYear === currentYear && visa.expiryMonth < currentMonth)
    ) {
      validationErrors.expiryDate = 'Invalid or expired expiry date';
    }
    if (Object.keys(validationErrors).length === 0) {
      try {
        const newVisaRef = push(ref(rdb, 'visas/'));
        await set(newVisaRef, visa)
          .then(() => {
            alert('Data submitted successfully');
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      } catch (error) {
        console.error('Error adding Visa card:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <SafeAreaView style={styles.addCardContainer}>
      <Text style={styles.addCardTitle}>Add Card</Text>
      <InputField
        type={'tel'}
        maxLength={16}
        label="Card Number"
        placeholder="Card Number"
        value={visa.cardNumber}
        onChangeText={(value) => {
          setVisa({ ...visa, cardNumber: value });
        }}
        errorMessage={errors.cardNumber}
      />

      <InputField
        label="Card Holder"
        placeholder="Card Holder"
        value={visa.cardHolderName}
        onChangeText={(value) => {
          setVisa({ ...visa, cardHolderName: value });
        }}
        errorMessage={errors.cardHolderName}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
        }}
      >
        <View style={{ width: '47%' }}>
          <InputField
            maxLength={2}
            type={'tel'}
            label="Expiry Month"
            placeholder="MM"
            value={visa.expiryMonth}
            onChangeText={(value) => {
              setVisa({ ...visa, expiryMonth: value });
            }}
            errorMessage={errors.expiryDate}
          />
        </View>
        <View style={{ width: '47%' }}>
          <InputField
            maxLength={2}
            type={'tel'}
            label="Expiry Year"
            placeholder="YY"
            value={visa.expiryYear}
            onChangeText={(value) => {
              setVisa({ ...visa, expiryYear: value });
            }}
            errorMessage={errors.expiryDate}
          />
        </View>
      </View>

      <PrimaryButton text="Continue" onPress={handleAddCard} />
    </SafeAreaView>
  );
};

export default AddVisa;

const styles = StyleSheet.create({
  addCardContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  addCardTitle: {
    fontSize: typography.default,
    marginBottom: 16,
    fontFamily: typography.medium,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    fontFamily: typography.medium,
    alignSelf: 'flex-start',
  },
});
