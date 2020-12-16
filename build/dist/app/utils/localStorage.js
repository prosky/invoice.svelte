import {writable} from "../../../web_modules/svelte/store.js";
import {deserialize, serialize as serialize2} from "./serialize.js";
function factory(key, defaultValue) {
  let stored = localStorage.getItem(key);
  let object;
  if (stored) {
    console.log(stored, typeof stored);
    object = deserialize(stored);
  }
  const w = writable(object || defaultValue);
  w.subscribe((value) => {
    if (value !== void 0) {
      localStorage.setItem(key, serialize2(value));
    } else {
      localStorage.removeItem(key);
    }
  });
  return w;
}
export default factory;
