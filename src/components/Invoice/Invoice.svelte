<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Col, Row, TextField} from "svelte-materialify/src";
    import Company from "./Company.svelte";
    import Summary from "./Summary.svelte";
    import type Invoice from "../../app/classes/Invoice";
    import Products from "./Products.svelte";
    import DatePicker from "../Inputs/DatePicker/DatePicker.svelte";

    export let invoice: Invoice;

    console.log(invoice.date);
    console.log(invoice.dueDate);
    const downloadPDF = () => {
        console.log('downloadPDF');
    }
</script>


<div class="invoice">
    <Row class="mb-4">
        <Col>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.title')} type="text" bind:value={invoice.labels.title}/>
                </Col>
                <Col>
                    <TextField  placeholder={$_('invoice.title')} type="text" bind:value={invoice.title}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.date')} type="text" bind:value={invoice.labels.date}/>
                </Col>
                <Col>
                    <DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.date')} type="text" bind:selected={invoice.date}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.dueDate')} type="text" bind:value={invoice.labels.dueDate}/>
                </Col>
                <Col>
                    <DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.dueDate')} type="text" bind:selected={invoice.dueDate}/>
                </Col>
            </Row>
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