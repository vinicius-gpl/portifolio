<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import GithubIcon from '../primitives/github-icon.svelte';
	import type { Project } from '$lib/data/projects';
	import * as m from '$lib/paraglide/messages';

	let { project }: { project: Project } = $props();
</script>

{#if project.github || project.docs || project.demo}
	<div class="links">
		{#if project.github}
			<a href={project.github} target="_blank" rel="noopener noreferrer" class="link">
				<GithubIcon size={14} />
				{m['projects.github']()}
			</a>
		{/if}
		{#if project.docs}
			<a href={project.docs} target="_blank" rel="noopener noreferrer" class="link">
				<img src="/icons/acerola-logo.svg" alt="" class="link-icon" />
				{m['projects.docs']()}
			</a>
		{/if}
		{#if project.demo}
			<a href={project.demo} target="_blank" rel="noopener noreferrer" class="link">
				<ExternalLink size={14} />
				{m['projects.demo']()}
			</a>
		{/if}
	</div>
{/if}

<style>
	.links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.1rem;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.15s;
	}
	.link:hover {
		color: var(--color-accent);
	}

	.link-icon {
		width: 14px;
		height: 14px;
		object-fit: contain;
	}
</style>
