<script lang="ts">
	import type Invoice from "../../app/classes/Invoice";
	import type Product from "../../app/classes/Product";
	import type {Writable} from "svelte/store";
	import {writable} from "svelte/store";

	import app from '../../app';
	import {_} from 'svelte-i18n';
	import {mdiClose} from '@mdi/js';
	import {calculatePrice, calculateTax} from "../../app/utils/calc";
	import {Button, Icon, Textarea, TextField} from "svelte-materialify/src";
	import {array_move} from "../../app/utils/helpers";

	export let invoice: Writable<Invoice>;
	export let product: Product;
	export let productStorage: Writable<Product>;


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

</script>
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
