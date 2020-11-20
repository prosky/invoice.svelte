<script lang="ts">
    import {_} from 'svelte-i18n';
    import type Invoice from "../../app/classes/Invoice";
    import {TextField} from "svelte-materialify/src";
    import {sumPrice, sumTax} from "../../app/utils/calc";
    import helpers from '../../app/utils/helpers';

    export let invoice: Invoice;

    $: subTotal = sumPrice(invoice);
    $: tax = sumTax(invoice);
    $: total = subTotal + tax;

    const money = (num: number): string => num.toLocaleString(invoice.locale, {minimumFractionDigits: 2});
</script>


<div class="summary">
    <table class="black-text">
        <tbody>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.subTotal} placeholder={$_(`invoice.subTotal`)}/>
            </th>
            <td>{money(subTotal)}</td>
        </tr>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.tax} placeholde={$_(`invoice.tax`)}/>
            </th>
            <td>{money(tax)}</td>
        </tr>
        </tbody>
        <tbody class="red">
        <tr>
            <th>
                <TextField bind:value={invoice.labels.total} placeholder={$_(`invoice.total`)}/>
            </th>
            <td>{helpers.formatter.format(total)}</td>
        </tr>
        </tbody>
    </table>
</div>
<style type="scss">
    table{
        border-collapse: collapse;
    }
    table,td,th {
        border: none;
    }

    .summary {
        display: flex;
        justify-content: flex-end;

        table {
            min-width: 50%;
        }

    }

</style>