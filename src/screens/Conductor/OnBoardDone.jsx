import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const OnBoardDone = ({ visible, onRequestClose, qrCodeData, onContinue }) => {
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
            backgroundColor: '#7D3C98',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18,color: 'white', marginBottom: 15 , marginTop: 10}}>User boarded successfully.</Text>
          <Text style={{ fontSize: 15,color: 'white', marginBottom: 15 , marginTop: 15}}>This will be saved in your profile</Text>
          <TouchableOpacity onPress={() => {
            // Call the onContinue function passed as a prop
            onContinue();
            onRequestClose(); // Close the modal
          }} style={{ marginBottom: 15}}>
            <Text style={{ color: 'white' }}>Continue</Text>
          </TouchableOpacity>
         

        </View>
      </View>
    </Modal>
  );
};

export default OnBoardDone;
