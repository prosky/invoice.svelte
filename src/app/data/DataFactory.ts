import Invoice, {InvoiceLabels} from "../classes/Invoice";
import Product from "../classes/Product";

import countries from "./countries";
import currencies from "./currencies";
import dateFormats from "./dateFormats";
import {json} from "svelte-i18n";

let formatter: (string) => object;
json.subscribe((f) => {
	formatter = f;
})

function uid() {
	return Math.random().toString(36).substring(7);
}

function date(days = 0) {
	const date = new Date();
	days && date.setDate(date.getDate() + days);
	return date;
}

const DEFAULT_LOCALE = 'en-EN';

export default class DataFactory {

	private readonly locale: string;
	private readonly dateFormat: string;
	private readonly country: string;
	private readonly currency: string;


	constructor(locale: string, dateFormat: string, country: string, currency: string) {
		this.locale = locale;
		this.dateFormat = dateFormat;
		this.country = country;
		this.currency = currency;
	}

	static default(): DataFactory {

		const locale = navigator.language || DEFAULT_LOCALE;
		const dateFormat = dateFormats[locale] || dateFormats[DEFAULT_LOCALE] || Object.keys(dateFormats)[0];
		const country = locale.split('-')[1] || Object.keys(countries)[0];
		const currency = currencies[country] || Object.keys(currencies)[0];
		return new DataFactory(locale, dateFormat, country, currency);
	}

	invoiceLabels = () => {
		const values = formatter('defaultValues.invoice.labels');
		const labels = new InvoiceLabels();
		return labels.assign(values);
	}

	invoice = (): Invoice => new Invoice(uid(), date(), date(14), this.country, this.currency, this.locale, this.dateFormat, this.invoiceLabels())
	product = (): Product => new Product(uid(), '', 0.00, 1, 21)


}
