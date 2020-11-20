<script lang="ts" context="module">
    import locales from "../app/data/localesList";
    import {values} from "../app/utils/helpers"

    const format = (val) => {
        console.log(val);
        return locales[val];
    };
    const items = values(locales);
</script>

<script lang="ts">
    import {debounce} from 'lodash';
    import {_} from 'svelte-i18n';
    import Invoice from "../components/Invoice/Invoice.svelte";
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import Drawer from "../components/Drawer/Drawer.svelte";
    import {Col, Container, Row, Select, Switch} from 'svelte-materialify/src';
    import {app} from '../app';
    import helpers from '../app/utils/helpers';

    $:  invoice = app.data;

    const save = debounce((invoice: Invoice) => {
        app.save();
    }, 1000);
    const reset = () => {
        app.clear();
        invoice = app.data;
    }
    const rules = [
        (value) => {
            console.log(value);
            return value ? false : 'Error Message';
        },
    ];

    $: helpers.formatter = new Intl.NumberFormat(invoice.locale, {
        style: 'currency',
        currency: invoice.currency
    });
    $: {
        save(invoice);
    }
</script>

<div class="content">
    <Drawer/>
    <Wrapper>
        <div class="pt-8 pb-8">
            <h1 class="text-primary text-h1 text-center mb-10">{$_('page.home.title')}</h1>
            <nav>
                <Container>
                    <Row>
                        <Col>
                            <Switch bind:checked={invoice.withVAT}>{$_(`invoice.${invoice.withVAT ? 'withVAT' : 'withoutVAT'}`)}</Switch>
                        </Col>
                        <Col><Select {rules} {format} bind:value={invoice.locale}
                                     {items}>{$_('invoice.locale')}</Select></Col>
                    </Row>
                </Container>
            </nav>
            <Document {reset}>
                <Invoice bind:invoice/>
            </Document>
        </div>
    </Wrapper>
</div>

<style type="scss">

</style>