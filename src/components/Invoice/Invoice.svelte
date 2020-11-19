<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Row, Col, Input, Label} from "sveltestrap";
    import Company from "./Company.svelte";
    export let invoice;
</script>


<div class="invoice">
    <Row>
        <Col>
            <Label>
                {$_('invoice.title')}
                <Input type="text" bind:value={invoice.title} />
            </Label>
        </Col>
        <Col>

        </Col>
    </Row>
    <Row>
        <Col>
            <Company bind:company={invoice.company} />
        </Col>
        <Col>
            <Company bind:company={invoice.client} />
        </Col>
    </Row>
</div>