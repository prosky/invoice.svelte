<script lang="ts">
    import {debounce} from 'lodash';
    import {_} from 'svelte-i18n';
    import Invoice from "../components/Invoice/Invoice.svelte";
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import {app} from '../app';
    import Drawer from "../components/Drawer/Drawer.svelte";
    import {Col, Container, Row, Select, Switch} from 'svelte-materialify/src';
    import locales from "../app/data/localesList";
    const format = (val) => locales[val];
    const items = Object.entries(locales).map(([value, name]) => ({value, name}));
    let invoice = app.data;

    const save = debounce((invoice: Invoice) => {
        app.save();
    }, 1000);

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
                        <Col><Select {format} bind:value={invoice.locale} {items}>{$_('invoice.locale')}</Select></Col>
                    </Row>
                </Container>
            </nav>
            <Document>
                <Invoice bind:invoice/>
            </Document>
        </div>
    </Wrapper>
</div>

<style type="scss">

</style>