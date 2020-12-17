import {writable} from "svelte/store";
import type {Formatter} from "../types";

function createFormatter() {
	let locale, currency;
	const {subscribe, set} = writable<Formatter>(undefined);

	return {
		subscribe,
		set(val) {
			console.log(val);
		},
		setInvoice: (invoice) => {
			if (invoice.locale !== locale || invoice.currency !== currency) {
				locale = invoice.locale;
				currency = invoice.currency;
				//let formatter = new Intl.NumberFormat(locale, {style: "currency", currency});
				set((number: number, sign: boolean = false) => {
					if (sign) return number.toLocaleString(locale, {currency,minimumFractionDigits: 2, maximumFractionDigits: 2,style:'currency'});
					return number.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
				});
			}
		},
	};
}

export default createFormatter();
