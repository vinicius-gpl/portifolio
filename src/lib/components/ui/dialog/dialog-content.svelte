<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { fly } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import DialogOverlay from './dialog-overlay.svelte';
	import DialogPortal from './dialog-portal.svelte';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		showCloseButton = true,
		...restProps
	}: DialogPrimitive.ContentProps & {
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<DialogPortal>
	<DialogOverlay />
	<DialogPrimitive.Content forceMount bind:ref {...restProps}>
		{#snippet child({ props, open })}
			{#if open}
				<div
					{...props}
					class={cn(
						'fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-2xl outline-none',
						className
					)}
					transition:fly={{ duration: 200, y: 12 }}
				>
					{@render children?.()}
					{#if showCloseButton}
						<DialogPrimitive.Close
							class="absolute top-4 right-4 rounded-full p-1.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text)]"
						>
							<X size={18} />
							<span class="sr-only">Close</span>
						</DialogPrimitive.Close>
					{/if}
				</div>
			{/if}
		{/snippet}
	</DialogPrimitive.Content>
</DialogPortal>
