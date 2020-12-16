import {writable} from "../../../web_modules/svelte/store.js";
export class DebugMessage {
  constructor(message, type = "debug") {
    this.type = "debug";
    this.message = message;
    this.type = type;
  }
  setType(type) {
    this.type = type;
  }
}
export class Group {
  constructor(items) {
    this.type = (type) => {
      for (const el of this.items)
        el.setType(type);
      return this;
    };
    this.debug = debug;
    this.items = items;
  }
}
export const storage = writable([]);
const {set, update} = storage;
const add = (message, type) => {
  let item = new DebugMessage(message, type);
  update((value) => {
    value.push(item);
    return value;
  });
  return item;
};
export const debug = (...any) => {
  return new Group(any.map((item) => add(item, "debug")));
};
export const reset = () => set([]);
export const remove = (message) => update((value) => value.filter((val) => val !== message));
export default debug;
