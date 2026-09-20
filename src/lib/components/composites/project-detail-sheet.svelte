<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import ProjectLinks from './project-links.svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import type { Project, ProjectStatus } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project, open = $bindable(false) }: { project: Project; open?: boolean } = $props();

	const isMobile = new IsMobile();
	const locale = $derived(getLocale());
	const desc = $derived(locale === 'pt-br' ? project.desc['pt-br'] : project.desc.en);

	// `lightboxImage` is intentionally left set after closing — clearing it
	// immediately would blank the image mid fade-out, since `lightboxOpen`
	// (which drives the exit transition) turns false a beat before the
	// dialog's presence layer actually removes the content from the DOM.
	let lightboxImage = $state<{ src: string; alt: string } | null>(null);
	let lightboxOpen = $state(false);

	function openLightbox(image: { src: string; alt: string }) {
		lightboxImage = image;
		lightboxOpen = true;
	}

	const STATUS_COLOR: Record<ProjectStatus, string> = {
		done: 'var(--color-status-done)',
		'pre-release': 'var(--color-status-pre-release)',
		'in-progress': 'var(--color-status-in-progress)',
		idea: 'var(--color-status-idea)'
	};

	const statusLabel = $derived(() => {
		switch (project.status) {
			case 'done':
				return m['projects.status.done']();
			case 'pre-release':
				return m['projects.status.pre_release']();
			case 'in-progress':
				return m['projects.status.in_progress']();
			case 'idea':
				return m['projects.status.idea']();
		}
	});

	function imageTitle(title: { en: string; 'pt-br': string } | string): string {
		if (typeof title === 'string') return title;
		return locale === 'pt-br' ? title['pt-br'] : title.en;
	}
</script>

{#snippet detailBody()}
	<p class="text-[0.92rem] leading-[1.7] text-[var(--color-text-muted)]">{desc}</p>

	<ul
		class="mt-4 flex flex-wrap gap-x-[0.9rem] gap-y-[0.4rem] [font-family:var(--font-mono)] text-[0.72rem] text-[var(--color-text-faint)]"
	>
		{#each project.tech as tech (tech)}
			<li>{tech}</li>
		{/each}
	</ul>

	{#if project.images?.length}
		<div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
			{#each project.images as image (image.url)}
				<button
					type="button"
					class="gallery-thumb group overflow-hidden rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg)] transition-colors hover:border-[var(--color-border-hover)]"
					onclick={() => openLightbox({ src: image.url, alt: imageTitle(image.title) })}
					aria-label={imageTitle(image.title)}
				>
					<img
						src={image.url}
						alt={imageTitle(image.title)}
						loading="lazy"
						class="block aspect-video h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
				</button>
			{/each}
		</div>
	{/if}

	{#if project.highlights?.length}
		<div class="mt-5">
			<h4
				class="mb-2 [font-family:var(--font-mono)] text-[0.7rem] tracking-[0.1em] text-[var(--color-accent)] uppercase"
			>
				{m['projects.highlights']()}
			</h4>
			<dl class="flex flex-col gap-3">
				{#each project.highlights as highlight (highlight.title.en)}
					<div>
						<dt class="text-[0.85rem] font-semibold text-[var(--color-text)]">
							{locale === 'pt-br' ? highlight.title['pt-br'] : highlight.title.en}
						</dt>
						<dd class="text-[0.82rem] leading-[1.6] text-[var(--color-text-muted)]">
							{locale === 'pt-br' ? highlight.body['pt-br'] : highlight.body.en}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
	{/if}

	<div class="mt-5">
		<ProjectLinks {project} />
	</div>
{/snippet}

{#snippet statusBadge()}
	<span
		class="[font-family:var(--font-mono)] text-[0.6rem] font-bold tracking-[0.08em] uppercase"
		style="color: {STATUS_COLOR[project.status]}"
	>
		{statusLabel()}
	</span>
{/snippet}

{#if isMobile.current}
	<Drawer.Root bind:open>
		<Drawer.Content onDismiss={() => (open = false)}>
			<Drawer.Header class="flex-row items-center justify-between">
				<Drawer.Title>{project.title}</Drawer.Title>
				{@render statusBadge()}
			</Drawer.Header>
			{@render detailBody()}
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Dialog.Root bind:open>
		<Dialog.Content>
			<Dialog.Header class="flex-row items-center justify-between pr-8">
				<Dialog.Title>{project.title}</Dialog.Title>
				{@render statusBadge()}
			</Dialog.Header>
			{@render detailBody()}
		</Dialog.Content>
	</Dialog.Root>
{/if}

<!-- Nested bits-ui dialog (not a bare portal) so it registers in the same
     layer stack as the dialog/drawer above it — clicking its backdrop or
     close button is then correctly seen as "inside a layer", not an outside
     click on the parent, which would otherwise close it too. -->
<DialogPrimitive.Root
	open={lightboxOpen}
	onOpenChange={(next) => {
		if (!next) lightboxOpen = false;
	}}
>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="image-lightbox-overlay fixed inset-0 z-[100] bg-black/90"
						onclick={() => (lightboxOpen = false)}
						transition:fade={{ duration: 150 }}
					></div>
				{/if}
			{/snippet}
		</DialogPrimitive.Overlay>
		<DialogPrimitive.Content forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="image-lightbox fixed inset-0 z-[100] flex items-center justify-center p-4 outline-none"
						onclick={(e) => {
							if (e.target === e.currentTarget) {
								lightboxOpen = false;
							}
						}}
						transition:fade={{ duration: 150 }}
					>
						<DialogPrimitive.Close
							class="absolute top-4 right-4 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
						>
							<X size={22} />
							<span class="sr-only">{m['projects.close']()}</span>
						</DialogPrimitive.Close>
						{#if lightboxImage}
							<img
								src={lightboxImage.src}
								alt={lightboxImage.alt}
								class="max-h-full max-w-full rounded-[8px] object-contain"
							/>
						{/if}
					</div>
				{/if}
			{/snippet}
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
