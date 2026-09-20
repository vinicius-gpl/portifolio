<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay forceMount bind:ref {...restProps}>
	{#snippet child({ props, open })}
		{#if open}
			<div
				{...props}
				class={cn('fixed inset-0 z-50 bg-black/70', className)}
				transition:fade={{ duration: 150 }}
			></div>
		{/if}
	{/snippet}
</DialogPrimitive.Overlay>
