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
export const saveCallback = (what: Function, err?: (e: any) => void, fin?: () => void) => {
	return async (...args) => {
		try {
			return await what(...args);
		} catch (e) {
			console.debug(e);
			err && err(e);
		}finally {
			fin && fin();
		}
	}
}
