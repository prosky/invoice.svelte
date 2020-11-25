<script lang="ts">
    import {_} from 'svelte-i18n';
    import {debounce} from 'lodash';
    import {Button, Col, Icon, MaterialApp, Row, Switch, TextField} from 'svelte-materialify';
    import {mdiCloudDownloadOutline, mdiFileFind, mdiTrashCan} from '@mdi/js';
    import CustomSelect from "../Inputs/CustomSelect.svelte";
    import locales from "../../app/data/locales";
    import currencies from "../../app/data/currencies";
    import pdfMake from "pdfmake/build/pdfmake";
    import pdfFonts from "./vfs_fonts";
    import htmlToPdfmake from "html-to-pdfmake";
    import Invoice from "../Invoice/Invoice.svelte";
    import app from '../../app/Context';
    import counter from "../../app/saveStore";
    import Debugger from "../Debugger.svelte";
    import {Formatter} from "../../app/types";

    pdfMake.vfs = pdfFonts;
    let document: HTMLDivElement;
    const downloadPDF = () => {
        console.log(document.innerHTML);
        pdfMake.createPdf({content: htmlToPdfmake(document.innerHTML)}).download();
    }
    const showPDF = () => {
        console.log('showPDF');
    }
    const save = debounce(() => app.save(), 1000);

    let invoice: Invoice = app.data;
    let format: Formatter;
    let money: (num: number) => string;
    let formatter: Intl.NumberFormat;
    let currency: string = null, locale: string = null;

    $: invoice && (save() || counter.increment());
    $: if (currency !== invoice.currency || locale !== invoice.locale) {
        currency = invoice.currency;
        locale = invoice.locale;
        console.log(currency,locale);
        formatter = new Intl.NumberFormat(locale, {style: 'currency', currency: currency});
        format = (number: number, sign: boolean = false) => {
            if (sign) return formatter.format(number);
            return number.toLocaleString(locale, {minimumFractionDigits: 2});
        }
    }
    const reset = () => {
        invoice.update(() => app.clear());
    }
</script>

<div>
    <Debugger>
        {$counter}
    </Debugger>
    <Row>
        <Col>
            <CustomSelect required bind:value={invoice.currency}
                          items={currencies}>{$_('invoice.currencies')}</CustomSelect>
        </Col>
        <Col>
            <Switch bind:checked={invoice.withVAT}>{$_(`invoice.${invoice.withVAT ? 'withVAT' : 'withoutVAT'}`)}</Switch>
        </Col>
        <Col>
            <CustomSelect required bind:value={invoice.locale} items={locales}>{$_('invoice.locale')}</CustomSelect>
        </Col>
        <Col>
            <TextField bind:value={invoice.dateFormat}>{$_('invoice.dateFormat')}</TextField>
        </Col>
    </Row>
    <div class="document page white">
        <aside>
            <nav>
                <Button on:click={downloadPDF} size="large" fab icon class="primary-text"
                        title={$_('buttons.download_pdf')}>
                    <Icon size="3rem" path={mdiCloudDownloadOutline}/>
                </Button>
                <Button on:click={showPDF} size="large" fab icon class="primary-text" title={$_('buttons.show_pdf')}>
                    <Icon size="3rem" path={mdiFileFind}/>
                </Button>
                <Button on:click={reset} size="large" fab icon class="red-text" title={$_('buttons.reset')}>
                    <Icon size="3rem" path={mdiTrashCan}/>
                </Button>
            </nav>
        </aside>
        <div bind:this={document}>
            <MaterialApp theme='light'>
                <Invoice bind:invoice bind:format/>
            </MaterialApp>
        </div>
    </div>
</div>

<style type="scss">
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
        //--theme-text-primary: black;
        //--theme-text-secondary: black;
        //--theme-text-disabled: #5d5d5d;
        width: 21cm;
        min-height: 29.7cm;
        box-sizing: border-box;
        padding: 1cm;
        margin: auto;
        box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, 0.8);
    }

    .s-input input, .s-input textarea {
        color: black;
    }
</style>