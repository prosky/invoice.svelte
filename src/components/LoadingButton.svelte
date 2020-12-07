<script lang="ts">
	import {Button, Icon, ProgressCircular} from "svelte-materialify";

	export let loading: boolean = false;
	export let icon: string ;

</script>
<Button disabled={loading} {...$$restProps} on:click>
		<span class="mr-3">
			{#if loading}
				<ProgressCircular size={24} indeterminate color="primary"/>
			{:else}
				<Icon class="primary" path="{icon}"/>
			{/if}
		</span>
	<slot/>
</Button>
