<script lang="ts">
	import type {Formatter} from "../../app/types";
	import type Invoice from "../../app/classes/Invoice";

	import {_} from 'svelte-i18n';
	import {TextField} from "svelte-materialify/src";
	import {sumPrice, sumTax} from "../../app/utils/calc";
	import format from "../../app/utils/currencyFormatter";

	export let invoice: Invoice;
	if (!invoice) {
		throw new Error('Invoice is not specified');
	}
	$: subTotal = sumPrice(invoice);
	$: tax = invoice.withVAT ? sumTax(invoice) : 0;
	$: total = subTotal + tax;

</script>


<div class="summary">
	<table class="black-text">
		<tbody>
		<tr>
			<th>
				<TextField bind:value={invoice.labels.subTotal} placeholder={$_(`invoice.subTotal`)}/>
			</th>
			<td>{$format(subTotal)}</td>
		</tr>
		{#if invoice.withVAT}
			<tr>
				<th>
					<TextField bind:value={invoice.labels.tax} placeholder={$_(`invoice.tax`)}/>
				</th>
				<td>{$format(tax)}</td>
			</tr>
		{/if}
		</tbody>
		<tbody>
		<tr>
			<th>
				<TextField bind:value={invoice.labels.total} placeholder={$_(`invoice.total`)}/>
			</th>
			<td>{$format(total, true)}</td>
		</tr>
		</tbody>
	</table>
</div>
<style>
	table {
		min-width: 50%;
		border-collapse: collapse;
	}
	table, td, th {
		border: none;
	}
	.summary {
		display: flex;
		justify-content: flex-end;
	}
</style>
