<script lang="ts">
    import {_} from 'svelte-i18n';
    import type Invoice from "../../app/classes/Invoice";
    import {TextField} from "svelte-materialify/src";
    import {sumPrice, sumTax} from "../../app/utils/calc";

    export let invoice: Invoice;

    $: subTotal = sumPrice(invoice);
    $: tax = sumTax(invoice);
    $: total = subTotal + tax;

</script>


<div class="summary">
    <table class="black-text">
        <tbody>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.subTotal}>{$_(`invoice.subTotal`)}</TextField>
            </th>
            <td>{subTotal}</td>
        </tr>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.tax}>{$_(`invoice.tax`)}</TextField>
            </th>
            <td>{tax}</td>
        </tr>
        <tr>
            <th>
                <TextField bind:value={invoice.labels.total}>{$_(`invoice.total`)}</TextField>
            </th>
            <td>{total}</td>
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