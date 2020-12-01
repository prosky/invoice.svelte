<script lang="ts">
	import type Invoice from "../../app/classes/Invoice";
	import type Product from "../../app/classes/Product";
	import app from '../../app';
	import {_} from 'svelte-i18n';
	import {mdiClose, mdiPlusCircleOutline} from '@mdi/js';
	import {calculatePrice, calculateTax} from "../../app/utils/calc";
	import {Button, Icon, Textarea, TextField} from "svelte-materialify/src";
	import * as arrays from "../../app/utils/arrays";

	export let invoice: Invoice;

	$: sum = (product: Product): number => (invoice.withVAT ? calculateTax(invoice, product) : 0) + calculatePrice(product);
	$: money = (num: number): string => num.toLocaleString(invoice.locale, {minimumFractionDigits: 2});

	const add = () => invoice.products = arrays.add(invoice.products, app.factory.product());
	const remove = (index: number) => invoice.products = arrays.remove(invoice.products, index);
	const move = (from, to) => invoice.products = arrays.move(invoice.products, from, to);

</script>


<table class="products black-text">
	<thead>
	<tr>
		<th>
			<TextField bind:value={invoice.labels.description} placeholder={$_('invoice.product.description')}/>
		</th>
		<th>
			<TextField bind:value={invoice.labels.quantity} placeholder={$_('invoice.product.quantity')}/>
		</th>
		<th>
			<TextField bind:value={invoice.labels.price} placeholder={$_('invoice.product.price')}/>
		</th>
		{#if invoice.withVAT}
			<th>
				<TextField bind:value={invoice.labels.taxRate} placeholder={$_('invoice.product.taxRate')}/>
			</th>
		{/if}
		<th>
			<TextField bind:value={invoice.labels.sum} placeholder={$_('invoice.product.sum')}/>
		</th>
		<th></th>
	</tr>
	</thead>
	<tbody>
	{#each invoice.products as product,i (product.hash)}
		<tr>
			<td>
                <Textarea rows={1} autogrow bind:value={product.description}
						  placeholder={$_('invoice.product.description')}/>
			</td>
			<td>
				<TextField type="number" bind:value={product.quantity}/>
			</td>
			<td>
				<TextField type="number" bind:value={product.price}/>
			</td>
			{#if invoice.withVAT}
				<td>
					<TextField type="number" bind:value={product.taxRate}/>
				</td>
			{/if}
			<td>
				{money(sum(product))}
			</td>
			<td>
				<Button on:click={()=>remove(i)} class="red-text" size="small" icon title={$_('buttons.delete')}>
					<Icon size=".8rem" path={mdiClose}/>
				</Button>
			</td>
		</tr>
	{/each}
	</tbody>
</table>
<Button class="primary-color" on:click={add}>
	<Icon path={mdiPlusCircleOutline} class="mr-2"/>
	{$_('buttons.add_product')}
</Button>

