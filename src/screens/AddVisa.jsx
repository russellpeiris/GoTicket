import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField, PrimaryButton } from '../components';
import { colors, typography } from '../../theme';
import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Visa } from '../models';
const AddVisa = () => {
const [visa, setVisa] = useState(new Visa());

  const handleAddCard = () => {
    // TODO: Implement add card functionality
  };
  return (
    <SafeAreaView style={styles.addCardContainer}>
      <Text style={styles.addCardTitle}>Add Card</Text>
      <InputField
        label="Card Number"
        placeholder="Card Number"
        value={visa.cardNumber}
        onChangeText={(value) => {
          setVisa({ ...visa, cardNumber: value });
        }}
      />
      <InputField
        label="Card Holder"
        placeholder="Card Holder"
        value={visa.cardHolderName}
        onChangeText={(value) => {
          setVisa({ ...visa, cardHolderName: value });
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex', width: '100%'}}>
        <View style={{width: '47%', marginHorizontal: 0}}>

        <InputField
          label="Expiry Month"
          placeholder="MM"
          value={visa.expiryMonth}
          onChangeText={(value) => {
            setVisa({ ...visa, expiryMonth: value });
          }}
        />
        </View>
        <View style={{width: '47%', marginHorizontal: 0}}>
        <InputField
          label="Expiry Year"
          placeholder="YY"
          value={visa.expiryYear}
          onChangeText={(value) => {
            setVisa({ ...visa, expiryYear: value });
          }}
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
});
