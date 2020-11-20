<script lang="ts">

    import {_} from 'svelte-i18n';
    import {Button, Icon, Textarea, TextField} from "svelte-materialify/src";
    import type Invoice from "../../app/classes/Invoice";
    import {mdiClose, mdiPlusCircleOutline} from '@mdi/js';
    import app from '../../app';
    import Product from "../../app/classes/Product";
    import {calculatePrice, calculateTax} from "../../app/utils/calc";

    export let invoice: Invoice;
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
    {#each products as product,i}
        <tr>
            <td>
                <Textarea rows={1} autogrow bind:value={product.description}
                          placeholder={$_('invoice.product.description')}
                />
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
    <tfoot>
    <tr>
        <td colspan="100%">
            <Button class="primary-color" on:click={handleAdd}>
                <Icon path={mdiPlusCircleOutline} class="mr-2"/>
                {$_('buttons.add_product')}
            </Button>
        </td>
    </tr>
    </tfoot>
</table>