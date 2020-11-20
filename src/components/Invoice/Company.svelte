

<script lang="ts">
    import {_} from 'svelte-i18n';
    import {TextField} from "svelte-materialify/src";
    import type Company from "../../app/classes/Company";
    import CustomSelect from "../Inputs/CustomSelect.svelte";
    import countries from "../../app/data/countries";
    export let company: Company;
</script>


<div class="company">
    <TextField autocomplete="organization" bind:value={company.name}>{$_(`company.name`)}</TextField>
    <TextField autocomplete="address-line1" bind:value={company.address}>{$_(`company.address`)}</TextField>
    <TextField autocomplete="address-line2" bind:value={company.address2}>{$_(`company.address2`)}</TextField>
    <TextField autocomplete="company-identification-number" bind:value={company.cin}>{$_(`company.cin`)}</TextField>
    <TextField autocomplete="tax-identification-number" bind:value={company.tin}>{$_(`company.tin`)}</TextField>
    <CustomSelect required={true}  bind:value={company.country} items={countries}>{$_(`company.country`)}</CustomSelect>
</div>