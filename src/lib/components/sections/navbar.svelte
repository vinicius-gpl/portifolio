<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import { Home, FolderOpen, User, Mail } from 'lucide-svelte';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { navigation } from '$lib/store/navigation.svelte';
	import type { Section } from '$lib/store/navigation.svelte';
	import * as m from '$lib/paraglide/messages';

	const isMobile = new IsMobile();

	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 12;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const NAV_ITEMS: { id: Section; label: string }[] = $derived([
		{ id: 'projects', label: m['nav.projects']() },
		{ id: 'about', label: m['nav.about']() },
		{ id: 'contact', label: m['nav.contact']() }
	]);

	const BOTTOM_NAV_ITEMS = $derived([
		{ id: 'hero' as Section, label: m['nav.home'](), Icon: Home },
		{ id: 'projects' as Section, label: m['nav.projects'](), Icon: FolderOpen },
		{ id: 'about' as Section, label: m['nav.about'](), Icon: User },
		{ id: 'contact' as Section, label: m['nav.contact'](), Icon: Mail }
	]);

	function select(id: Section) {
		navigation.click(id);
	}
</script>

<header class="navbar" class:scrolled aria-label={m['nav.navigation']()}>
	<nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
		<div class="flex flex-1 items-center justify-start">
			<a href="#hero" onclick={() => select('hero')} class="brand">
				{m['site.name']()}
			</a>
		</div>

		{#if !isMobile.current}
			<ul class="nav-links">
				{#each NAV_ITEMS as item, i (item.id)}
					<li>
						<a
							href="#{item.id}"
							onclick={() => select(item.id)}
							class="nav-link"
							class:active={navigation.active === item.id}
						>
							<span class="nav-index">{String(i + 1).padStart(2, '0')}.</span>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="flex flex-1 items-center justify-end">
			<div class="lang-switcher">
				{#each locales as locale (locale)}
					<a
						href={localizeHref(page.url.pathname, { locale })}
						class="lang-btn"
						class:active={getLocale() === locale}
						aria-label="Switch language to {locale === 'pt-br' ? 'Portuguese' : 'English'}"
					>
						{locale === 'pt-br' ? 'PT' : 'EN'}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>

{#if isMobile.current}
	<!-- Android-style bottom navigation bar -->
	<nav class="bottom-nav" aria-label={m['nav.navigation']()}>
		{#each BOTTOM_NAV_ITEMS as item (item.id)}
			{@const active = navigation.active === item.id}
			<a
				href="#{item.id}"
				onclick={() => select(item.id)}
				class="bottom-nav-item"
				aria-current={active ? 'page' : undefined}
			>
				<span class="bottom-nav-icon" class:active>
					<item.Icon size={20} strokeWidth={active ? 2.4 : 2} />
				</span>
				<span class="bottom-nav-label" class:active>{item.label}</span>
			</a>
		{/each}
	</nav>
{/if}

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.navbar.scrolled {
		background: var(--color-bg-header);
		border-bottom: 1px solid var(--color-border);
	}

	.brand {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		text-decoration: none;
		font-family: var(--font-mono);
		transition: color 0.2s;
	}
	.brand:hover {
		color: var(--color-accent);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
	}

	.nav-link {
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.nav-link:hover,
	.nav-link.active {
		color: var(--color-text);
	}

	.nav-index {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-accent);
	}

	.lang-switcher {
		display: flex;
		gap: 2px;
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		padding: 2px;
	}

	.lang-btn {
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 600;
		text-decoration: none;
		color: var(--color-text-faint);
		transition:
			color 0.2s,
			background 0.2s;
	}
	.lang-btn:hover {
		color: var(--color-text);
	}
	.lang-btn.active {
		color: var(--color-bg);
		background: var(--color-accent);
	}

	/* Android Material-style bottom navigation bar */
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: calc(64px + env(safe-area-inset-bottom));
		padding-bottom: env(safe-area-inset-bottom);
		background: var(--color-bg-header);
		border-top: 1px solid var(--color-border);
	}

	.bottom-nav-item {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		height: 100%;
		text-decoration: none;
	}

	.bottom-nav-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 28px;
		border-radius: 9999px;
		color: var(--color-text-faint);
		transition:
			background 0.2s,
			color 0.2s;
	}
	.bottom-nav-icon.active {
		background: var(--color-accent-soft);
		color: var(--color-accent);
	}

	.bottom-nav-label {
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--color-text-faint);
	}
	.bottom-nav-label.active {
		color: var(--color-text);
	}
</style>
