<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Link, Route, Router} from "svelte-routing";
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
        <!--
        <Router url="{url}" basepath={basePath}>
            <nav>
                {#each pages as [to, key]}
                    <Link {to}>{$_(`page.${key}.title`)}</Link>
                {/each}
            </nav>
            {#each pages as [path, , component]}
                <Route {path} {component}/>
            {/each}
        </Router>
        -->
    </main>
</MaterialApp>

<style type="scss">

</style>

