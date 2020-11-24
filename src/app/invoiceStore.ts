import {writable} from 'svelte/store';
import type Invoice from "./classes/Invoice";
import type {Writable} from "svelte/types/runtime/store";

export const create = (invoice: Invoice): Writable<Invoice> => {
    return writable<Invoice>(invoice);
};