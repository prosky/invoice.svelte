import {writable} from 'svelte/store';
export class DebugMessage {
    message: any;
    type: string = 'debug';
    constructor(message: any, type: string | undefined = 'debug') {
        this.message = message;
        this.type = type;
    }
    setType(type: string) {
        this.type = type;
    }
}
export class Group {
    items: DebugMessage[];
    constructor(items: DebugMessage[]) {
        this.items = items;
    }
    type = (type: string) => {
        for (const el of this.items) el.setType(type);
        return this;
    };
    debug = debug
}
export const storage= writable<DebugMessage[]>([]);
const {set, update} = storage;
const add = (message: any, type?: string) => {
    let item = new DebugMessage(message, type);
    update((value) => {
        value.push(item);
        return value;
    });
    return item;
};
export const debug = (...any): Group => {
    return new Group(any.map((item) => add(item, 'debug')));
};
export const reset = () => set([]);
export const remove = (message: DebugMessage) => update((value) => value.filter(val => val !== message));
export default debug;
