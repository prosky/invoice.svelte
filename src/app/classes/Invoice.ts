import Company from "./Company";
import type Product from "./Product";

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
    term: string
}

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export default class Invoice implements InvoiceInterface {

    logo ='';

    labels = defaultLabels;

    locale;
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

    currency;
    notes = '';//'It was great doing business with you.',
    term = '';//'Please make the payment by the due date.',

    paymentMethod = '';

    constructor(country: string, currency: string, locale: string, dateformat: string) {
        this.locale = locale;
        this.currency = currency;
        this.dateFormat = dateformat;
        this.company = new Company(country);
        this.client = new Company(country);
    }

    assign(data: Record<string, any>) {
        for (let [prop, value] of Object.entries(data)) {
            const method = `set` + capitalize(prop);
            if (typeof this[method] === 'function') {
                this[method](value);
            } else if (this.hasOwnProperty(prop)) {
                this[prop] = value;
            }
        }
    }

    setDate(date: any) {
        if (typeof date === 'undefined') {
            throw new Error('Date must be specified');
        }
        if (typeof date === 'string') {
            this.date = new Date(date);
        }
        if(!date){
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
        if(!date){
            date = new Date();
        }
        this.dueDate = date;
    }
}
