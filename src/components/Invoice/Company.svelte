<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Select, TextField} from "svelte-materialify/src";
    import type Company from "../../app/classes/Company";
    import countries from "../../app/data/countries";
    const format = (val) => countries[val];
    const items = Object.entries(countries).map(([value, name]) => ({name, value}));
    export let company: Company;
</script>


<div class="company">
    <TextField bind:value={company.name}>{$_(`company.name`)}</TextField>
    <TextField bind:value={company.address}>{$_(`company.address`)}</TextField>
    <TextField bind:value={company.address2}>{$_(`company.address2`)}</TextField>
    <TextField bind:value={company.cin}>{$_(`company.cin`)}</TextField>
    <TextField bind:value={company.tin}>{$_(`company.tin`)}</TextField>
    <Select bind:value={company.country} filled {format} {items}>{$_(`company.country`)}</Select>
</div>