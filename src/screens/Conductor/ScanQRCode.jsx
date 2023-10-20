import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';

const ScanQRCode = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

  const handleQRCodeScanned = async ({ data }) => {
    try {
      const qrCodeData = JSON.parse(data);

      if (qrCodeData.status === false) {
        await handleBoardingQRScan(qrCodeData);

        qrCodeData.status = true; // Set the status to true after boarding
      } else {
        await handleAlightingQRScan(qrCodeData);
        qrCodeData.status = false; // Set the status to false after alighting
      }
    } catch (error) {
      console.error('Error handling QR code:', error);
    }
  };

  const handleBoardingQRScan = async (userData) => {
    try {
      const { userId, firstName, balance } = userData;

      // Get the user's current location
      const boardingLocation = await getLocation();

      // Reset status to true for the next alighting
      userData.status = true;
    } catch (error) {
      console.error('Error handling boarding QR scan:', error);
    }
  };

  const handleAlightingQRScan = async (userData) => {
    try {
      const { userId, balance } = userData;

      // Get the user's current location
      const alightingLocation = await getLocation();

      // Calculate the distance between boarding and alighting locations
      const distance = calculateDistance(
        userData.boardingLocation.latitude,
        userData.boardingLocation.longitude,
        alightingLocation.latitude,
        alightingLocation.longitude
      );

      // Deduct the charge based on distance
      const chargingRate = 10; // Charging rate per kilometer
      const charge = distance * chargingRate;

      // Update user's balance
      userData.balance -= charge;

      // Reset status to false for the next boarding
      userData.status = false;
    } catch (error) {
      console.error('Error handling alighting QR scan:', error);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

//   const getLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Location permission denied');
//         return null;
//       }

//       const location = await Location.getCurrentPositionAsync({});
//       return location.coords;
//     } catch (error) {
//       console.error('Error getting location:', error);
//       return null;
//     }
//   };

  // Rest of your component's rendering and JSX
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        onBarCodeScanned={handleQRCodeScanned}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>
            Scan QR Code Here
          </Text>
        </View>
      </Camera>
    </View>
  );
};

export default ScanQRCode;
