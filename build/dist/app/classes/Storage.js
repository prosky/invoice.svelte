import {deserialize, serialize as serialize2} from "../utils/serialize.js";
export class LocalStorage {
  load(key) {
    const data = window.localStorage.getItem(key);
    if (!data)
      return null;
    return deserialize(data);
  }
  save(key, data) {
    window.localStorage.setItem(key, serialize2(data));
  }
}
