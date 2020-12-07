import {Writable, writable} from "svelte/store";
import {deserialize, serialize} from "./serialize";

function factory<T>(key: string, defaultValue: T): Writable<T> {
	let stored = localStorage.getItem(key);
	let object: T;
	if (stored) {
		console.log(stored, typeof stored);
		object = deserialize(stored);
	}
	const w = writable<T>(object || defaultValue);
	w.subscribe(value => {
		if(value !== undefined){
			localStorage.setItem(key, serialize(value));
		}else{
			localStorage.removeItem(key);
		}
	});
	return w;
}

export default factory;
