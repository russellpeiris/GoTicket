// import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
// import {useState} from 'react';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {auth} from '../config/firebase';
// import {PrimaryButton, InputField} from '../components/index';
// import { Text } from '@rneui/themed';
// const SignUpScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = () => {
//     console.log(`object`);
//     createUserWithEmailAndPassword(auth, email, password).then(
//         (userCredentials) => {
//           const user = userCredentials.user;
//         },
//     );
//   };
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <View style={styles.inputContainer}>
//         <Text style={{fontSize: 24, fontWeight: 'bold'}}>Login</Text>
//         <InputField
//           placeholder="Email"
//           value={email}
//           onChangeText={(value) => setEmail(value)}
//         />
//         <InputField
//           placeholder="Password"
//           value={password}
//           onChangeText={(value) => setPassword(value)}
//           secureTextEntry
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <PrimaryButton text="Login" />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   inputContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 17
//   },
//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 43,
//     gap: 10,
//     width: '60%',
//   },
// });
