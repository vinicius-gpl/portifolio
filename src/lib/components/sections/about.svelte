<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	import { scrollReveal } from '$lib/actions/scroll-reveal';
	import { scrollScale } from '$lib/actions/scroll-scale';
	import { card3D } from '$lib/actions/card-3d';
	import {
		Briefcase,
		GraduationCap,
		MapPin,
		Store,
		ArrowUpRight,
		Layers
	} from 'lucide-svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	const STACK_GROUPS = [
		{
			category: 'Backend & Core',
			items: ['Java', 'Spring Boot', 'NestJS', 'Rust', 'PostgreSQL', 'APIs REST']
		},
		{
			category: 'Frontend & UI',
			items: ['Svelte', 'React', 'Tailwind', 'TypeScript', 'Next.js']
		},
		{
			category: 'Mobile & Multiplataforma',
			items: ['Jetpack Compose', 'Kotlin', 'Tauri', 'P2P/QUIC']
		},
		{
			category: 'Infra & DevOps',
			items: ['Docker', 'Linux', 'VPS', 'Git', 'CI/CD']
		}
	];

	const TIMELINE = $derived([
		{
			company: 'Azuos Assessoria Contábil',
			role: getLocale() === 'pt-br' ? 'Desenvolvedor' : 'Developer',
			period: getLocale() === 'pt-br' ? 'set/2026 — Presente' : 'Sep/2026 — Present',
			current: true,
			highlights:
				getLocale() === 'pt-br'
					? [
							'Configuração, implantação e manutenção de VPS para suporte e hospedagem das aplicações da empresa.',
							'Desenvolvimento e sustentação de microsserviços em Node.js com NestJS, incluindo migrações de banco de dados.',
							'Aplicação de ferramentas de IA (Claude Code) na revisão contínua de código e ganho de produtividade.'
						]
					: [
							'Setup, deployment, and ongoing maintenance of VPS hosting company core software services.',
							'Backend development and service maintenance using Node.js and NestJS, including DB schema migrations.',
							'Leveraging AI tooling (Claude Code) for automated code reviews, refactoring, and dev velocity.'
						]
		},
		{
			company:
				getLocale() === 'pt-br'
					? 'Tribunal de Contas dos Municípios (TCM-GO)'
					: 'Court of Accounts of Municipalities (TCM-GO)',
			role:
				getLocale() === 'pt-br'
					? 'Estagiário de Engenharia de Software'
					: 'Software Engineering Intern',
			period: getLocale() === 'pt-br' ? 'ago/2025 — set/2026' : 'Aug/2025 — Sep/2026',
			current: false,
			highlights:
				getLocale() === 'pt-br'
					? [
							'Manutenção e desenvolvimento de aplicações críticas na Secretaria de Atos de Pessoal.',
							'Construção de soluções com Java, React e Node.js para automação de processos administrativos e análise de dados.',
							'Otimização de fluxos de trabalho com ferramentas de IA e boas práticas de engenharia de software.'
						]
					: [
							'Engineered and maintained internal mission-critical applications for the Personnel Acts Secretariat.',
							'Built software with Java, React, and Node.js to automate administrative workflows and data pipelines.',
							'Applied modern software practices and AI tooling for developer acceleration.'
						]
		},
		{
			company: 'Acerola Reader',
			role:
				getLocale() === 'pt-br'
					? 'Criador & Desenvolvedor (Projeto Pessoal)'
					: 'Creator & Maintainer (Personal Project)',
			period: '2026',
			current: false,
			highlights:
				getLocale() === 'pt-br'
					? [
							'Monorepo multiplataforma distribuído e assinado na Microsoft Store oficial.',
							'Sincronização de progresso peer-to-peer (P2P) sem servidor central via Rust (iroh/QUIC).',
							'Cliente Desktop em Rust + Tauri + Svelte 5 e cliente Android nativo em Kotlin + Jetpack Compose via FFI.'
						]
					: [
							'Cross-platform monorepo officially distributed and signed on the Microsoft Store.',
							'Local-first peer-to-peer (P2P) sync protocol built in Rust (iroh/QUIC) with zero central server dependency.',
							'Desktop app built with Rust, Tauri and Svelte 5; native Android app with Kotlin, Compose and Rust FFI.'
						]
		}
	]);
