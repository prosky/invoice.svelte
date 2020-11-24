<script lang="ts">
    import Home from "./pages/Home.svelte";
    //import Settings from "./pages/Settings.svelte";
    import {MaterialApp} from 'svelte-materialify';
    import Flashes from "./components/Flashes/Flashes.svelte";
    /*
    export let basePath: string;
    export let url = "";
    export const pages = [
        ['', 'home', Home],
        ['settings', 'settings', Settings],
    ];*/
    let theme = 'dark';
</script>

<MaterialApp theme={theme}>
    <Flashes/>
    <main>
        <Home/>
    </main>
</MaterialApp>

<style type="scss">

</style>

