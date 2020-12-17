<script lang="ts">
	import {_} from 'svelte-i18n';
	import {TextField, Button, Icon} from "svelte-materialify/src";
	import type Company from "app/classes/Company";
	import CustomSelect from "../Inputs/CustomSelect.svelte";
	import countries from "app/data/countries";
	import {mdiContentSave, mdiFormatClear} from "@mdi/js";
	import {companies} from "app/database/index";

	export let company: Company;
	export let suggestion = true;
	let key: number;
	const onInput = (value) => {
		console.log(value);
	};
	const handleStoreCopy = async () => {
		key = await companies.put(company);
		console.log(key);
	};
	const handleStore = async () => {
		 const changes = await companies.update(key, company);
		console.log(changes);
	};
	const handleClear = (value) => {
		console.log(value);
	};

</script>


<div class="company">
	<TextField dense class="mb-1" on:input={onInput} autocomplete="organization"
			   bind:value={company.name}>{$_(`company.name`)}
	</TextField>
	<TextField dense class="mb-1" autocomplete="address-line1"
			   bind:value={company.address}>{$_(`company.address`)}
	</TextField>
	<TextField dense class="mb-1" autocomplete="address-line2"
			   bind:value={company.address2}>{$_(`company.address2`)}
	</TextField>
	<TextField dense class="mb-1" autocomplete="company-identification-number"
			   bind:value={company.cin}>{$_(`company.cin`)}
	</TextField>
	<TextField dense class="mb-1" autocomplete="tax-identification-number"
			   bind:value={company.tin}>{$_(`company.tin`)}
	</TextField>
	<CustomSelect dense bind:value={company.country} items={countries}>
		{$_(`company.country`)}
	</CustomSelect>

	<div class="menu">
		<Button icon on:click={handleStore} title={$_(`company.store`)}>
			<Icon path={mdiContentSave}/>
		</Button>
		<Button icon disabled={!key} on:click={handleStoreCopy} title={$_(`company.storeCopy`)}>
			<Icon path={mdiContentSave}/>
		</Button>
		<Button icon on:click={handleClear} title={$_(`company.clear`)}>
			<Icon path={mdiFormatClear}/>
		</Button>
	</div>

</div>

<style>
	.company {
		position: relative;
	}

	.menu {
		position: relative;
	}
</style>
