<script lang="ts">
    import Home from "./pages/Home.svelte";
    import Settings from "./pages/Settings.svelte";
    import {MaterialApp} from 'svelte-materialify';

    export let basePath: string;
    export let url = "";
    export const pages = [
        ['', 'home', Home],
        ['settings', 'settings', Settings],
    ];
    let theme = 'dark';
</script>

<MaterialApp theme={theme}>
    <main>
        <Home/>
    </main>
</MaterialApp>

<style type="scss">

</style>

