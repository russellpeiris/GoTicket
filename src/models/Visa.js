export default class Visa {
  constructor(cardNumber = '', cardHolderName = '', expiryDate = '') {
    this.cardNumber = cardNumber;
    this.cardHolderName = cardHolderName;
    this.expiryDate = expiryDate;
  }
}
