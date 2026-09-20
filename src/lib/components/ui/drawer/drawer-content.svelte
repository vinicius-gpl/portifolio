<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { sheetSlideIn, sheetSlideOut } from '$lib/actions/gsap-sheet-transition';
	import { dragToDismiss } from '$lib/actions/drag-to-dismiss';
	import DrawerOverlay from './drawer-overlay.svelte';
	import DrawerPortal from './drawer-portal.svelte';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		onDismiss,
		...restProps
	}: DialogPrimitive.ContentProps & {
		children: Snippet;
		/** Called when the user drags the handle down past the dismiss threshold. */
		onDismiss?: () => void;
	} = $props();
</script>

<DrawerPortal>
	<DrawerOverlay />
	<DialogPrimitive.Content forceMount bind:ref {...restProps}>
		{#snippet child({ props, open })}
			{#if open}
				<div
					{...props}
					class={cn(
						'fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-[20px] border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] pb-[env(safe-area-inset-bottom)] shadow-2xl outline-none',
						className
					)}
					in:sheetSlideIn
					out:sheetSlideOut
					use:dragToDismiss={{ onDismiss: () => onDismiss?.() }}
				>
					<div data-drag-handle class="flex shrink-0 touch-none justify-center py-3">
						<div class="h-1.5 w-10 rounded-full bg-[var(--color-border-hover)]"></div>
					</div>
					<div class="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-1 pb-6">
						{@render children?.()}
					</div>
				</div>
			{/if}
		{/snippet}
	</DialogPrimitive.Content>
</DrawerPortal>
