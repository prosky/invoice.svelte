<script lang="ts">
    import {Alert, Icon} from 'svelte-materialify';
    import flashes from './flashesStore';
</script>

<div class="flashes">
    {#each $flashes as message, i}
        <Alert transitionOpts={{ duration: 250 }} dismissible on:dissmiss={()=>flashes.remove(message)}
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