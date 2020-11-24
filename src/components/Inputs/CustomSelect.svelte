<script lang="ts">
    import {Select} from "svelte-materialify";
    import * as rules from "../../app/utils/rules";

    type T = unknown;

    export let items: Record<string, T>;
    export let value: T = undefined;
    export let required: boolean = false;

    let val: T = value;
    const reset = () => val = value;
    const getValue = (newVal: T) => {
        if (required && !newVal) return reset();
        return newVal;
    }
    const values = (obj: object) => Object.entries(obj).map(([value, name]) => ({value, name}));
    const format = (val) => items[val];
    $: value = getValue(val);
</script>


<Select {rules} bind:value={val} {format} items={values(items)} {...$$restProps}>
    <slot/>
</Select>