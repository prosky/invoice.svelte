export default class Product {
  constructor(hash, description, price, quantity, taxRate) {
    this.price = 0;
    this.quantity = 0;
    this.taxRate = 0;
    this.hash = hash;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.taxRate = taxRate;
  }
}
