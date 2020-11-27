<script lang="ts">
    import {_} from "svelte-i18n";
    import {Button, Icon, NavigationDrawer} from 'svelte-materialify/src';
    import {mdiClose, mdiGoogleDrive} from '@mdi/js';
    import GoogleDrive from "../GoogleDrive/GoogleDrive.svelte";
    import Settings from "../Settings.svelte";
    export let active = false;
</script>

<div class="drawer">
    <Button class="drawer-button primary-text ma-4" icon size="large" on:click={()=>active = !active}>
        <Icon path={mdiGoogleDrive} size="3rem"/>
    </Button>
    <NavigationDrawer casss="d-flex" fixed {active}>
        <GoogleDrive/>
        <hr>
        <Settings class="mt-auto"/>
        <hr>
        <Button class="drawer-button primary-text" size="large" depressed block   on:click={()=>active = !active}>
         {$_('buttons.close')} <Icon path={mdiClose} />
      </Button>
    </NavigationDrawer>
</div>

<style >
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
