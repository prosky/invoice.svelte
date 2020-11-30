<script lang="ts">
	import type Invoice from "../../app/classes/Invoice";
	import type Product from "../../app/classes/Product";
	import type {Writable} from "svelte/store";
	import {writable} from "svelte/store";

	import app from '../../app';
	import {_} from 'svelte-i18n';
	import {onDestroy, onMount} from 'svelte';
	import Sortable from 'sortablejs';
	import {mdiClose, mdiPlusCircleOutline} from '@mdi/js';
	import {calculatePrice, calculateTax} from "../../app/utils/calc";
	import {Button, Icon, Textarea, TextField} from "svelte-materialify/src";
	import {array_move} from "../../app/utils/helpers";

	export let invoice: Writable<Invoice>;
	let data;
	let sum;
	let money;
	let list: HTMLElement;

	invoice.subscribe((invoice: Invoice) => {
		data = invoice.products;
		sum = (product: Product): number => calculateTax(invoice, product) + calculatePrice(product);
		money = (num: number): string => num.toLocaleString(invoice.locale, {minimumFractionDigits: 2});
	});


	let products = writable<Product[]>(data);
	products.subscribe((products: Product[]) => {
		invoice.update((invoice) => {
			invoice.products = products;
			return invoice;
		})
	});

	const handleAdd = (): void => {
		products.update((products: Product[]) => {
			products.push(app.factory.product());
			return products;
		});
	};
	const handleDelete = (index: number): void => {
		products.update((products: Product[]) => {
			products.splice(index, 1);
			return products;
		});
	};

	const move = (from, to) => {
		products.update((products: Product[]) => {
			console.log(products);
			array_move(products, from, to)
			console.log(products);
			return products;
		});
	}
	onMount(async function () {
		Sortable.create(list, {
			animation: 100,
			filter: 'input, select, textarea',
			onUpdate: (evt) => move(evt.oldIndex, evt.newIndex)
		});
	});
	onDestroy(()=>{
		console.log('onDestroy');
	});
</script>


<table class="products black-text">
	<thead>
	<tr>
		<th>
			<TextField bind:value={$invoice.labels.description} placeholder={$_('invoice.product.description')}/>
		</th>
		<th>
			<TextField bind:value={$invoice.labels.quantity} placeholder={$_('invoice.product.quantity')}/>
		</th>
		<th>
			<TextField bind:value={$invoice.labels.price} placeholder={$_('invoice.product.price')}/>
		</th>
		{#if $invoice.withVAT}
			<th>
				<TextField bind:value={$invoice.labels.taxRate} placeholder={$_('invoice.product.taxRate')}/>
			</th>
		{/if}
		<th>
			<TextField bind:value={$invoice.labels.sum} placeholder={$_('invoice.product.sum')}/>
		</th>
		<th></th>
	</tr>
	</thead>
	<tbody bind:this={list}>
	{#each $products as product,i (product.hash)}
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
			{#if $invoice.withVAT}
				<td>
					<TextField type="number" bind:value={product.taxRate}/>
				</td>
			{/if}
			<td>
				{money(sum(product))}
			</td>
			<td>
				<Button on:click={()=>handleDelete(i)} class="red-text" size="small" icon title={$_('buttons.delete')}>
					<Icon size=".8rem" path={mdiClose}/>
				</Button>
			</td>
		</tr>
	{/each}
	</tbody>
</table>
<Button class="primary-color" on:click={handleAdd}>
	<Icon path={mdiPlusCircleOutline} class="mr-2"/>
	{$_('buttons.add_product')}
</Button>

