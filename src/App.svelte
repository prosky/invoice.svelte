<script lang="ts">
	import Home from "./pages/Home.svelte";
	//import Settings from "./pages/Settings.svelte";
	import counter from "./app/utils/counter";
	import {Button, MaterialApp} from 'svelte-materialify';
	import Flashes from "./components/Flashes/Flashes.svelte";
	import Debugger from "./components/Debugger/Debugger.svelte";
	import type Application from "./app/classes/Application";

	/*
	export let basePath: string;
	export let url = "";
	export const pages = [
			['', 'home', Home],
			['settings', 'settings', Settings],
	];*/
	export let theme = 'dark';
	export let application: Application;

</script>


<MaterialApp {theme}>
	<Debugger>
		<Button title="Saves count" size="small" disabled icon class="primary-color">{$counter}</Button>
	</Debugger>
	<Flashes/>
	<main>
		<Home {application}/>
	</main>
</MaterialApp>

<style type="scss">

</style>

