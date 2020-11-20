<script lang="ts">
    import {debounce} from 'lodash';
    import {_} from 'svelte-i18n';
    import Invoice from "../components/Invoice/Invoice.svelte";
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import Drawer from "../components/Drawer/Drawer.svelte";
    import {Col, Container, Row, Select, Switch, TextField, Button, Icon} from 'svelte-materialify/src';
    import {mdiTrashCan} from '@mdi/js';
    import {app} from '../app';
    import helpers from '../app/utils/helpers';
    import CustomSelect from "../components/Inputs/CustomSelect.svelte";
    import locales from "../app/data/localesList";

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
            <h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
            <Row>
                <Col>
                    <Switch bind:checked={invoice.withVAT}>{$_(`invoice.${invoice.withVAT ? 'withVAT' : 'withoutVAT'}`)}</Switch>
                </Col>
                <Col>
                    <CustomSelect {rules} bind:value={invoice.locale} items={locales}>{$_('invoice.locale')}</CustomSelect>
                </Col>
                <Col>
                    <TextField bind:value={invoice.dateFormat}>{$_('invoice.dateFormat')}</TextField>
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

