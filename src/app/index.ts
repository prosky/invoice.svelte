import Application from "./classes/Application";
import {LocalStorage} from "./classes/Storage";

export const storage = new LocalStorage();

export const app = new Application(storage);

export default app;
