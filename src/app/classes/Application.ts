import type Invoice from "./Invoice";
import {debounce} from 'lodash';
import type {StorageInterface} from "./Storage";
import type Config from "../Config";
import DataFactory from "../data/DataFactory";
import dateFormats from "../data/dateFormats";
import locales from "../data/locales";
import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import counter from "../../app/saveStore";


export interface Settings{
    locale: string;
    dateFormat: string;
}

export default class Application {

    config: Config;
    settings: Settings;
    storage: StorageInterface;
    factory: DataFactory;


    data: Invoice;
    dataStorage: Writable<Invoice>;
    settingsStorage: Writable<Settings>;

    saveDebounced: () => void;
    saveSettingsDebounced: () => void;

    static defaultSettings() {
        const locale = navigator.language || Object.keys(locales)[0];
        const dateFormat = dateFormats[locale] || Object.values(dateFormats)[0];
        return {locale, dateFormat};
    }

    constructor(config: Config, storage: StorageInterface,factory: DataFactory) {
        this.config = config;
        this.storage = storage;
        this.factory = factory;
        this.saveDebounced = debounce(() => this.save(), 1000);
        this.saveSettingsDebounced = debounce(() => this.saveSettings(), 1000);
    }

    initialize() {
        this.settings = this.storage.load('settings') || Application.defaultSettings();
        this.dataStorage = writable(this.data);
        this.setData(this.storage.load('data')||{});
        this.dataStorage.subscribe((data: Invoice) => {
            this.data = data;
            this.saveDebounced();
            counter.increment();
        });
        this.settingsStorage = writable(this.settings);
        this.settingsStorage.subscribe((data: Settings) => {
            this.saveSettingsDebounced();
        });
    }

    save() {
        this.storage.save('data', this.data);
        return this.data;
    }

    clear() {
        return this.setData({});
    }

    setData(data: Object) {
        this.data = this.factory.invoice();
        this.data.assign(data);
        this.dataStorage.set(this.data);
        return this.save();
    }

    saveSettings() {
        this.storage.save('settings', this.settings);
        return this.settings;
    }

}
