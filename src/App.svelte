<script lang="ts">
    import { _} from 'svelte-i18n';
    import { Router, Route, Link } from "svelte-routing";
    import Home from "./pages/Home.svelte";
    import Settings from "./pages/Settings.svelte";
    export let url = "";
    export const pages = [
            ['/','home',Home],
            ['settings','settings',Settings],
    ];
</script>

<main>
    <Router url="{url}">
        <nav>
            {#each pages as [to,key]}
                <Link {to}>{$_(`page.${key}.title`)}</Link>
            {/each}
        </nav>
        <div>
            {#each pages as [path,key,component]}
                <Route {path} {component} />
            {/each}
        </div>
    </Router>
</main>

<style type="scss">

</style>

