import Company from "./Company";
import type Product from "./Product";
import Entity from "./Entity";

export interface InvoiceLabels {
	title: string
	date: string
	dueDate: string
	company: string
	client: string

	//ProductLine
	description: string,
	quantity: string,
	price: string,
	taxRate: string,
	sum: string,

	//Summary
	tax: string,
	subTotal: string,
	total: string,

	//Notes
	notes: string,
	terms: string
}

const defaultLabels: InvoiceLabels = {
	title: 'Invoice#',
	date: 'Invoice Date',
	dueDate: 'Due Date',
	company: 'Company:',//Dodavatel
	client: 'Client:',//Odběratel

	description: 'Item Description',
	quantity: 'Quantity',
	price: 'Price',
	taxRate: 'Tax Rate',
	sum: 'Sum',
	tax: 'Sale Tax',
	subTotal: 'Sub Total',
	total: 'TOTAL',
	notes: '',
	terms: ''
};

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
	labels = defaultLabels;

	locale = undefined;
	dateFormat: string;
	withVAT = false;
	title = 'INVOICE';
	name = '';
	accountNumber = '';

	date = new Date();
	dueDate = new Date();
	products = [];

	company: Company;
	client: Company;

	currency= undefined;
	notes = '';//'It was great doing business with you.',
	terms = '';//'Please make the payment by the due date.',

	paymentMethod = '';

	constructor(hash: string, country: string, currency: string, locale: string, dateformat: string) {
		super();
		this.hash = hash;
		this.locale = locale;
		this.currency = currency;
		this.dateFormat = dateformat;
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
