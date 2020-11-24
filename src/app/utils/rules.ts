import {format} from 'date-fns';
const now = new Date();

export type Rule = (value: any) => false | string;

export const dateFormat: Rule = (value) => {
    try {
        format(now, value)
    } catch (e) {
        return e.message;
    }
    return false;
}
export const required = (value:any)=> value ? false : 'forms.messages.required';