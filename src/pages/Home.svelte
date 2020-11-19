<script lang="ts">
    import {_} from 'svelte-i18n';
    import Invoice from "../components/Invoice/Invoice.svelte";
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import {Button} from "sveltestrap";
    import {app} from '../app';
    let invoice  = app.data;
    let document ;
    const downloadPDF = ()=>{
        console.log('downloadPDF');
    }

</script>

<div class="content">
    <aside>
        <nav>
            <Button on:click={downloadPDF} title={$_('buttons.download_pdf')} >
                {$_('buttons.download_pdf')}
            </Button>
        </nav>
    </aside>
    <Wrapper>
        <h1 class="text-primary text-center">{$_('page.home.title')}</h1>
        <code class="text-white" type="json">
            {invoice.title}
            {invoice.client.name}
        </code>
        <Document bind:this={document}>
            <Invoice bind:invoice />
        </Document>
    </Wrapper>
</div>

<style type="scss">
    .content{
        margin-bottom: 10rem;
    }
    aside{
        position: absolute;
    }
</style>