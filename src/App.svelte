<script lang="ts">
	import Home from "./pages/Home.svelte";
	//import Settings from "./pages/Settings.svelte";
	import counter from "./app/utils/counter";
	import {Button, MaterialApp} from 'svelte-materialify';
	import Flashes from "./components/Flashes/Flashes.svelte";
	import Debugger from "./components/Debugger/Debugger.svelte";
	import type Application from "./app/classes/Application";
	import Print from "./pages/Print.svelte";

	/*
	export let basePath: string;
	export let url = "";
	export const pages = [
			['', 'home', Home],
			['settings', 'settings', Settings],
	];*/
	export let theme = 'dark';
	export let application: Application;
	export let print = false;

	const onPrint = () => {
		print = true;
	}
	const onPrintCancel = () => {
		print = false;
	}
	const onNewFile = () => {
		application.newInvoice();
	}
</script>

<MaterialApp {theme}>
	{#if print}
		<Print {application} {onPrintCancel}/>
	{:else}
		<Debugger>
			<Button title="Saves count" size="small" disabled icon class="primary-color">{$counter}</Button>
		</Debugger>
		<Flashes/>
		<main>
			<Home invoice={application.invoice} {onPrint} {onNewFile}/>
		</main>
	{/if}
</MaterialApp>

