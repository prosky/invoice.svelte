export default class SimpleCache {
  constructor(size = 1e3) {
    this.cache = new Map();
    this.size = size;
  }
  add(key, value) {
    this.cache.set(key, value);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys()[0]);
    }
  }
  get(key, fallback) {
    let value = this.cache.get(key);
    if (value === void 0 && fallback) {
      value = fallback();
    }
    return value;
  }
  delete(key) {
    this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
}
