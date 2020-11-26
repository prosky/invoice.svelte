<script lang="ts">
    import Home from "./pages/Home.svelte";
    //import Settings from "./pages/Settings.svelte";
    import counter from "./app/saveStore";
    import {Button, MaterialApp} from 'svelte-materialify/src';
    import Flashes from "./components/Flashes/Flashes.svelte";
    import Debugger from "./components/Debugger/Debugger.svelte";
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
    <Debugger>
        <Button title="Saves count" size="small" disabled icon class="primary-color">{$counter}</Button>
    </Debugger>
    <Flashes/>
    <main>
        <Home/>
    </main>
</MaterialApp>

<style type="scss">

</style>

