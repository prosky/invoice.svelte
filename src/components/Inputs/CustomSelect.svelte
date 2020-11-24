<script lang="ts">
    import {Select} from "svelte-materialify/src";

    export let items: Record<string, any>;
    export let format = (val) => items[val];
    export let value: any;

    let tempVal: any = value;
    const reset = () => tempVal = value;
    const getValue = (newVal: any) => newVal === null ? reset() : newVal;
    const values = (obj: object) => Object.entries(obj).map(([value, name]) => ({value, name}));
    $: value = getValue(tempVal);
</script>


<Select bind:value={tempVal} {format} items={values(items)} {...$$restProps}>
    <slot/>
</Select>