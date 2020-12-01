<script lang="ts">
	import {_} from "svelte-i18n";

	import type {Formatter} from "../../app/types";
	import type Invoice from "../../app/classes/Invoice";

	import {Button, Col, Icon, MaterialApp, Row, Switch, TextField} from "svelte-materialify/src";
	import {mdiFileFind, mdiTextBoxPlus} from "@mdi/js";
	import CustomSelect from "../Inputs/CustomSelect.svelte";
	import locales from "../../app/data/locales";
	import currencies from "../../app/data/currencies";
	import InvoiceComponent from "./Document.svelte";

	const downloadPDF = () => undefined;
	const showPDF = () => undefined;
	export let invoice: Invoice;
	export let onReset: () => void;
	export let onNewFile: () => void;
	export let onPrint: () => void;

	let format: Formatter;
	let locale, currency;

	$:{
		if (invoice.locale !== locale || invoice.currency !== currency) {
			let formatter = new Intl.NumberFormat(invoice.locale, {
				style: "currency",
				currency: invoice.currency,
			});
			format = (number: number, sign: boolean = false) => {
				if (sign) return formatter.format(number);
				return number.toLocaleString(invoice.locale, {minimumFractionDigits: 2});
			};
		}
		locale = invoice.locale;
		currency = invoice.currency;
	}

</script>

<style>
	aside {
		position: absolute;
		right: 100%;
		top: 0;
		margin-right: 1rem;
	}
	.page {
		position: relative;
		width: 21cm;
		min-height: 29.7cm;
		box-sizing: border-box;
		padding: 1cm;
		margin: auto;
		box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.8);
	}
	@media print {
		:global(.no-print) {
			display: none;
		}
		:global(label.active){
			display: none !important;
		}
		:global(.s-icon){
			display: none !important;
		}
		.page {
			box-shadow: none;
			/*pointer-events: none;*/
		}
	}
</style>

<div class="no-print">
	<span class="secondary-text">#{invoice.hash}</span>
	<span class="secondary-text">#{invoice.fileId}</span>
	<Row>
		<Col>
			<CustomSelect required bind:value={invoice.currency}
						  items={currencies}> {$_('invoice.currencies')}</CustomSelect>
		</Col>
		<Col>
			<Switch bind:checked={invoice.withVAT}>
				{$_(`invoice.${invoice.withVAT ? 'withVAT' : 'withoutVAT'}`)}
			</Switch>
		</Col>
		<Col>
			<CustomSelect required bind:value={invoice.locale} items={locales}>
				{$_('invoice.locale')}
			</CustomSelect>
		</Col>
		<Col>
			<TextField bind:value={invoice.dateFormat}>
				{$_('invoice.dateFormat')}
			</TextField>
		</Col>
	</Row>
</div>
<div class="page white">
	<aside class="no-print">
		<nav>
			<!--
			<Button on:click={downloadPDF} size="large" fab icon class="primary-text"
					title={$_('buttons.download_pdf')}>
				<Icon size="3rem" path={mdiCloudDownloadOutline}/>
			</Button>
			<Button on:click={showPDF} size="large" fab icon class="primary-text" title={$_('buttons.show_pdf')}>
				<Icon size="3rem" path={mdiFileFind}/>
			</Button>
			-->

			{#if onPrint}
				<Button on:click={onPrint} size="large" fab icon class="primary-text"
						title={$_('buttons.new_file')}>
					<Icon size="3rem" path={mdiFileFind}/>
				</Button>
			{/if}

			{#if onNewFile}
				<Button on:click={onNewFile} size="large" fab icon class="primary-text"
						title={$_('buttons.new_file')}>
					<Icon size="3rem" path={mdiTextBoxPlus}/>
				</Button>
			{/if}

		</nav>
	</aside>
	<div>
		<MaterialApp theme="light">
			<InvoiceComponent bind:invoice bind:format/>
		</MaterialApp>
	</div>
</div>
