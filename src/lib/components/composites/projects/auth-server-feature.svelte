<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import { PROJECTS } from '$lib/data/projects';
	import ProjectImage from '../project-image.svelte';
	import ProjectLinks from '../project-links.svelte';
	import * as m from '$lib/paraglide/messages';

	const project = PROJECTS.find((p) => p.id === 'auth-server')!;
	const desc = $derived(getLocale() === 'pt-br' ? project.desc['pt-br'] : project.desc.en);
</script>

<article class="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.7fr_1fr]">
	<div
		class="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
	>
		<ProjectImage
			src={project.preview ?? ''}
			alt={project.title}
			type={project.previewType}
			dimensions={project.previewDimensions}
		/>
	</div>
	<div>
		<p
			class="mb-2 [font-family:var(--font-mono)] text-[0.7rem] tracking-[0.1em] text-[var(--color-accent)] uppercase"
		>
			{m['projects.project_prefix']()}
		</p>
		<h3 class="mb-3 text-[1.4rem] font-bold text-[var(--color-text)]">{project.title}</h3>
		<p class="mb-[1.1rem] text-[0.92rem] leading-[1.7] text-[var(--color-text-muted)]">{desc}</p>
		<ul
			class="mb-5 flex flex-wrap gap-x-[0.9rem] gap-y-[0.4rem] [font-family:var(--font-mono)] text-[0.72rem] text-[var(--color-text-faint)]"
		>
			{#each project.tech as tech (tech)}
				<li>{tech}</li>
			{/each}
		</ul>
		<ProjectLinks {project} />
	</div>
</article>
