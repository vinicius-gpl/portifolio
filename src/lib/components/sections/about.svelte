<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	import { scrollReveal } from '$lib/actions/scroll-reveal';
	import { scrollScale } from '$lib/actions/scroll-scale';
	import * as m from '$lib/paraglide/messages';

	const STACK = [
		{
			category: () => m['about.frontend'](),
			items: ['Tailwind', 'React', 'Svelte', 'Jetpack Compose']
		},
		{ category: () => m['about.backend'](), items: ['Java', 'Kotlin', 'Spring Boot', 'Node.js'] },
		{
			category: () => m['about.database'](),
			items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase']
		},
		{ category: () => m['about.infra'](), items: ['Docker', 'Git', 'Linux', 'CI/CD'] }
	];
</script>

<section
	id="about"
	class="section-inner mx-auto max-w-3xl px-6 py-20 sm:py-28"
	use:intersect={{ section: 'about', threshold: 0.2 }}
	use:scrollReveal
>
	<h2 class="section-heading">
		<span class="num">02.</span>
		{m['about.title']()}
		<span class="rule"></span>
	</h2>

	<p class="bio-text">{m['about.bio']()}</p>

	<div
		class="stack-grid"
		use:scrollScale={{
			mode: 'stagger-grid',
			childrenSelector: '.stack-item',
			stagger: 0.035,
			startScale: 0.7
		}}
	>
		{#each STACK as group (group.category())}
			<div class="stack-group">
				<span class="stack-category">{group.category()}</span>
				<ul class="stack-items">
					{#each group.items as item (item)}
						<li class="stack-item">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.section-heading {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
		white-space: nowrap;
		margin-bottom: 2rem;
	}

	.num {
		font-family: var(--font-mono);
		color: var(--color-accent);
		font-weight: 600;
	}

	.rule {
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}

	.bio-text {
		font-size: 1rem;
		line-height: 1.75;
		color: var(--color-text-muted);
		max-width: 65ch;
		margin-bottom: 2.5rem;
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1.5rem 2rem;
	}

	.stack-category {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 0.6rem;
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.stack-item {
		position: relative;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		padding: 0.3rem 0 0.3rem 1rem;
	}

	.stack-item::before {
		content: '▹';
		position: absolute;
		left: 0;
		color: var(--color-accent);
	}
</style>
