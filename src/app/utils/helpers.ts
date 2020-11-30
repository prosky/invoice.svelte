type T = any;

export const ensure = (obj: T, prop: keyof T, val: any) => obj[prop] || (obj[prop] = val);

export function array_move(arr, old_index, new_index) {
	if (new_index >= arr.length) {
		let k = new_index - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
}

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
