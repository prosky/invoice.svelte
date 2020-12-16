import App2 from "./App.svelte.proxy.js";
import {addMessages, init, getLocaleFromNavigator} from "../web_modules/svelte-i18n.js";
import cs2 from "./locale/cs.js";
import en2 from "./locale/en.js";
import application from "./app/index.js";
init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator()
});
addMessages("en-EN", en2);
addMessages("cs-CZ", cs2);
application.initialize();
const app2 = new App2({
  target: document.body,
  props: {
    application
  }
});
export default app2;
