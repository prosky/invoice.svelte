import {LocalStorage} from "./classes/Storage";
import Application from "./classes/Application";
import Config from "./Config";
import DataFactory from "./data/DataFactory";

export const storage = new LocalStorage();
export const config = new Config();
export const factory = DataFactory.default();
export default new Application(config, storage,factory);
