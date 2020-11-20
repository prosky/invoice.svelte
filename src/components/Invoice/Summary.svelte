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
                <TextField bind:value={invoice.labels.subTotal}>{$_(`invoice.subTotal`)}</TextField>
            </th>
            <td>{money(subTotal)}</td>
        </tr>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.tax}>{$_(`invoice.tax`)}</TextField>
            </th>
            <td>{money(tax)}</td>
        </tr>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.total}>{$_(`invoice.total`)}</TextField>
            </th>
            <td>{helpers.formatter.format(total)}</td>
        </tr>
        </tbody>
    </table>
</div>
<style type="scss">
  .summary {
    display: flex;
    justify-content: flex-end;

    table {
      min-width: 50%;
    }

  }

</style>