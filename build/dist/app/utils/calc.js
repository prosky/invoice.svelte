export const calculateTax = (invoice, data) => {
  const {taxRate, price, quantity} = data;
  return price * (taxRate / 100) * quantity;
};
export const calculatePrice = (data) => {
  const {price, quantity} = data;
  return price * quantity;
};
export const sumPrice = (invoice) => {
  return invoice.products.map(calculatePrice).reduce((a, b) => a + b, 0);
};
export const sumTax = (invoice) => {
  return invoice.products.map((product) => calculateTax(invoice, product)).reduce((a, b) => a + b, 0);
};
