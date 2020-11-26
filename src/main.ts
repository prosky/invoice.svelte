import App from './App.svelte';
import context from './app/Context';
import {addMessages,init,getLocaleFromNavigator} from 'svelte-i18n';
import cs from './locale/cs.js';
import en from './locale/en.js';

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});
addMessages('en-EN', en);
addMessages('cs-CZ', cs);

context.initialize();

//const basePath = location.pathname.replace('index.html','');
const app = new App({
    target: document.body,
    props: {

    }
});
export default app;