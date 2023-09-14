export function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return {
        email: 'Email is already in use, use a different email or login.',
      };
    case 'auth/invalid-email':
      return {
        email: 'Please enter a valid email.',
      };
    case 'auth/user-not-found':
      return {
        email: 'User not found',
      };
    case 'auth/weak-password':
      return {
        password: 'Please enter a strong password.',
      };
    case 'auth/wrong-password':
      return {
        password: 'Password is incorrect',
      };
    case 'auth/too-many-requests':
      return {
        email: 'Too many requests, please try again later.',
      };
    default:
      return {
        email: 'An error occurred',
      };
  }
}
