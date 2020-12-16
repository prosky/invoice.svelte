import {writable} from "../../../web_modules/svelte/store.js";
export function createCounter() {
  const {subscribe, set, update} = writable(0);
  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0)
  };
}
export default createCounter();
