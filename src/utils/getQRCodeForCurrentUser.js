import { ref, get } from 'firebase/database';
import { auth, rdb } from '../config/firebase';

const getQRCodeForCurrentUser = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error('No current user found.');
    return null;
  }

  try {
    const userRef = ref(rdb, `users/${currentUser.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const qrCodeData = snapshot.val().qrCodeData;
      return qrCodeData;
    } else {
      console.error('QR code data not found for the current user.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching QR code data:', error);
    return null;
  }
};

export default getQRCodeForCurrentUser;
