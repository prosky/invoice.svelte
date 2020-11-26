<script>
    import {Button, Icon, NavigationDrawer, Overlay} from 'svelte-materialify/src';
    import {mdiGoogleDrive} from '@mdi/js';
    import GoogleDrive from "../GoogleDrive/GoogleDrive.svelte";

    export let active = false;
</script>

<div class="drawer">
    <Button class="drawer-button primary-text ma-4" icon size="large" on:click={()=>active = true}>
        <Icon path={mdiGoogleDrive} size="3rem"/>
    </Button>
    <NavigationDrawer fixed {active}>
        <GoogleDrive/>
    </NavigationDrawer>
    <Overlay index={1} {active} on:click={ ()=> active = false}/>
</div>

<style type="scss">
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>