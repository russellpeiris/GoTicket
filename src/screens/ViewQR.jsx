import { typography } from '../../theme';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { InputField, PrimaryButton, MultipleSelector } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import getQRCodeForCurrentUser from '../utils/getQRCodeForCurrentUser';


const ViewQR = () => {
    const navigation = useNavigation();
    const [qrCodeData, setQRCodeData] = useState(null);
  
    useEffect(() => {
      // Function to fetch QR code data for the current user (replace with your logic)
      const fetchQRCodeData = async () => {
        try {
          // Replace with logic to fetch the QR code data for the current user
          const qrCodeData = await getQRCodeForCurrentUser();
          setQRCodeData(qrCodeData);
        } catch (error) {
          console.error('Error fetching QR code data:', error);
        }
      };
  
      fetchQRCodeData(); // Fetch QR code data when the component mounts
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={{ fontSize: 18 }}>Your QR Code</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {qrCodeData && <QRCode value={qrCodeData} size={200} />} 
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
      justifyContent: 'center',
    },
    heading: {
      backgroundColor: 'aqua',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  
  export default ViewQR;