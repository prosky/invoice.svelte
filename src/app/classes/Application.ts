import type Invoice from "./Invoice";
import type {StorageInterface} from "./Storage";
import DataFactory from "../data/DataFactory";


export default class Application {

    locale: string;
    dateFormat: string;
    formatter: Intl.NumberFormat;

    factory: DataFactory;

    data: Invoice;

    storage: StorageInterface;


    constructor(storage: StorageInterface) {
        this.storage = storage;
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

    clear(){
        this.data = this.factory.invoice();
    }


}