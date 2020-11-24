import type Invoice from "./Invoice";
import type {StorageInterface} from "./Storage";
import type Config from "../Config";
import DataFactory from "../data/DataFactory";


export default class Application {

    config: Config;
    locale: string;
    dateFormat: string;
    formatter: Intl.NumberFormat;

    factory: DataFactory;

    data: Invoice;

    storage: StorageInterface;


    constructor(config: Config, storage: StorageInterface) {
        this.storage = storage;
        this.config = config;
        this.factory = DataFactory.default();
    }

    load() {
        const invoice = this.factory.invoice();
        const data = this.storage.load('data');
        this.data = invoice;
        if (data) {
            Object.assign(this.data, data);
        }
    }

    save() {
        this.storage.save('data', this.data);
    }

    clear() {
        return this.data = this.factory.invoice();
    }


}