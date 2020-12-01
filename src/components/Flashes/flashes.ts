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

//const sections: Writable<Record<string, FlashMessage[]>> = writable({'':[]});
const {subscribe, set, update} = writable<FlashMessage[]>([]);

export const flashMessage = (message: string, type?: string, section?: string) => {
	const flash = new FlashMessage(message, type);
	update((value) => {
		section && console.debug(`section ${section}. Not yet supported`);
		value.push(flash);
		return value;
	})
	return flash;
};

interface Message {
	(message: string): FlashMessage,

	section: Section
}

interface Section {
	(section: string): (message: string) => FlashMessage,
}

function create(type: string): Message {
	const factory = (message: string) => flashMessage(message, type);
	factory.section = (section: string) => (message: string) => flashMessage(message, type, section);
	return factory;
}

export const info = create('info');
export const warning = create('warning');
export const error = create('error');

export const remove = (message: FlashMessage) => update((value) => value.filter(val => val !== message));
export const reset = () => set([]);
export const store = {subscribe, flashMessage, reset, remove};

export default {info, warning, error, flashMessage};
