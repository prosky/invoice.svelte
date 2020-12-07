<script lang="ts">
	import type {Writable} from "svelte/store";
	import type {Settings} from "../app/classes/Application";

	import {_} from "svelte-i18n";
	import {Card, CardText, CardTitle, TextField} from 'svelte-materialify';
	import app from "../app";
	import CustomSelect from "./Inputs/CustomSelect.svelte";
	import locales from "../app/data/locales";

	const settings: Writable<Settings> = app.settings;

</script>

<Card flat>
	<CardTitle>
		{$_('settings.title')}
	</CardTitle>
	<CardText>
		<!--
		<TextField bind:value={$settings.dateFormat}>
			{$_('settings.dateFormat')}
		</TextField>
		<br>
		-->
		<CustomSelect bind:value={$settings.locale} items={locales}>
			{$_('settings.locale')}
		</CustomSelect>
	</CardText>
</Card>
