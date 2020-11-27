import {writable} from 'svelte/store';
import {mdiAlert, mdiCloseOctagon, mdiInformation} from '@mdi/js';

export const iconMap: Record<string, string> = {
    error: mdiCloseOctagon,
    info: mdiInformation,
    warning: mdiAlert
}
export class FlashMessage {
    message: string;
    type: string = 'info';
    icon: string = mdiInformation

    constructor(message: string, type: string | undefined = 'info') {
        this.message = message;
        this.type = type;
        this.icon = iconMap[type] || mdiInformation;
    }
}

const {subscribe, set, update} = writable<FlashMessage[]>([]);

export const flashMessage = (message: string, type?: string) => update((value) => {
    value.push(new FlashMessage(message, type));
    return value;
});
export const info = (message: string) => flashMessage(message, 'info');
export const warning = (message: string) => flashMessage(message, 'warning');
export const error = (message: string) => flashMessage(message, 'error');

export const remove = (message: FlashMessage) => update((value) => value.filter(val => val !== message));
export const reset = () => set([]);
export const store = {subscribe, flashMessage, reset, remove};
export default {
    info, warning, error, flashMessage
};