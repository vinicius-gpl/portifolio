<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import ProjectLinks from './project-links.svelte';
	import type { Project, ProjectStatus } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project }: { project: Project } = $props();

	const desc = $derived(getLocale() === 'pt-br' ? project.desc['pt-br'] : project.desc.en);

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
</script>

<article class="card">
	<div class="card-top">
		<h3 class="card-title">{project.title}</h3>
		<span class="card-status" style="color: {STATUS_COLOR[project.status]}">{statusLabel()}</span>
	</div>

	<p class="card-desc">{desc}</p>

	<ul class="tech-list">
		{#each project.tech as tech (tech)}
			<li>{tech}</li>
		{/each}
	</ul>

	<ProjectLinks {project} />
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem;
		border-radius: 10px;
		border: 1px solid var(--color-border);
		background: var(--color-bg-elevated);
		transition: border-color 0.15s;
	}
	.card:hover {
		border-color: var(--color-border-hover);
	}

	.card-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.card-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--color-text);
	}

	.card-status {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.card-desc {
		font-size: 0.82rem;
		line-height: 1.6;
		color: var(--color-text-muted);
		flex: 1;
	}

	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 0.7rem;
		list-style: none;
		padding: 0;
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--color-text-faint);
	}
</style>
