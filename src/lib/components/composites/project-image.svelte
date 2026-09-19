<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import * as m from '$lib/paraglide/messages';

	let {
		src,
		alt,
		type = 'desktop',
		dimensions
	}: {
		src: string;
		alt: string;
		type?: 'desktop' | 'mobile';
		dimensions?: { width: number; height: number };
	} = $props();

	const ratio = $derived(dimensions ? dimensions.width / dimensions.height : 16 / 10);
</script>

<button type="button" class="image-trigger" aria-label={m['projects.expand_image']()}>
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

	<!-- Bare preview: no chrome, no backdrop. Shown on hover (desktop) or
	     focus/tap (touch), pinned to a screen corner via pure CSS — no JS,
	     no dialog. -->
	<img {src} {alt} class="hover-preview" />
</button>

<style>
	.image-trigger {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
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

	.hover-preview {
		position: fixed;
		right: 1.5rem;
		bottom: 1.5rem;
		max-width: min(30vw, 460px);
		max-height: 70vh;
		width: auto;
		height: auto;
		object-fit: contain;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease;
		z-index: 200;
	}

	.image-trigger:hover .hover-preview,
	.image-trigger:focus-visible .hover-preview {
		opacity: 1;
	}

	@media (hover: none) {
		.hover-preview {
			max-width: min(70vw, 460px);
		}
	}
</style>
