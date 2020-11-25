<script lang="ts">
    import {Alert, Icon} from 'svelte-materialify/src';
    import {store} from './flashesStore';
</script>

<div class="flashes">
    {#each $store as message }
        <Alert transitionOpts={{ duration: 250 }} dismissible on:dissmiss={()=>store.remove(message)}
               class={`${message.type}-text`} text dense>
            {message.message}
            <div slot="icon">
                <Icon path={message.icon}/>
            </div>
        </Alert>
    {/each}
</div>

<style type="scss">
  .flashes {
    max-height: 100vh;
    overflow: auto;
    z-index: 1002;
    padding: 10px;
    margin: 10px;
    position: fixed;
    top: 0;
    right: 0;
  }
</style>