import {LocalStorage} from "./classes/Storage.js";
import Application2 from "./classes/Application.js";
import Config2 from "./Config.js";
import DataFactory2 from "./data/DataFactory.js";
export const storage = new LocalStorage();
export const config = new Config2();
export const factory = DataFactory2.default();
export default new Application2(config, storage, factory);
