

<script lang="ts">
    import {_} from 'svelte-i18n';
    import {TextField} from "svelte-materialify";
    import type Company from "../../app/classes/Company";
    import CustomSelect from "../Inputs/CustomSelect.svelte";
    import countries from "../../app/data/countries";
    export let company: Company;
</script>


<div class="company">
    <TextField dense class="mb-1" autocomplete="organization" bind:value={company.name}>{$_(`company.name`)}</TextField>
    <TextField dense class="mb-1" autocomplete="address-line1" bind:value={company.address}>{$_(`company.address`)}</TextField>
    <TextField dense class="mb-1" autocomplete="address-line2" bind:value={company.address2}>{$_(`company.address2`)}</TextField>
    <TextField dense class="mb-1" autocomplete="company-identification-number" bind:value={company.cin}>{$_(`company.cin`)}</TextField>
    <TextField dense class="mb-1" autocomplete="tax-identification-number" bind:value={company.tin}>{$_(`company.tin`)}</TextField>
    <CustomSelect dense bind:value={company.country} items={countries}>{$_(`company.country`)}</CustomSelect>
</div>
