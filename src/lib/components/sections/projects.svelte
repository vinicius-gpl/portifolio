<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectCard from '../composites/project-card.svelte';
	import AuthServerFeature from '../composites/projects/auth-server-feature.svelte';
	import AcerolaAndroidFeature from '../composites/projects/acerola-android-feature.svelte';
	import AcerolaDesktopFeature from '../composites/projects/acerola-desktop-feature.svelte';
	import AcerolaRagFeature from '../composites/projects/acerola-rag-feature.svelte';
	import { intersect } from '$lib/actions/intersect';
	import { scrollReveal } from '$lib/actions/scroll-reveal';
	import * as m from '$lib/paraglide/messages';

	let { projects }: { projects: Project[] } = $props();

	const rest = $derived(projects.filter((p) => !p.preview));
</script>

<section
	id="projects"
	class="mx-auto max-w-5xl px-6 py-20 sm:py-28"
	use:intersect={{ section: 'projects', threshold: 0.2 }}
	use:scrollReveal
>
	<h2
		class="mb-12 flex items-center gap-3 text-2xl font-bold whitespace-nowrap text-[var(--color-text)]"
	>
		<span class="[font-family:var(--font-mono)] font-semibold text-[var(--color-accent)]">
			01.
		</span>
		{m['projects.title']()}
		<span class="h-px flex-1 bg-[var(--color-border)]"></span>
	</h2>

	<div class="flex flex-col gap-16">
		<AuthServerFeature />
		<AcerolaAndroidFeature />
		<AcerolaDesktopFeature />
		<AcerolaRagFeature />
	</div>

	{#if rest.length > 0}
		<h3 class="mt-[4.5rem] mb-6 text-center text-base font-bold text-[var(--color-text)]">
			{m['projects.ideas_title']()}
		</h3>
		<div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
			{#each rest as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}
</section>
