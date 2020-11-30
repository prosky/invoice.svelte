
export interface ProductInterface {
	hash: string,
    description: string
    quantity: number
    taxRate: number
    price: number
}

export default class Product implements ProductInterface {
	hash: string;
    description: string;
    price: number = 0;
    quantity: number = 0;
    taxRate: number = 0;


    constructor(hash:string,description: string, price: number, quantity: number, taxRate: number) {
		this.hash = hash;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.taxRate = taxRate;
    }
}
