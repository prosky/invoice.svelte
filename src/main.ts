import App from './App.svelte';
import {addMessages,init,getLocaleFromNavigator} from 'svelte-i18n';
import cs from './locale/cs.js';
import en from './locale/en.js';
import application from "./app";

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});
addMessages('en-EN', en);
addMessages('cs-CZ', cs);


application.initialize();

//const basePath = location.pathname.replace('index.html','');
const app = new App({
    target: document.body,
    props: {
        application
    }
});
export default app;