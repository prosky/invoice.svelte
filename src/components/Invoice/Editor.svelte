<script lang="ts">
    import { _ } from "svelte-i18n";

    import { Button, Col, Icon, MaterialApp, Row, Switch, TextField } from "svelte-materialify/src";
    import { mdiCloudDownloadOutline, mdiFileFind, mdiTrashCan } from "@mdi/js";
    import CustomSelect from "../Inputs/CustomSelect.svelte";
    import locales from "../../app/data/locales";
    import currencies from "../../app/data/currencies";
    import InvoiceComponent from "./Document.svelte";
    import type { Formatter } from "../../app/types";
    import type Invoice from "../../app/classes/Invoice";

    const downloadPDF = () => undefined;
    const showPDF = () => undefined;

    let document: HTMLDivElement;

    export let invoice: Invoice;
    export let onReset: ()=>void;

    let format: Formatter;
    let money: (num: number) => string;
    let formatter: Intl.NumberFormat;
    let currency: string = null,
        locale: string = null;

    $: if (currency !== invoice.currency || locale !== invoice.locale) {
        currency = invoice.currency;
        locale = invoice.locale;
        console.log(currency, locale);
        formatter = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        });
        format = (number: number, sign: boolean = false) => {
            if (sign) return formatter.format(number);
            return number.toLocaleString(locale, { minimumFractionDigits: 2 });
        };
    }
</script>

<style>
    .document {
        position: relative;
    }
    aside {
        position: absolute;
        right: 100%;
        top: 0;
        margin-right: 1rem;
    }
    .page {
        width: 21cm;
        min-height: 29.7cm;
        box-sizing: border-box;
        padding: 1cm;
        margin: auto;
        box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.8);
    }
</style>

<div>
    <Row>
        <Col>
            <CustomSelect required bind:value={invoice.currency} items={currencies}> {$_('invoice.currencies')}</CustomSelect>
        </Col>
        <Col>
            <Switch bind:checked={invoice.withVAT}>
                {$_(`invoice.${invoice.withVAT ? 'withVAT' : 'withoutVAT'}`)}
            </Switch>
        </Col>
        <Col>
            <CustomSelect required bind:value={invoice.locale} items={locales}>
                {$_('invoice.locale')}
            </CustomSelect>
        </Col>
        <Col>
            <TextField bind:value={invoice.dateFormat}>
                {$_('invoice.dateFormat')}
            </TextField>
        </Col>
    </Row>
    <div class="document page white">
        <aside>
            <nav>
                <Button on:click={downloadPDF} size="large" fab icon class="primary-text" title={$_('buttons.download_pdf')}>
                    <Icon size="3rem" path={mdiCloudDownloadOutline} />
                </Button>
                <Button on:click={showPDF} size="large" fab icon class="primary-text" title={$_('buttons.show_pdf')}>
                    <Icon size="3rem" path={mdiFileFind} />
                </Button>
                <Button on:click={onReset} size="large" fab icon class="red-text" title={$_('buttons.reset')}>
                    <Icon size="3rem" path={mdiTrashCan} />
                </Button>
            </nav>
        </aside>
        <div bind:this={document}>
            <MaterialApp theme="light">
                <InvoiceComponent bind:invoice bind:format />
            </MaterialApp>
        </div>
    </div>
</div>
