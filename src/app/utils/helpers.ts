import flashes from "../../components/Flashes/flashes";

type T = any;

export const ensure = (obj: T, prop: keyof T, val: any) => obj[prop] || (obj[prop] = val);


export const doSave = (what: Function, def?: any) => {
	try {
		return what()
	} catch (e) {
		console.debug(e);
		if (def instanceof Function) {
			return def();
		}
		return def
	}
}
export const doSaveFlash = (what: Function, def?: any) => {
	try {
		return what()
	} catch (e) {
		console.debug(e);
		flashes.error(e);
		if (def instanceof Function) {
			return def();
		}
		return def
	}
}
