import Invoice2, {InvoiceLabels} from "../classes/Invoice.js";
import Product2 from "../classes/Product.js";
import countries2 from "./countries.js";
import currencies2 from "./currencies.js";
import dateFormats2 from "./dateFormats.js";
import {json} from "../../../web_modules/svelte-i18n.js";
let formatter;
json.subscribe((f) => {
  formatter = f;
});
function uid() {
  return Math.random().toString(36).substring(7);
}
function date(days = 0) {
  const date2 = new Date();
  days && date2.setDate(date2.getDate() + days);
  return date2;
}
const DEFAULT_LOCALE = "en-EN";
export default class DataFactory {
  constructor(locale, dateFormat, country, currency) {
    this.invoiceLabels = () => {
      const values = formatter("defaultValues.invoice.labels");
      const labels = new InvoiceLabels();
      return labels.assign(values);
    };
    this.invoice = () => new Invoice2(uid(), date(), date(14), this.country, this.currency, this.locale, this.dateFormat, this.invoiceLabels());
    this.product = () => new Product2(uid(), "", 0, 1, 21);
    this.locale = locale;
    this.dateFormat = dateFormat;
    this.country = country;
    this.currency = currency;
  }
  static default() {
    const locale = navigator.language || DEFAULT_LOCALE;
    const dateFormat = dateFormats2[locale] || dateFormats2[DEFAULT_LOCALE] || Object.keys(dateFormats2)[0];
    const country = locale.split("-")[1] || Object.keys(countries2)[0];
    const currency = currencies2[country] || Object.keys(currencies2)[0];
    return new DataFactory(locale, dateFormat, country, currency);
  }
}
