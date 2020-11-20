<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Select} from "svelte-materialify/src";

    export let items: Record<string, any>;
    export let value: any;
    export let required: boolean = false;
    export let rules = [];

    if (required) {
        rules.push((value) => value ? false : $_('forms.messages.required'));
    }
    let val: any = value;

    const reset = () => {
        val = value;
    }
    const getValue = (newVal: any) => {
        let error = false;
        for (let rule of rules) {
            let message = rule(newVal);
            if (message) {
                error = true;
                //alert(message)
            }
        }
        if (error) {
            reset();
            return value;
        }
        return newVal;
    }

    const values = (obj: object) => Object.entries(obj).map(([value, name]) => ({value, name}));
    const format = (val) => items[val];
    $: value = getValue(val);
</script>


<Select {rules} bind:value={val} {format}  items={values(items)} {...$$restProps}>
    <slot/>
</Select>