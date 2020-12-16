import {get, writable} from "../../../web_modules/svelte/store.js";
import {locale} from "../../../web_modules/svelte-i18n.js";
import {debounce} from "../../../web_modules/lodash.js";
import locales2 from "../data/locales.js";
import counter2 from "../utils/counter.js";
import {dateTime as dateFormats2} from "../data/dateFormats.js";
import {doSave} from "../utils/helpers.js";
import flashes2 from "../../components/Flashes/flashes.js";
import format from "../utils/currencyFormatter.js";
export default class Application {
  constructor(config, storage, factory) {
    this.lock = false;
    this.initialized = false;
    this.onKeypress = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key.toLowerCase() === "s") {
          this.save();
          return false;
        }
      }
      return true;
    };
    this.beforeUnload = (e) => {
      if (this.lock) {
        this.save();
      }
    };
    this.config = config;
    this.storage = storage;
    this.factory = factory;
    this.saveDebounced = debounce(() => this.save(), 1e3, {
      maxWait: 5e3
    });
    this.saveSettingsDebounced = debounce((settings) => this.saveSettings(settings), 1e3, {
      maxWait: 5e3
    });
  }
  static defaultSettings() {
    const locale2 = navigator.language || Object.keys(locales2)[0];
    const dateFormat = dateFormats2[locale2] || Object.values(dateFormats2)[0];
    return {locale: locale2, dateFormat};
  }
  save() {
    counter2.increment();
    this.storage.save("invoice", get(this.invoice));
    this.lock = false;
  }
  saveSettings(settings) {
    this.storage.save("settings", settings);
  }
  initialize() {
    if (this.initialized) {
      throw Error("Already initialized");
    }
    const rawInvoice = doSave(() => this.storage.load("invoice"), {}, flashes2.error);
    this.invoice = writable(this.factory.invoice().assign(rawInvoice));
    this.invoice.subscribe((invoice) => {
      format.setInvoice(invoice);
      if (this.initialized) {
        this.lock = true;
        this.saveDebounced();
      }
    });
    const rawSettings = doSave(() => this.storage.load("settings"), Application.defaultSettings, flashes2.error);
    this.settings = writable(rawSettings);
    this.settings.subscribe((data) => {
      locale.set(data.locale);
      if (this.initialized) {
        this.saveSettingsDebounced(data);
      }
    });
    window.addEventListener("beforeunload", this.beforeUnload);
    window.addEventListener("keypress", this.onKeypress);
    this.initialized = true;
  }
  newInvoice() {
    this.setData();
  }
  setData(data) {
    this.invoice.set(this.factory.invoice().assign(data));
  }
}
