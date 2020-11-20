export const serialize = (cond: object) => JSON.stringify(cond, function (k, v) {
    const v0 = this[k]
    if (v0) {
        if (v0 instanceof Date) {
            return {$date: v0.toISOString()}
        } else if (v0 instanceof RegExp) {
            return {$regex: v0.source, $options: v0.flags}
        }
    }
    return v
});
export const deserialize = (string: string) => JSON.parse(string, (_, v) => {
    if (v && typeof v === 'object') {
        if (v.$date) {
            return new Date(v.$date)
        } else if (v.$regex) {
            return new RegExp(v.$regex, v.$options)
        }
    }
    return v
});
