import Application from "./classes/Application";
import {LocalStorage} from "./classes/Storage";
import Config from "./Config";

export const storage = new LocalStorage();
export const config = new Config();
export const app = new Application(config, storage);

export default app;
