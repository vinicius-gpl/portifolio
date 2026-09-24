<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import { PROJECTS } from '$lib/data/projects';
	import ProjectImage from '../project-image.svelte';
	import ProjectLinks from '../project-links.svelte';
	import ProjectDetailSheet from '../project-detail-sheet.svelte';
	import { Search } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { scrollScale } from '$lib/actions/scroll-scale';
	import { card3D } from '$lib/actions/card-3d';

	const project = PROJECTS.find((p) => p.id === 'acerola-rag')!;
	const desc = $derived(getLocale() === 'pt-br' ? project.desc['pt-br'] : project.desc.en);

	let detailsOpen = $state(false);
</script>

<!-- Chat screenshot is very wide (2.23:1) — give it a much wider column so it
     reads at a comparable size to the other featured screenshots. -->
<article
	class="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2.7fr]"
	use:scrollScale={{ mode: 'scrub', startScale: 0.9, exitScale: 0.96 }}
>
	<div
		class="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-shadow duration-300 hover:shadow-xl hover:shadow-[rgba(203,166,247,0.06)] md:order-2"
		use:card3D={{ maxRotation: 5, hoverScale: 1.015 }}
	>
		<ProjectImage
			src={project.preview ?? ''}
			alt={project.title}
			type={project.previewType}
			dimensions={project.previewDimensions}
			onOpenDetails={() => (detailsOpen = true)}
		/>
	</div>
	<div class="md:order-1">
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
		<div class="flex flex-wrap items-center gap-x-[1.1rem] gap-y-2">
			<ProjectLinks {project} />
			<button
				type="button"
				class="view-details-btn inline-flex items-center gap-[6px] text-[0.78rem] font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
				onclick={() => (detailsOpen = true)}
			>
				<Search size={14} />
				{m['projects.view_details']()}
			</button>
		</div>
	</div>
</article>

<ProjectDetailSheet {project} bind:open={detailsOpen} />
