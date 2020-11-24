<script lang="ts">
    import {_} from 'svelte-i18n';
    import Wrapper from "../components/Wrapper/Wrapper.svelte";
    import Document from "../components/Document/Document.svelte";
    import Drawer from "../components/Drawer/Drawer.svelte";
</script>

<div class="content">
    <Drawer active/>
    <Wrapper>
        <div class="pt-8 pb-8">
            <h1 class="primary-text text-h1 text-center mb-10">{$_('page.home.title')}</h1>
            <Document/>
        </div>
    </Wrapper>
</div>

