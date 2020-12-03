import type Product from "./Product";
import Company from "./Company";
import Entity from "./Entity";


export class ProductLabels extends Entity {
	description: string = undefined
	quantity: string = undefined
	price: string = undefined
	taxRate: string = undefined
	sum: string = undefined
}

export class InvoiceLabels extends Entity {
	title: string = undefined
	date: string = undefined
	dueDate: string = undefined
	company: string = undefined
	client: string = undefined

	//ProductLine
	products: ProductLabels = new ProductLabels();

	//Summary
	tax: string = undefined
	subTotal: string = undefined
	total: string = undefined

	//Notes
	notes: string = undefined
	terms: string = undefined

	setProducts(productLabels: ProductLabels) {
		this.products.assign(productLabels);
	}
}

export interface InvoiceInterface {

	hash: string;

	fileId?: string;

	labels: InvoiceLabels

	title: string
	logo?: string
	locale: string
	dateFormat: string
	withVAT: boolean

	name: string
	accountNumber: string
	paymentMethod: string
	company: Company
	client: Company

	date: Date
	dueDate: Date

	products: Product[]
	currency: string
	notes: string
	terms: string
}


export default class Invoice extends Entity implements InvoiceInterface {

	hash = undefined;
	fileId = undefined;
	logo = undefined;
	labels = undefined;

	locale = undefined;
	dateFormat: string;
	withVAT = false;
	title = undefined;
	name = undefined;
	accountNumber = undefined;

	date = new Date();
	dueDate = new Date();
	products = [];

	company: Company;
	client: Company;

	currency = undefined;
	notes = '';//'It was great doing business with you.',
	terms = '';//'Please make the payment by the due date.',

	paymentMethod = '';

	constructor(hash: string, country: string, currency: string, locale: string, dateformat: string, labels: InvoiceLabels) {
		super();
		this.hash = hash;
		this.locale = locale;
		this.currency = currency;
		this.dateFormat = dateformat;
		this.labels = labels;
		this.company = new Company(country);
		this.client = new Company(country);
	}

	setDate(date: any) {
		if (typeof date === 'undefined') {
			throw new Error('Date must be specified');
		}
		if (typeof date === 'string') {
			this.date = new Date(date);
		}
		if (!date) {
			date = new Date();
		}
		this.date = date;
	}

	setDueDate(date: any) {
		if (typeof date === 'undefined') {
			throw new Error('Date must be specified');
		}
		if (typeof date === 'string') {
			this.dueDate = new Date(date);
		}
		if (!date) {
			date = new Date();
		}
		this.dueDate = date;
	}
}