</script>

<section
	id="about"
	class="section-inner mx-auto max-w-5xl px-6 py-20 sm:py-28"
	use:intersect={{ section: 'about', threshold: 0.15 }}
	use:scrollReveal
>
	<h2 class="section-heading">
		<span class="num">02.</span>
		{m['about.title']()}
		<span class="rule"></span>
	</h2>

	<p class="bio-tagline">
		{m['about.bio']()}
	</p>

	<div class="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
		<!-- Left: Trajectory Timeline -->
		<div>
			<div class="mb-6 flex items-center gap-2.5">
				<Briefcase size={18} class="text-[var(--color-accent)]" />
				<h3 class="text-sm font-bold tracking-wider text-[var(--color-text)] uppercase [font-family:var(--font-mono)]">
					{m['about.timeline_title']()}
				</h3>
			</div>

			<div
				class="timeline-track relative"
				use:scrollScale={{
					mode: 'stagger-grid',
					childrenSelector: '.timeline-item',
					stagger: 0.12,
					startScale: 0.94
				}}
			>
				<!-- Continuous trajectory line -->
				<div
					class="absolute left-3 sm:left-3.5 top-4 bottom-5 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border)] to-[var(--color-border)]"
					aria-hidden="true"
				></div>

				{#each TIMELINE as item (item.company)}
					<div class="timeline-item relative mb-10 pl-8 sm:pl-10 last:mb-2">
						<!-- Node centered precisely on the trajectory line -->
						<div
							class="absolute left-3 sm:left-3.5 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] transition-colors"
						>
							{#if item.current}
								<span class="relative flex h-3 w-3">
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
									></span>
									<span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
								</span>
							{:else}
								<span class="h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
							{/if}
						</div>

						<!-- Timeline Content Card -->
						<div
							class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 sm:p-5 transition-colors hover:border-[var(--color-border-hover)]"
							use:card3D={{ maxRotation: 4, hoverScale: 1.01 }}
						>
							<div class="mb-2 flex flex-wrap items-center justify-between gap-2">
								<span
									class="rounded bg-[var(--color-accent-soft)] px-2 py-0.5 text-[0.68rem] font-semibold text-[var(--color-accent)] [font-family:var(--font-mono)]"
								>
									{item.period}
								</span>
								{#if item.current}
									<span
										class="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wider text-emerald-400 uppercase [font-family:var(--font-mono)]"
									>
										<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
										{m['about.experience_current']()}
									</span>
								{/if}
							</div>

							<h4 class="text-[0.98rem] font-bold text-[var(--color-text)]">
								{item.company}
							</h4>
							<p class="mb-3 text-[0.78rem] text-[var(--color-text-muted)] [font-family:var(--font-mono)]">
								{item.role}
							</p>

							<ul class="space-y-1.5 text-[0.8rem] leading-relaxed text-[var(--color-text-muted)]">
								{#each item.highlights as hl (hl)}
									<li class="relative pl-4">
										<span class="absolute left-0 text-[var(--color-accent)]">›</span>
										{hl}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right: Bento Cards -->
		<div class="flex flex-col gap-6">
			<!-- Bento 1: Microsoft Store & Core Engineering -->
			<div
				class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-border-hover)]"
				use:card3D={{ maxRotation: 5, hoverScale: 1.015 }}
				use:scrollScale={{ mode: 'scale-up', startScale: 0.92 }}
			>
				<div class="mb-3 flex items-center justify-between">
					<div class="flex items-center gap-2 text-[var(--color-accent)]">
						<Store size={18} />
						<span class="text-[0.7rem] font-bold tracking-wider uppercase [font-family:var(--font-mono)]">
							{m['about.store_highlight_title']()}
						</span>
					</div>
					<span
						class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-emerald-400 uppercase [font-family:var(--font-mono)]"
					>
						{m['about.store_highlight_badge']()}
					</span>
				</div>

				<h4 class="mb-2 text-[1.05rem] font-bold text-[var(--color-text)]">
					Acerola Reader Desktop
				</h4>
				<p class="mb-4 text-[0.82rem] leading-relaxed text-[var(--color-text-muted)]">
					{m['about.store_highlight_desc']()}
				</p>

				<div class="mb-4 flex flex-wrap gap-1.5 [font-family:var(--font-mono)] text-[0.68rem] text-[var(--color-text-faint)]">
					<span class="rounded bg-[var(--ink-surface0)] px-2 py-0.5">Rust</span>
					<span class="rounded bg-[var(--ink-surface0)] px-2 py-0.5">Tauri</span>
					<span class="rounded bg-[var(--ink-surface0)] px-2 py-0.5">Svelte 5</span>
					<span class="rounded bg-[var(--ink-surface0)] px-2 py-0.5">iroh (QUIC/P2P)</span>
				</div>

				<a
					href="https://github.com/vinicius-gpl/acerola-reader"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[var(--color-accent)] hover:underline"
				>
					<span>GitHub: acerola-reader</span>
					<ArrowUpRight size={13} />
				</a>
			</div>

			<!-- Bento 2: Formação & Localização -->
			<div
				class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-border-hover)]"
				use:card3D={{ maxRotation: 5, hoverScale: 1.015 }}
				use:scrollScale={{ mode: 'scale-up', startScale: 0.92 }}
			>
				<div class="mb-3 flex items-center gap-2 text-[var(--color-accent)]">
					<GraduationCap size={18} />
					<span class="text-[0.7rem] font-bold tracking-wider uppercase [font-family:var(--font-mono)]">
						{m['about.education_title']()}
					</span>
				</div>

				<h4 class="text-[0.95rem] font-bold text-[var(--color-text)]">
					{m['about.education_degree']()}
				</h4>
				<p class="text-[0.8rem] text-[var(--color-text-muted)] [font-family:var(--font-mono)]">
					{m['about.education_school']()}
				</p>

				<div class="mt-4 flex items-center gap-2 border-t border-[var(--color-border)] pt-3 text-[0.78rem] text-[var(--color-text-muted)]">
					<MapPin size={14} class="shrink-0 text-[var(--color-accent)]" />
					<span>{m['about.location']()}</span>
				</div>
			</div>

			<!-- Bento 3: Arsenal Técnico Agrupado -->
			<div
				class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-border-hover)]"
				use:card3D={{ maxRotation: 5, hoverScale: 1.015 }}
				use:scrollScale={{ mode: 'scale-up', startScale: 0.92 }}
			>
				<div class="mb-4 flex items-center gap-2 text-[var(--color-accent)]">
					<Layers size={18} />
					<span class="text-[0.7rem] font-bold tracking-wider uppercase [font-family:var(--font-mono)]">
						{m['about.stack_title']()}
					</span>
				</div>

				<div class="space-y-3.5">
					{#each STACK_GROUPS as group (group.category)}
						<div>
							<span class="mb-1.5 block text-[0.66rem] font-bold tracking-wider text-[var(--color-text-faint)] uppercase [font-family:var(--font-mono)]">
								{group.category}
							</span>
							<div class="flex flex-wrap gap-1.5">
								{#each group.items as item (item)}
									<span
										class="stack-item rounded-md border border-[var(--color-border)] bg-[var(--ink-surface0)] px-2.5 py-0.5 text-[0.72rem] font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]"
									>
										{item}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
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
		margin-bottom: 1.25rem;
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

	.bio-tagline {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-text-muted);
		max-width: 68ch;
	}
</style>
