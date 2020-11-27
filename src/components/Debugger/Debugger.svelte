<script lang="ts">
    import {Alert, AppBar, Badge, Button, Icon, ListItem, Menu} from 'svelte-materialify';
    import {storage,remove} from './debug';
    import {mdiLadybug} from '@mdi/js';
    import Output from "./Output.svelte";
    $: value = $storage.length;
</script>
<div class="debugger">
    <AppBar dense  tile={false}>
        <span slot="title" class="small"><small>Debugger</small></span>
        <Menu bottom right closeOnClickOutside closeOnClick={false}>
            <div slot="activator">
                <Badge bottom left offsetX={20} offsetY={20} class="primary-color" active={value !== 0} {value}>
                    <Button size="large" icon class={`${value?'red':'grey'}-text`} disabled={value === 0}>
                        <Icon path={mdiLadybug}/>
                    </Button>
                </Badge>
            </div>
            {#if $storage}
                {#each $storage as message }
                    <ListItem ripple={false} selectable dense multiline>
                        <Alert dismissible on:dissmiss={()=>remove(message)} class={`${message.type}-text`}  dense>
                            <Output data={message.message}/>
                        </Alert>
                    </ListItem>
                {/each}
            {/if}
        </Menu>
        <slot/>
    </AppBar>
</div>
<style>
    .small{
        font-size: .8em;
    }
    .debugger {
        max-height: 100vh;
        z-index: 1002;
        margin: 10px;
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>