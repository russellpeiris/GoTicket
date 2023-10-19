import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';



const ScanQRCode = () => {
  const [scannedData, setScannedData] = useState(null);

  const onBarCodeRead = (result) => {
    if (result.data) {
      setScannedData(result.data);
      // Stop scanning after a successful scan
      // Handle the scanned data (QR code) here
      // For example, send it to the server for validation
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      />
      <View style={{ position: 'absolute', bottom: 16, left: 0, right: 0, alignItems: 'center' }}>
        {scannedData && <Text>{scannedData}</Text>}
      </View>
    </View>
  );
};

export default ScanQRCode;

