<script lang="ts">
    import {_} from 'svelte-i18n';
    import {TextField} from "svelte-materialify";
    import type Company from "../../app/classes/Company";

    export let company: Company;
</script>


<div class="company">
    {#each Object.keys(company) as key}
        <TextField  bind:value={company[key]}>{$_(`company.${key}`)}</TextField>
    {/each}
</div>