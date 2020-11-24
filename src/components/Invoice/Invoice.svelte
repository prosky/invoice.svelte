<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Col, Row, Textarea, TextField} from "svelte-materialify/src";
    import Company from "./Company.svelte";
    import Summary from "./Summary.svelte";
    import type Invoice from "../../app/classes/Invoice";
    import Products from "./Products.svelte";
    import DatePicker from "../Inputs/DatePicker/DatePicker.svelte";
    import ImagePicker from "../Inputs/ImagePicker.svelte";

    export let invoice: Invoice;

    const downloadPDF = () => {
        console.log('downloadPDF');
    }
</script>


<div class="invoice">
    <Row class="mb-4">
        <Col>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.title')} bind:value={invoice.labels.title}/>
                </Col>
                <Col>
                    <TextField placeholder={$_('invoice.title')} bind:value={invoice.title}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.date')} bind:value={invoice.labels.date}/>
                </Col>
                <Col>
                    <DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.date')}
                                bind:selected={invoice.date}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField placeholder={$_('invoice.dueDate')} bind:value={invoice.labels.dueDate}/>
                </Col>
                <Col>
                    <DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.dueDate')}
                                bind:selected={invoice.dueDate}/>
                </Col>
            </Row>
        </Col>
        <Col>
            <ImagePicker bind:value={invoice.logo}/>
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
    <div class="mb-6">
        <Summary bind:invoice/>
    </div>
    <div class="mb-6">
        <TextField placeholder={$_('invoice.terms')} bind:value={invoice.labels.notes}/>
        <Textarea placeholder={$_('invoice.terms')} bind:value={invoice.notes} rows={3}/>
    </div>
    <div>
        <TextField placeholder={$_('invoice.terms')} bind:value={invoice.labels.terms}/>
        <Textarea placeholder={$_('invoice.term')} bind:value={invoice.term} rows={3}/>
    </div>
</div>

<style type="scss">
  .invoice {
    position: relative;
  }

</style>