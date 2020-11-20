<script context="module">
    import countries from "../../app/data/countries";
    import {values} from "../../app/utils/helpers";
    const format = (val) => countries[val];
    const items = values(countries);
    const rules = [
        (value) => value ? false : 'Error Message',
    ];
</script>

<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Select, TextField} from "svelte-materialify/src";
    import type Company from "../../app/classes/Company";
    export let company: Company;
</script>


<div class="company">
    <TextField bind:value={company.name}>{$_(`company.name`)}</TextField>
    <TextField bind:value={company.address}>{$_(`company.address`)}</TextField>
    <TextField bind:value={company.address2}>{$_(`company.address2`)}</TextField>
    <TextField bind:value={company.cin}>{$_(`company.cin`)}</TextField>
    <TextField bind:value={company.tin}>{$_(`company.tin`)}</TextField>
    <Select {rules} bind:value={company.country} filled {format} {items}>{$_(`company.country`)}</Select>
</div>