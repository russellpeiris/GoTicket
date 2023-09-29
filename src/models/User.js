export default class User {
  constructor(
    firstName = '',
    lastName = '',
    email = '',
    phoneNumber = '',
    dueDate = '',
    emergencyContact = '',
    dateOfBirth = '',
    city = '',
    height = '',
    medicalHistory = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.dueDate = dueDate;
    this.emergencyContact = emergencyContact;
    this.dateOfBirth = dateOfBirth;
    this.city = city;
    this.height = height;
    this.medicalHistory = medicalHistory;
  }
}
