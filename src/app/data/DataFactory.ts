import dateFormats from "./dateFormats";
import {defaultCurrencies} from "./currencies";
import Invoice from "../classes/Invoice";
import Product from "../classes/Product";


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
        const dateFormat = dateFormats[locale] || dateFormats[DEFAULT_LOCALE];
        const [, country] = locale.split('-');
        const currency = defaultCurrencies[country];
        return new DataFactory(locale, dateFormat,  country, currency);
    }

    invoice = (): Invoice => new Invoice(this.country, this.currency, this.locale, this.dateFormat)
    product = (): Product => new Product('', 0.00, 1, 21)


}