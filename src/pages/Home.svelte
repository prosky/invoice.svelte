<script lang="ts">
	import type Application from '../app/classes/Application';
	import {_} from 'svelte-i18n';
	import Editor from "../components/Invoice/Editor.svelte";
	import Drawers from "../components/Drawers/Drawers.svelte";
	import Invoice from "../app/classes/Invoice";

	export let application: Application;
	let invoice: Invoice;
	application.invoice.subscribe((inv: Invoice) => {
		invoice = inv;
	})
	$: {
		application.invoice.update(() => invoice);
	}
	const onReset = () => {
		application.clear();
	}
</script>

<div class="content">
	<Drawers/>
	<div class="wrapper pt-8 pb-8">
		<h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
		<Editor bind:invoice {onReset}/>
	</div>
</div>
<style>
	.wrapper {
		width: 21cm;
		margin: auto;
	}
</style>
