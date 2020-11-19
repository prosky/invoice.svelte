
export interface ProductInterface {
    description: string
    quantity: number
    taxRate: number
    price: number
}

export default class Product implements ProductInterface {
    description: string;
    price: number = 0;
    quantity: number = 0;
    taxRate: number = 0;


    constructor(description: string, price: number, quantity: number, taxRate: number) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.taxRate = taxRate;
    }
}
