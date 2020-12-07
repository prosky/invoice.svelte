<script lang="ts">
	import type Application from '../app/classes/Application';
	import Editor from "../components/Invoice/Editor.svelte";
	import Invoice from "../app/classes/Invoice";
	import {onMount} from "svelte";

	export let application: Application;
	export let onPrintCancel: () => void;

	let invoice: Invoice;
	application.invoice.subscribe((inv: Invoice) => {
		invoice = inv;
	});
	onMount(() => {
		setTimeout(() => {
			//window.addEventListener('focus', onPrintCancel, {once: true});
			window.print();
			onPrintCancel();
		}, 500);
	});
</script>

<Editor bind:invoice/>
