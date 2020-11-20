<script>
    import {Button, Icon, List, ListItem, NavigationDrawer, Overlay,} from 'svelte-materialify/src';
    import { mdiGoogleDrive } from '@mdi/js';
    let active = false;
    close = () => {active = false};
    open = () => {active = true};
</script>

<div class="drawer">
    <Button class="primary-text ma-4" icon size="large" on:click={open}>
        <Icon path={mdiGoogleDrive}   size="3rem" />
    </Button>
    <NavigationDrawer fixed {active}>
        <List>
            <ListItem>
        <span slot="prepend">
          <Icon class="mdi mdi-view-dashboard"/>
        </span>
                Dashboard
            </ListItem>
            <ListItem>
        <span slot="prepend">
          <Icon class="mdi mdi-account-box"/>
        </span>
                Account
            </ListItem>
            <ListItem>
        <span slot="prepend">
          <Icon class="mdi mdi-gavel"/>
        </span>
                Admin
            </ListItem>
        </List>
    </NavigationDrawer>
    <Overlay index={1} {active} on:click={close} />
</div>

<style type="scss">
    .drawer{
        position: fixed;
    }
</style>