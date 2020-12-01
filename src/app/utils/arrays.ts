export function add<T>(arr: T[], val: T): T[] {
	arr.push(val);
	return arr;
}

export function remove<T>(arr: T[], index: number): T[] {
	arr.splice(index, 1);
	return arr;
}

export function move<T>(arr: T[], old_index: number, new_index: number): T[] {
	if (old_index !== new_index) {
		const element = arr[old_index];
		arr.splice(old_index, 1);
		arr.splice(new_index > old_index ? new_index - 1 : new_index, 0, element);
	}
	return arr;
}
