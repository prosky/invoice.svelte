type T = any;

export const ensure = (obj: T, prop: keyof T, val: any) => obj[prop] || (obj[prop] = val);


export const doSave = (what: Function, def?: any, err?: (e: any) => void) => {
	const ret = () => def instanceof Function ? def() : def;
	try {
		return what() || ret();
	} catch (e) {
		console.debug(e);
		err && err(e);
		return ret()
	}
}
