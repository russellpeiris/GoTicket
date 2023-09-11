export function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email is already in use'
    case 'auth/invalid-email':
      return 'Email is invalid'
    case 'auth/weak-password':
      return 'Password is too weak'
    case 'auth/user-not-found':
      return 'User not found'
    case 'auth/wrong-password':
      return 'Password is incorrect'
    default:
      return 'An error occurred'
  }
}