import {deserialize, serialize} from "../utils/serialize";

export interface StorageInterface {

  save(key: string, data: any): void;

  load(key:string): any | null;

}

export class LocalStorage implements StorageInterface {
  load(key:string): any | null {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return deserialize(data);
  }

  save(key: string, data: any): void {
    window.localStorage.setItem(key, serialize(data));
  }

}


