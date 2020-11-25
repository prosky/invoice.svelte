import type Invoice from "./Invoice";
import type {StorageInterface} from "./Storage";
import type Config from "../Config";
import DataFactory from "../data/DataFactory";


export default class Application {

    config: Config;

    locale: string;
    dateFormat: string;

    factory: DataFactory;
    data: Invoice;
    storage: StorageInterface;


    constructor(config: Config, storage: StorageInterface) {
        this.config = config;
        this.storage = storage;
        this.factory = DataFactory.default();
    }

    load() {
        this.data = this.factory.invoice();
        const data = this.storage.load('data');
        if (data) {
            this.data.assign(data);
        }
        return this.data;
    }

    save() {
        this.storage.save('data', this.data);
        return this.data;
    }

    clear() {
        this.data = this.factory.invoice();
        return this.data;
    }


}