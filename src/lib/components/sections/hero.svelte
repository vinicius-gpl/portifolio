<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown, Download } from 'lucide-svelte';
	import GithubIcon from '$lib/components/primitives/github-icon.svelte';
	import { RESUME_URL } from '$lib/data/resume';
	import type { GitHubUser } from '$lib/service/github.service';
	import * as m from '$lib/paraglide/messages';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { github }: { github: GitHubUser | null } = $props();

	let heroEl: HTMLElement;
	let contentEl: HTMLDivElement;

	onMount(() => {
		if (typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		gsap.registerPlugin(ScrollTrigger);

		// Intro entrance animation
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		const avatar = contentEl.querySelector('.hero-avatar');
		const eyebrow = contentEl.querySelector('.hero-eyebrow');
		const name = contentEl.querySelector('.hero-name');
		const role = contentEl.querySelector('.hero-role');
		const subtitle = contentEl.querySelector('.hero-subtitle');
		const ctas = contentEl.querySelectorAll('.hero-ctas > a');

		if (avatar) {
			tl.fromTo(
				avatar,
				{ scale: 0.6, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
			);
		}
		if (eyebrow) {
			tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
		}
		if (name) {
			tl.fromTo(
				name,
				{ opacity: 0, y: 25, scale: 0.95 },
				{ opacity: 1, y: 0, scale: 1, duration: 0.7 },
				'-=0.3'
			);
		}
		if (role) {
			tl.fromTo(role, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
		}
		if (subtitle) {
			tl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
		}
		if (ctas.length > 0) {
			tl.fromTo(
				ctas,
				{ opacity: 0, scale: 0.9, y: 15 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' },
				'-=0.3'
			);
		}

		// Scroll scale exit scrub: gently scales down and dims as user scrolls down towards projects
		const scrollTween = gsap.to(contentEl, {
			scale: 0.92,
			opacity: 0.2,
			y: -40,
			ease: 'none',
			scrollTrigger: {
				trigger: heroEl,
				start: 'top top',
				end: 'bottom 20%',
				scrub: 0.5
			}
		});

		return () => {
			scrollTween.scrollTrigger?.kill();
			scrollTween.kill();
			tl.kill();
		};
	});
</script>

<section
	id="hero"
	bind:this={heroEl}
	class="hero flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center"
>
	<div bind:this={contentEl} class="flex max-w-3xl flex-col items-center will-change-transform">
		{#if github?.avatar_url}
			<img
				src={github.avatar_url}
				alt={github.login}
				width="64"
				height="64"
				class="hero-avatar mb-6 h-16 w-16 rounded-full border border-[var(--color-border)]"
			/>
		{/if}

		<p class="hero-eyebrow">{m['hero.eyebrow']()}</p>
		<h1 class="hero-name">Vinícius Gabriel</h1>
		<p class="hero-role">{m['hero.role']()}</p>
		<p class="hero-subtitle">{m['hero.subtitle']()}</p>

		<div class="hero-ctas">
			<a href="#projects" class="btn-primary">{m['hero.cta_projects']()}</a>
			<a
				href="https://github.com/vinicius-gpl"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-ghost"
			>
				<GithubIcon size={16} />
				<span>GitHub</span>
			</a>
			<a href={RESUME_URL} target="_blank" rel="noopener noreferrer" class="btn-ghost">
				<Download size={16} />
				<span>{m['resume.download']()}</span>
			</a>
		</div>
	</div>

	<a href="#projects" class="scroll-hint" aria-hidden="true">
		<ArrowDown size={16} />
	</a>
</section>

<style>
	.hero {
		position: relative;
	}

	.hero-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-accent);
		margin-bottom: 1rem;
	}

	.hero-name {
		font-size: clamp(2.25rem, 7vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text);
		line-height: 1.1;
		margin-bottom: 0.5rem;
	}

	.hero-role {
		font-size: clamp(1.25rem, 4vw, 1.75rem);
		font-weight: 700;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		max-width: 42ch;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-text-muted);
		margin-bottom: 2.25rem;
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.7rem 1.5rem;
		border-radius: 8px;
		background: var(--color-accent);
		color: var(--color-bg);
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		transition: opacity 0.15s;
	}
	.btn-primary:hover {
		opacity: 0.85;
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 0.7rem 1.5rem;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		color: var(--color-text);
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		transition: border-color 0.15s;
	}
	.btn-ghost:hover {
		border-color: var(--color-accent);
	}

	.scroll-hint {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		color: var(--color-text-faint);
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translate(-50%, 0);
		}
		50% {
			transform: translate(-50%, 6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-hint {
			animation: none;
		}
	}
</style>
