import type Config from "../Config";
import type Invoice from "./Invoice";
import type {Writable} from "svelte/store";
import {get, writable} from "svelte/store";
import type {StorageInterface} from "./Storage";
import type DataFactory from "../data/DataFactory";
import {debounce} from 'lodash';
import locales from "../data/locales";
import counter from "../../app/utils/counter";
import dateFormats from "../data/dateFormats";
import {doSave} from "../utils/helpers";
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
		this.saveDebounced = debounce((invoice) => this.save(invoice), 1000, {
			maxWait: 5000
		});
		this.saveSettingsDebounced = debounce((settings) => this.saveSettings(settings), 1000, {
			maxWait: 5000
		});
	}

	save(invoice: Invoice) {
		counter.increment();
		//console.debug('saving',invoice);
		this.storage.save('invoice', invoice)
		this.lock = false;
	}

	saveSettings(settings: Settings) {
		this.storage.save('settings', settings)
	}

	initialize() {
		if (this.initialized) {
			throw Error('Already initialized');
		}
		this.initialized = true;
		const rawInvoice = doSave(() => this.storage.load('invoice'), {}, flashes.error);
		this.invoice = writable(this.factory.invoice().assign(rawInvoice));
		this.invoice.subscribe((data: Invoice) => {
			this.lock = true;
			this.saveDebounced(data);
		});
		const rawSettings = doSave(() => this.storage.load('settings'), Application.defaultSettings, flashes.error);
		this.settings = writable(rawSettings);
		this.settings.subscribe((data: Settings) => {
			this.saveSettingsDebounced(data);
		});
		window.addEventListener("beforeunload", this.beforeUnload);
	}

	newInvoice() {
		this.setData();
	}

	setData(data?: Object) {
		this.invoice.set(this.factory.invoice().assign(data));
	}

	beforeUnload = (e) => {
		if (this.lock) {
			this.save(get(this.invoice));
			/*e.preventDefault();
			flashes.info('Changes are not saved');
			e.returnValue = 'Changes are not saved';*/
		}
	}
}
