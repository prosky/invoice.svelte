<script lang="ts">
	import type Application from '../app/classes/Application';
	import {_} from 'svelte-i18n';
	import Wrapper from "../components/Wrapper/Wrapper.svelte";
	import Editor from "../components/Invoice/Editor.svelte";
	import Drawers from "../components/Drawers/Drawers.svelte";

	export let application: Application;
	const onReset = () => {
		application.clear();
	}
</script>

<div class="content">
	<Drawers />
	<Wrapper>
		<div class="pt-8 pb-8">
			<h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
			<Editor invoice={application.invoice} {onReset}/>
		</div>
	</Wrapper>
</div>

