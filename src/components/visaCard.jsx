import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import { FontAwesome } from '@expo/vector-icons';

export const VisaCard = ({ cardNumber, cardHolder, expiryDate, onPressDelete, onPress }) => {
    return (
        <View style={styles.container} onPress={onPress}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Image source={{ uri: 'https://logowik.com/content/uploads/images/857_visa.jpg' }} style={styles.logo} />
            <FontAwesome
            onPress={onPressDelete}
            name="trash"
            size={20}
            style={{color: 'white' }}
            />
            </View>
            <Text style={[styles.cardNumber, styles.text]}>{cardNumber}</Text>
            <Text style={[styles.cardHolder, styles.text]}>{cardHolder}</Text>
            <Text style={[styles.expiryDate, styles.text]}>{expiryDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryPink,
        borderRadius: 10,
        width: '100%',
        marginVertical: 8,
        justifyContent: 'center',
        height: 200,
        padding: 20,
    },
    logo: {
        width: 50,
        height: 30,
        marginBottom: 20,
    },
    cardNumber: {
        fontSize: 16,
        marginBottom: 10,
    },
    cardHolder: {
        fontSize: 14,
        marginBottom: 5,
    },
    expiryDate: {
        fontSize: 14,
    },
    text:{
        color: '#fff',
        fontFamily: typography.medium
    }
});

export default VisaCard;
