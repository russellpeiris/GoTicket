export default class Visa {
  constructor(cardNumber = '', cardHolderName = '', expiryMonth = '', expiryYear = '') {
    this.cardNumber = cardNumber;
    this.cardHolderName = cardHolderName;
    this.expiryMonth = expiryMonth;
    this.expiryYear = expiryYear;
  }
}
