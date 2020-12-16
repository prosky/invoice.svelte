import {writable} from "../../../web_modules/svelte/store.js";
import {mdiAlert, mdiCloseOctagon, mdiInformation} from "../../../web_modules/@mdi/js.js";
export const iconMap = {
  error: mdiCloseOctagon,
  info: mdiInformation,
  warning: mdiAlert
};
export class FlashMessage {
  constructor(message, type = "info") {
    this.type = "info";
    this.icon = mdiInformation;
    this.message = message;
    this.type = type;
    this.icon = iconMap[type] || mdiInformation;
  }
}
const {subscribe, set, update} = writable([]);
export const flashMessage = (message, type, section) => {
  const flash = new FlashMessage(message, type);
  update((value) => {
    section && console.debug(`section ${section}. Not yet supported`);
    value.push(flash);
    return value;
  });
  return flash;
};
function create(type) {
  const factory = (message) => flashMessage(message, type);
  factory.section = (section) => (message) => flashMessage(message, type, section);
  return factory;
}
export const info = create("info");
export const warning = create("warning");
export const error = create("error");
export const remove = (message) => update((value) => value.filter((val) => val !== message));
export const reset = () => set([]);
export const store = {subscribe, flashMessage, reset, remove};
export default {info, warning, error, flashMessage};
