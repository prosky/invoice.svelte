<script>
    import {Button, Icon, NavigationDrawer, Overlay,} from 'svelte-materialify';
    import {mdiGoogleDrive} from '@mdi/js';
    import GoogleDrive from "../GoogleDrive/GoogleDrive.svelte";
    export let active = false;
    close = () => {
        active = false
    };
    open = () => {
        active = true
    };
</script>

<div class="drawer">
    <Button class="drawer-button primary-text ma-4" icon size="large" on:click={open}>
        <Icon path={mdiGoogleDrive} size="3rem"/>
    </Button>
    <NavigationDrawer fixed {active}>
        <GoogleDrive/>
    </NavigationDrawer>
    <Overlay index={1} {active} on:click={close}/>
</div>

<style type="scss">
    .drawer {
        position: fixed;
        top: 0;
        left: 0;
    }
</style>