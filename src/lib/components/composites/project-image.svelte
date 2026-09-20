<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Search } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';

	let {
		src,
		alt,
		type = 'desktop',
		dimensions,
		onOpenDetails
	}: {
		src: string;
		alt: string;
		type?: 'desktop' | 'mobile';
		dimensions?: { width: number; height: number };
		onOpenDetails?: () => void;
	} = $props();

	const ratio = $derived(dimensions ? dimensions.width / dimensions.height : 16 / 10);
</script>

<button
	type="button"
	class="image-frame"
	onclick={() => onOpenDetails?.()}
	aria-label={m['projects.view_details']()}
>
	{#if type === 'mobile'}
		<!-- Mobile screenshots (phone banners) are already tall/portrait — render
		     at their natural size instead of forcing them into a fixed box. -->
		<img {src} {alt} loading="lazy" class="mobile-img" />
	{:else}
		<!-- Desktop/web screenshots: the frame is sized to the image's actual
		     pixel ratio (see Project.previewDimensions), so `contain` fits it
		     exactly — no cropping and no letterbox bars. -->
		<AspectRatio {ratio}>
			<img {src} {alt} loading="lazy" class="desktop-img" />
		</AspectRatio>
	{/if}
	<span class="zoom-badge"><Search size={16} /></span>
</button>

<style>
	.image-frame {
		display: block;
		position: relative;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	}

	.mobile-img {
		display: block;
		width: 100%;
		height: auto;
	}

	.desktop-img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.zoom-badge {
		position: absolute;
		right: 10px;
		bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.55);
		color: #fff;
		opacity: 0;
		transition: opacity 0.15s;
	}

	.image-frame:hover .zoom-badge,
	.image-frame:focus-visible .zoom-badge {
		opacity: 1;
	}
</style>
