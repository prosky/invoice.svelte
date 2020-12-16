<script lang="ts">
	import {_} from "svelte-i18n";
	import {Button, Icon, ListItem, NavigationDrawer} from 'svelte-materialify/src';
	import {mdiClose, mdiCog, mdiGoogleDrive} from '@mdi/js';
	import GoogleDrive from "../GoogleDrive/GoogleDrive.svelte";
	import Settings from "../Settings.svelte";

	export type Tab = 'settings' | 'drive' | undefined;
	export let active: Tab = undefined;

	const activate = (key?: Tab) => active = key;

</script>

<div class="drawer-buttons">
	<Button class="drawer-button primary-text ma-4" icon size="large" on:click={()=>activate('drive')}>
		<Icon path={mdiGoogleDrive} size="3rem"/>
	</Button>
	<Button class="drawer-button primary-text ma-4" icon size="large" on:click={()=>activate('settings')}>
		<Icon path={mdiCog} size="3rem"/>
	</Button>
</div>
<NavigationDrawer class="d-flex" fixed active={active ==='drive'}>
	<span slot="prepend">
		<ListItem>
			{$_('google.title')}
			<span slot="append">
				<Button icon class="drawer-button primary-text" size="large" depressed block
						on:click={()=>activate()} title={$_('buttons.close')}>
						<Icon path={mdiClose}/>
				</Button>
			</span>
		</ListItem>
	</span>
	<GoogleDrive/>
</NavigationDrawer>
<NavigationDrawer class="d-flex" fixed active={active ==='settings'}>
	<span slot="prepend">
		<ListItem>
			{$_('settings.title')}
			<span slot="append">
				<Button icon class="drawer-button primary-text" size="large" depressed block
						on:click={()=>activate()} title={$_('buttons.close')}>
						<Icon path={mdiClose}/>
				</Button>
			</span>
		</ListItem>
	</span>
	<Settings/>
</NavigationDrawer>

<style>
	.drawer-buttons {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
