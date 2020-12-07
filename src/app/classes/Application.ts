import type Config from "../Config";
import type Invoice from "./Invoice";
import type {Writable} from "svelte/store";
import {get, writable} from "svelte/store";
import {locale} from 'svelte-i18n';
import type {StorageInterface} from "./Storage";
import type DataFactory from "../data/DataFactory";
import {debounce} from 'lodash';
import locales from "../data/locales";
import counter from "../../app/utils/counter";
import {dateTime as dateFormats} from "../data/dateFormats";
import {doSave} from "../utils/helpers";
import flashes from "../../components/Flashes/flashes";
import format from '../../app/utils/currencyFormatter';

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

	saveDebounced: () => void;
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
		this.saveDebounced = debounce(() => this.save(), 1000, {
			maxWait: 5000
		});
		this.saveSettingsDebounced = debounce((settings) => this.saveSettings(settings), 1000, {
			maxWait: 5000
		});
	}

	save() {
		counter.increment();
		//console.debug('saving',invoice);
		this.storage.save('invoice', get(this.invoice))
		this.lock = false;
	}

	saveSettings(settings: Settings) {
		this.storage.save('settings', settings)
	}

	initialize() {
		if (this.initialized) {
			throw Error('Already initialized');
		}
		const rawInvoice = doSave(() => this.storage.load('invoice'), {}, flashes.error);
		this.invoice = writable(this.factory.invoice().assign(rawInvoice));
		this.invoice.subscribe((invoice) => {
			format.setInvoice(invoice);
			if (this.initialized) {
				this.lock = true;
				this.saveDebounced();
			}
		});
		const rawSettings = doSave(() => this.storage.load('settings'), Application.defaultSettings, flashes.error);
		this.settings = writable(rawSettings);
		this.settings.subscribe((data: Settings) => {
			locale.set(data.locale);
			if (this.initialized) {
				this.saveSettingsDebounced(data);
			}
		});
		window.addEventListener("beforeunload", this.beforeUnload);
		window.addEventListener("keypress", this.onKeypress);
		this.initialized = true;
	}

	onKeypress = (event: KeyboardEvent) => {
		if (event.ctrlKey || event.metaKey) {
			if (event.key.toLowerCase() === 's') {
				this.save();
				return false;
			}
		}
		return true;
	}

	newInvoice() {
		this.setData();
	}

	setData(data?: Object) {
		this.invoice.set(this.factory.invoice().assign(data));
	}

	beforeUnload = (e) => {
		if (this.lock) {
			this.save();
			/*e.preventDefault();
			flashes.info('Changes are not saved');
			e.returnValue = 'Changes are not saved';*/
		}
	}
}
