export default class SimpleCache<K, V> {

    private readonly cache: Map<K, V>;
    private readonly size: number;

    constructor(size: number = 1000) {
        this.cache = new Map;
        this.size = size;
    }

    add(key: K, value: V): void {
        this.cache.set(key, value);
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys()[0]);
        }
    }

    get(key: K): V | undefined {
        return this.cache.get(key);
    }

    delete(key: K): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}