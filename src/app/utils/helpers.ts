type T = any;

export const ensure = (obj: T, prop: keyof T, val: any) => obj[prop] || (obj[prop] = val);

