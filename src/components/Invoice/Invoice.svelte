<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Col, Row, TextField} from "svelte-materialify/src";
    import Company from "./Company.svelte";
    import Summary from "./Summary.svelte";
    import type Invoice from "../../app/classes/Invoice";
    import Products from "./Products.svelte";

    export let invoice: Invoice;

    const downloadPDF = () => {
        console.log('downloadPDF');
    }
</script>


<div class="invoice">
    <Row class="mb-4">
        <Col>
            <TextField labelText={$_('invoice.title')} type="text" bind:value={invoice.title}/>
        </Col>
        <Col>
        </Col>
    </Row>
    <Row class="mb-4">
        <Col>
            <Company bind:company={invoice.company}/>
        </Col>
        <Col>
            <Company bind:company={invoice.client}/>
        </Col>
    </Row>
    <div class="mb-4">
        <Products bind:invoice/>
    </div>
    <div>
        <Summary bind:invoice/>
    </div>
</div>

<style type="scss">
  .invoice {
    position: relative;
  }

</style>