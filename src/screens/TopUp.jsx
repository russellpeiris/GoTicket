import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { InputField, PrimaryButton, MultipleSelector } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '../../theme';
import { Button } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const TopUp = () => {
  const navigation = useNavigation();
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const buttonList = [
    { label: '500', value: '500' },
    { label: '1000', value: '1000' },
    { label: '1500', value: '1500' },
    { label: '2000', value: '2000' },
  ];
  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    // Do other necessary operations with the selected value as needed
  };
  useEffect(() => {
    if (selectedValue) {
      setTopUpAmount(selectedValue);
    }
  }, [selectedValue]);
  return (
    <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <View>
            <Text style={{ fontSize: 18 }}>Select top up amount</Text>
          </View>
          <MultipleSelector onSelectionChange={handleSelectionChange} buttonList={buttonList} />
          <InputField label="Enter amount" placeholder="Enter Amount" 
            value={topUpAmount}
            onChangeText={setTopUpAmount}
          />
          <Text style={styles.minAmount}>Minimum Rs. 500</Text>
        </View>
        <PrimaryButton
          text="Continue"
          icon={{
            name: 'arrow-right',
            size: 20,
            color: 'white',
          }}
          onPress={()=> {
            navigation.navigate('AddVisa')
          }}
        />
    </SafeAreaView>
  );
};

export default TopUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center'
  },
  heading: {
    backgroundColor: 'aqua',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minAmount: {
    fontSize: 18,
  },
});
