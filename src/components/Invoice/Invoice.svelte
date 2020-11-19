<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Col, Row, TextField} from "svelte-materialify/src";
    import Company from "./Company.svelte";
    import type Invoice from "../../app/classes/Invoice";

    export let invoice: Invoice;
</script>


<div class="invoice">
    <Row>
        <Col>
            <TextField labelText={$_('invoice.title')} type="text" bind:value={invoice.title}/>
        </Col>
        <Col>
        </Col>
    </Row>
    <Row>
        <Col>
            <Company bind:company={invoice.company}/>
        </Col>
        <Col>
            <Company bind:company={invoice.client}/>
        </Col>
    </Row>
</div>