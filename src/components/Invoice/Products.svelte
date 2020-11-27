<script lang="ts">
    import Sortable from 'sortablejs';
	
    import {_} from 'svelte-i18n';
    import {Button, Icon, Textarea, TextField} from "svelte-materialify/src";
    import type Invoice from "../../app/classes/Invoice";
    import {mdiClose, mdiPlusCircleOutline} from '@mdi/js';
    import app from '../../app';
    import type Product from "../../app/classes/Product";
    import {calculatePrice, calculateTax} from "../../app/utils/calc";
	import { onMount } from 'svelte';

	export let invoice: Invoice;
	let list: HTMLElement;
    $: products = invoice.products;

    const handleAdd = (): void => {
        products.push(app.factory.product());
        invoice.products = products;
    };
    const handleDelete = (index: number): void => {
        products.splice(index, 1);
        invoice.products = products;
    };
    const sum = (product: Product): number => calculateTax(invoice, product) + calculatePrice(product);
    const money = (num: number): string => num.toLocaleString(invoice.locale, {minimumFractionDigits: 2});

	const move=(from, to)=>{
		const element = products[from];
		products.splice(from, 1);
		products.splice(to, 0, element);
		console.log(products);
	}
	onMount(async function() {
		Sortable.create(list, {
			animation: 100,
			onChange: (evt)=>move(evt.oldIndex,evt.newIndex)
		});
	})

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
    <tbody bind:this={list}>
		{#each products as product,i (i)}
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

