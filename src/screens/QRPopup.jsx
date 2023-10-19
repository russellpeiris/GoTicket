import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRPopUp = ({ visible, onRequestClose, qrCodeData, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>This is your QR code</Text>
          <QRCode value={qrCodeData} size={150} />
          <TouchableOpacity onPress={() => {
            // Call the onContinue function passed as a prop
            onContinue();
            onRequestClose(); // Close the modal
          }} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue' }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QRPopUp;
