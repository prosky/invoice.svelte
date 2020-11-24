<script>
    import {Button, Icon, NavigationDrawer, Overlay,} from 'svelte-materialify/src';
    import {mdiGoogleDrive} from '@mdi/js';

    let active = false;
    close = () => {
        active = false
    };
    open = () => {
        active = true
    };
</script>

<div class="drawer">
    <Button class="primary-text ma-4" icon size="large" on:click={open}>
        <Icon path={mdiGoogleDrive} size="3rem"/>
    </Button>
    <NavigationDrawer fixed {active}>

    </NavigationDrawer>
    <Overlay index={1} {active} on:click={close}/>
</div>

<style type="scss">
  .drawer {
    position: fixed;
  }
</style>