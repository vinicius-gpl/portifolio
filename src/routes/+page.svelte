<script lang="ts">
	import Hero from '$lib/components/sections/hero.svelte';
	import Projects from '$lib/components/sections/projects.svelte';
	import About from '$lib/components/sections/about.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import { PROJECTS } from '$lib/data/projects';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
</svelte:head>

<main>
	<Hero github={data.github} />
	<Projects projects={PROJECTS} />
	<About />
	<Contact />

	<footer class="site-footer">
		<p>Designed &amp; built by Vinícius GPL.</p>
	</footer>
</main>

<style>
	.site-footer {
		padding: 2rem 1.5rem 3rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-text-faint);
	}
</style>
