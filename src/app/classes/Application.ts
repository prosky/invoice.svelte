import type Config from "../Config";
import type Invoice from "./Invoice";
import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {StorageInterface} from "./Storage";
import type DataFactory from "../data/DataFactory";
import {debounce} from 'lodash';
import locales from "../data/locales";
import counter from "../../app/utils/counter";
import dateFormats from "../data/dateFormats";
import flashes from "../../components/Flashes/flashes";

export interface Settings {
	locale: string;
	dateFormat: string;
}

export default class Application {

	config: Config;
	storage: StorageInterface;
	factory: DataFactory;
	invoice: Writable<Invoice>;
	settings: Writable<Settings>;

	saveDebounced: (invoice: Invoice) => void;
	saveSettingsDebounced: (settings: Settings) => void;

	lock: boolean = false;
	private initialized: boolean = false;

	static defaultSettings() {
		const locale = navigator.language || Object.keys(locales)[0];
		const dateFormat = dateFormats[locale] || Object.values(dateFormats)[0];
		return {locale, dateFormat};
	}

	constructor(config: Config, storage: StorageInterface, factory: DataFactory) {
		this.config = config;
		this.storage = storage;
		this.factory = factory;
		this.saveDebounced = debounce((invoice) => this.save(invoice), 1000);
		this.saveSettingsDebounced = debounce((settings) => this.saveSettings(settings), 1000);
	}

	save(invoice: Invoice) {
		counter.increment();
		console.debug('saving',invoice);
		this.storage.save('invoice', invoice)
		this.lock = false;
	}

	saveSettings(settings: Settings) {
		this.storage.save('settings', settings)
	}

	initialize() {
		if(this.initialized){
			throw Error('Already initialized');
		}
		this.initialized = true;
		let rawInvoice;
		try {
			rawInvoice = this.storage.load('invoice');
			console.debug('rawInvoice',rawInvoice);
		} catch (e) {
			flashes.error(e);
		}
		this.invoice = writable(this.factory.invoice().assign(rawInvoice || {}));
		this.invoice.subscribe((data: Invoice) => {
			console.debug('change',data);
			this.lock = true;
			this.saveDebounced(data);
		});

		let rawSettings;
		try {
			rawSettings = this.storage.load('settings')
		} catch (e) {
			flashes.error(e);
		}
		this.settings = writable(rawSettings || Application.defaultSettings());
		this.settings.subscribe((data: Settings) => {
			this.saveSettingsDebounced(data);
		});
		window.addEventListener("beforeunload", this.beforeUnload);
	}

	clear() {
		this.setData({});
	}

	setData(data: Object) {
		this.invoice.set(this.factory.invoice().assign(data));
	}

	beforeUnload = (e) => {
		if (this.lock) {
			e.preventDefault();
			flashes.info('Changes are not saved');
			e.returnValue = 'Changes are not saved';
		}
	}
}
