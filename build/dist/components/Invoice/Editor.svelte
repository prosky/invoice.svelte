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
	import {dateFormat as dateFormatRule} from 'app/utils/rules';
	import format from 'app/utils/currencyFormatter';

	const downloadPDF = () => undefined;
	const showPDF = () => undefined;

	export let invoice: Invoice;
	export let onNewFile: () => void;
	export let onPrint: () => void;


</script>

<style>
	.editor, .container {
		position: relative;
	}

	aside {
		position: absolute;
		right: 100%;
		top: 0;
		margin-right: 1rem;
	}

	@media print {
		:global(.no-print) {
			display: none;
		}
		:global(.no-print) {
			display: none;
		}

		:global(label.active) {
			display: none !important;
		}
		:global(::placeholder) {
			color: transparent !important;
		}
		:global(textarea) {
			resize: none !important;
		}
		:global(.s-select .s-icon) {
			display: none !important;
		}
		.page {
			box-shadow: none;
			/*pointer-events: none;*/
		}
	}
</style>

<div class="editor">
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
				<TextField bind:value={invoice.dateFormat} rules={[dateFormatRule]}>
					{$_('invoice.dateFormat')}
				</TextField>
			</Col>
		</Row>
	</div>
	<div class="container">
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
		<MaterialApp theme="light">
			<InvoiceComponent bind:invoice />
		</MaterialApp>
	</div>
</div>
