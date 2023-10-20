import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { VisaCard } from '../components';
import { colors, dimen, typography } from '../../theme';
import { rdb, ref, set } from '../config/firebase';
import { onValue } from 'firebase/database';
const VisaCards = () => {
  const navigation = useNavigation();
  const [visaCards, setVisaCards] = useState([]);

  useEffect(() => {
    const visaCardsRef = ref(rdb, 'visas');
    onValue(visaCardsRef, (snapshot) => {
      const cards = snapshot.val();
      if (cards) {
        const visaCardList = Object.keys(cards).map((key) => {
          return {
            id: key,
            ...cards[key]
          };
        });
        setVisaCards(visaCardList);
      } else {
        setVisaCards([]);
      }
    });
  }, []);

  const handleAddCardPress = () => {
    navigation.navigate('AddVisa');
  };
  const handleDelete = (id) => () => {
    const visaCardsRef = ref(rdb, `visas/${id}`);
    set(visaCardsRef, null)
      .then(() => {
        alert('Data deleted successfully');
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          {visaCards.map((card) => (
            <VisaCard
              key={card.id} // Ensure each card has a unique key
              cardNumber={card.cardNumber}
              cardHolder={card.cardHolderName}
              expiryDate={`${card.expiryMonth}/${card.expiryYear}`}
              onPressDelete={handleDelete(card.id)}
            />
          ))}
          <View style={styles.addButton}>
            <TouchableOpacity style={styles.addButtonTouchable} onPress={handleAddCardPress}>
              <View style={styles.addCardContainer}>
                <FontAwesome name="plus" size={30} style={styles.addIcon}  />
                <Text style={styles.addButtonText}>Add Card</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
