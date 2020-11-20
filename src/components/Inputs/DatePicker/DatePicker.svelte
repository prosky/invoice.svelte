<script type="ts">
    import {_} from 'svelte-i18n'
    import {format} from 'date-fns';
    import {createEventDispatcher} from "svelte";
    import {Button, Icon, Menu, TextField} from "svelte-materialify/src";
    import Calender from "./Calender.svelte";
    import {getMonthName} from "./date-time.js";
    import {mdiArrowLeft, mdiArrowRight} from '@mdi/js';

    const dispatch = createEventDispatcher();

    // props
    export let isAllowed = () => true;
    export let selected = new Date();
    export let locale = null;
    export let dateFormat = 'm-d-Y';
    export let active = false;

    // state
    let date, month, year, showDatePicker;

    // so that these change with props
    $: {
        date = selected.getDate();
        month = selected.getMonth();
        year = selected.getFullYear();
    }

    // handlers
    const onFocus = () => {
        showDatePicker = true;
    };

    const next = () => {
        if (month === 11) {
            month = 0;
            year = year + 1;
            return;
        }
        month = month + 1;
    };

    const prev = () => {
        if (month === 0) {
            month = 11;
            year -= 1;
            return;
        }
        month -= 1;
    };

    const onDateChange = d => {
        active = false;
        dispatch("datechange", d.detail);
    };
</script>

<style type="scss">

    .month-name {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 6px 0;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<Menu {active}>
   <span slot="activator">
       <TextField on:focus={onFocus} value={format(selected,dateFormat)} {...$$restProps}/>
   </span>
    <div class="box">
        <div class="month-name">
            <div class="center">
                <Button on:click={prev} title={$_('datepicker.buttons.prev')} icon class="text-primary">
                    <Icon path={mdiArrowLeft}/>
                </Button>
            </div>
            <div class="center">{month} {year}</div>
            <div class="center">
                <Button on:click={next} title={$_('datepicker.buttons.next')} icon class="text-primary">
                    <Icon path={mdiArrowRight}/>
                </Button>
            </div>
        </div>
        <Calender {month} {year} date={selected} {isAllowed} on:datechange={onDateChange}/>
    </div>
</Menu>

