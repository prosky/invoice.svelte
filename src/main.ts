import './scss/global.scss';
import App from './App.svelte';
import {app as application} from './app';
import {addMessages,init,getLocaleFromNavigator} from 'svelte-i18n';
import cs from './locale/cs.js';
import en from './locale/en.js';

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});
addMessages('en-EN', en);
addMessages('cs-CZ', cs);

application.load();
const basePath = location.pathname.replace('index.html','');
console.log(location);
const app = new App({
	target: document.body,
	props: {
        basePath
		//name: 'world'
	}
});

export default app;