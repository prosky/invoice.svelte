<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Button, Icon} from "svelte-materialify/src";
    import {mdiFilePdfOutline,mdiFileFind,mdiCloudDownloadOutline  } from '@mdi/js';

    let document: HTMLDivElement;

    const downloadPDF = () => {
        console.log('downloadPDF');
    }
    const showPDF = () => {
        console.log('showPDF');
    }
</script>

<div class="document page white"  bind:this={document}>
    <aside>
        <nav>
            <Button on:click={downloadPDF} size="large" fab  icon class="primary-text" title={$_('buttons.download_pdf')}>
                <Icon size="3rem" path={mdiCloudDownloadOutline}/>
            </Button>
            <Button on:click={showPDF} size="large" fab  icon class="primary-text" title={$_('buttons.show_pdf')}>
                <Icon size="3rem" path={mdiFileFind}/>
            </Button>
        </nav>
    </aside>
    <slot/>
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
    --theme-text-primary: black;
    --theme-text-secondary: black;
    --theme-text-disabled: #5d5d5d;
    width: 21cm;
    min-height: 29.7cm;
    box-sizing: border-box;
    padding: 1cm;
    margin: auto;
    box-shadow: .5rem .5rem 1rem rgba(0, 0, 0, 0.8);
  }

</style>