export default class User {
  constructor(
    firstName = '',
    lastName = '',
    email = '',
    phoneNumber = '',
    balance= '',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.balance = balance;
  }
}
