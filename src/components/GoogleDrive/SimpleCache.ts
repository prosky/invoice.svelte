export default class SimpleCache<X, T> {

    private readonly cache: Map<X, T>;
    private readonly size: number;

    constructor(size: number = 1000) {
        this.cache = new Map;
        this.size = size;
    }

    add(key: X, value: T): void {
        this.cache.set(key, value);
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys()[0]);
        }
    }

    get(key: X): T | undefined {
        return this.cache.get(key);
    }

    delete(key: X): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}