<script lang="ts">
	import {_} from 'svelte-i18n';
	import Wrapper from "../components/Wrapper/Wrapper.svelte";
	import Editor from "../components/Invoice/Editor.svelte";
	import Drawer from "../components/Drawer/Drawer.svelte";
	import type Invoice from '../app/classes/Invoice';
	import type Application from '../app/classes/Application';

	export let application: Application;
	const dataStorage = application.dataStorage;
	let invoice: Invoice = application.data;
	dataStorage.subscribe((value: Invoice) => {
		invoice = value;
	});
	$:if (invoice) {
		dataStorage.update(() => invoice);
	}
	const onReset = () => {
		application.clear();
	}

</script>

<div class="content">
	<Drawer active/>
	<Wrapper>
		<div class="pt-8 pb-8">
			<h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
			<Editor {invoice} {onReset}/>
		</div>
	</Wrapper>
</div>

