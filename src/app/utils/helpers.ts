
type T = any;

export const ensure = (obj: T, prop: keyof T, val: any) => obj[prop] || (obj[prop] = val);


export const doSave = (what: Function, def?: any, err?: (e: any) => void) => {
	try {
		return what()
	} catch (e) {
		console.debug(e);
		err && err(e);
		if (def instanceof Function) {
			return def();
		}
		return def
	}
}
