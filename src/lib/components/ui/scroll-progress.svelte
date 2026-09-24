<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let bar: HTMLDivElement;

	onMount(() => {
		if (typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		gsap.registerPlugin(ScrollTrigger);

		const tween = gsap.fromTo(
			bar,
			{ scaleX: 0 },
			{
				scaleX: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: document.documentElement,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 0.15
				}
			}
		);

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	});
</script>

<div bind:this={bar} class="scroll-progress-bar" aria-hidden="true"></div>

<style>
	.scroll-progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 2.5px;
		background: linear-gradient(90deg, var(--ctp-lavender), var(--ctp-mauve), var(--ctp-pink));
		transform-origin: 0% 50%;
		transform: scaleX(0);
		z-index: 100;
		pointer-events: none;
		box-shadow: 0 0 8px rgba(203, 166, 247, 0.6);
	}
</style>
