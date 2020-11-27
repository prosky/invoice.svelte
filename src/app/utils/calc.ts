import type Product from "../classes/Product";
import type Invoice from "../classes/Invoice";

export const calculateTax = (invoice: Invoice, data: Product): number => {
    const {taxRate, price, quantity} = data;
    if (invoice.withVAT) {
        return price * (taxRate / 100) * quantity;
    }
    return 0;
}

export const calculatePrice = (data: Product): number => {
    const {price, quantity} = data;
    return price * quantity;
}

export const sumPrice = (invoice: Invoice): number => {
    return invoice.products.map(calculatePrice).reduce((a, b) => a + b, 0);
}

export const sumTax = (invoice: Invoice): number => {
    return invoice.products.map((product: Product) => calculateTax(invoice, product)).reduce((a, b) => a + b, 0);
}
