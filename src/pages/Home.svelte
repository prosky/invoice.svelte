<script lang="ts">
    import {debounce} from 'lodash';
    import * as rules from '../app/utils/rules';
    import {_} from 'svelte-i18n';
    import Invoice from "../components/Invoice/Invoice.svelte";
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import Drawer from "../components/Drawer/Drawer.svelte";
    import {Button, Col, Icon, Row, Switch, TextField} from 'svelte-materialify/src';
    import {mdiTrashCan} from '@mdi/js';
    import {app} from '../app';
    import helpers from '../app/utils/helpers';
    import CustomSelect from "../components/Inputs/CustomSelect.svelte";
    import locales from "../app/data/locales";
    import currencies from "../app/data/currencies";

    const save = debounce(() => app.save(), 1000);
    const reset = () => invoice = app.clear();

    let invoice: Invoice;
    $: invoice = app.data;
    $: helpers.formatter = new Intl.NumberFormat(invoice.locale, {style: 'currency', currency: invoice.currency});
    $: save(invoice);

</script>

<div class="content">
    <Drawer/>
    <Wrapper>
        <div class="pt-8 pb-8">
            <h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
            <Row>
                <Col>
                    <CustomSelect bind:value={invoice.currency}
                                  items={currencies}>{$_('invoice.currency')}</CustomSelect>
                </Col>
                <Col>
                    <Switch bind:checked={invoice.withVAT}>{$_(`invoice.with${invoice.withVAT ? '' : 'out'}VAT`)}</Switch>
                </Col>
                <Col>
                    <CustomSelect bind:value={invoice.locale} items={locales}>{$_('invoice.locale')}</CustomSelect>
                </Col>
                <Col>
                    <TextField rules={[rules.dateFormat]}
                               bind:value={invoice.dateFormat}>{$_('invoice.dateFormat')}</TextField>
                </Col>
            </Row>
            <Document>
                <Invoice bind:invoice/>
                <div slot="nav">
                    <Button on:click={reset} size="large" fab icon class="red-text" title={$_('buttons.reset')}>
                        <Icon size="3rem" path={mdiTrashCan}/>
                    </Button>
                </div>
            </Document>
        </div>
    </Wrapper>
</div>

