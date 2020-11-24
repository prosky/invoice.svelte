import dateFormats from "./dateFormats";
import {currencies} from "./currencies";
import Invoice from "../classes/Invoice";
import Product from "../classes/Product";
import {getLocaleFromNavigator} from "svelte-i18n";
import countries from "./countries";


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
        const [, country] = locale.split('-') || Object.keys(countries)[0];
        const currency = currencies[country] || Object.keys(currencies)[0];
        return new DataFactory(locale, dateFormat, country, currency);
    }

    invoice = (): Invoice => new Invoice(this.country, this.currency, this.locale, this.dateFormat)
    product = (): Product => new Product('', 0.00, 1, 21)


}