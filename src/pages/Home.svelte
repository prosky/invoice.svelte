<script lang="ts">
	import {_} from 'svelte-i18n';
	import Editor from "../components/Invoice/Editor.svelte";
	import type Tab from "../components/Drawers/Drawers.svelte";
	import Drawers from "../components/Drawers/Drawers.svelte";
	import Invoice from "../app/classes/Invoice";
	import localStorage from "../app/utils/localStorage";
	import type {Writable} from "svelte/store";

	export let onPrint;
	export let onNewFile;
	export let invoice: Writable<Invoice>;
	const active = localStorage<Tab>('activeDrawer', undefined);

</script>

<div class="content">
	<Drawers bind:active={$active}/>
	<div class="wrapper print pt-8 pb-8">
		<h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
		<Editor bind:invoice={$invoice} {onNewFile} {onPrint}/>
	</div>
</div>
<style>
	.wrapper {
		width: 21cm;
		margin: auto;
	}
</style>
