const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export default class Entity {
	assign(data: Record<string, any>) {
		if (!data) return this;
		for (let [prop, value] of Object.entries(data)) {
			const method = `set` + capitalize(prop);
			if (typeof this[method] === 'function') {
				this[method](value);
			} else if (this.hasOwnProperty(prop)) {
				if (this[prop] instanceof Entity) {
					this[prop].assign(value);
				} else {
					this[prop] = value;
				}
			} else {
				console.debug('Invalid property ' + prop);
			}
		}
		return this;
	}
}
