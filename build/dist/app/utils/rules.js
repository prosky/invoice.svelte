import {format} from "../../../web_modules/date-fns.js";
const now = new Date();
export const dateFormat = (value) => {
  try {
    format(now, value);
  } catch (e) {
    return e.message;
  }
  return false;
};
export const required = (value) => value ? false : "forms.messages.required";
