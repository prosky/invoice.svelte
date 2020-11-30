<script lang="ts">
	import {_} from 'svelte-i18n';
	import {Alert, Button, Icon} from 'svelte-materialify';
	import {store} from './flashes';
	import {mdiDeleteCircle } from "@mdi/js";

	const clear = () => {
		store.reset();
	};

</script>

<div class="flashes">
	{#if $store.length}
		<div class="d-flex align-content-end">
			<Button icon title={$_('flashes.clear')} on:click={clear}>
				<Icon path={mdiDeleteCircle }/>
			</Button>
		</div>
	{/if}
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
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
