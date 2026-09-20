<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		locales,
		localizeHref,
		getLocaleForUrl,
		setLocale,
		getLocale
	} from '$lib/paraglide/runtime';
	import Navbar from '$lib/components/sections/navbar.svelte';
	import Toast from '$lib/components/composites/toast.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as m from '$lib/paraglide/messages';

	let { children } = $props();
	const locale = $derived(browser ? (getLocaleForUrl(page.url.href) ?? getLocale()) : getLocale());

	$effect(() => {
		setLocale(locale, { reload: false });
	});

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': 'https://vinicius-gpl.com/#person',
				name: 'Vinícius GPL',
				alternateName: 'Vinícius Gabriel P. Leitão',
				jobTitle: locale === 'pt-br' ? 'Desenvolvedor Full-Stack' : 'Full-Stack Developer',
				description: m['site.description'](),
				url: 'https://vinicius-gpl.com',
				image: 'https://vinicius-gpl.com/social/vinicius-gpl.com.png',
				sameAs: ['https://github.com/vinicius-gpl'],
				knowsAbout: [
					'TypeScript',
					'JavaScript',
					'SvelteKit',
					'Svelte',
					'React',
					'Java',
					'Spring Boot',
					'Rust',
					'Kotlin',
					'Python',
					'FastAPI',
					'Go',
					'Docker',
					'RAG',
					'TailwindCSS'
				]
			},
			{
				'@type': 'WebSite',
				'@id': 'https://vinicius-gpl.com/#website',
				url: 'https://vinicius-gpl.com',
				name: m['site.name'](),
				description: m['site.description'](),
				publisher: {
					'@id': 'https://vinicius-gpl.com/#person'
				},
				inLanguage: [locale === 'pt-br' ? 'pt-BR' : 'en-US']
			},
			{
				'@type': 'ProfilePage',
				'@id': page.url.href,
				url: page.url.href,
				name: m['site.title'](),
				primaryImageOfPage: 'https://vinicius-gpl.com/social/vinicius-gpl.com.png',
				isPartOf: {
					'@id': 'https://vinicius-gpl.com/#website'
				},
				mainEntity: {
					'@id': 'https://vinicius-gpl.com/#person'
				}
			}
		]
	});

	/**
	 * Writes the JSON-LD payload as the script element's textContent.
	 * Avoids both {@html <string>} (raw-HTML injection) and interpolation
	 * inside a nested <script> tag's text (which lint tooling that scans
	 * for <script> boundaries textually fails to associate with `jsonLd`,
	 * flagging it as unused).
	 */
	function bindJsonLd(node: HTMLScriptElement, data: Record<string, unknown>) {
		node.textContent = JSON.stringify(data);
		return {
			update(newData: Record<string, unknown>) {
				node.textContent = JSON.stringify(newData);
			}
		};
	}
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
	<link rel="icon" href={favicon} />

	<!-- Core SEO Meta Tags -->
	<meta name="description" content={m['site.description']()} />
	<meta name="keywords" content={m['site.keywords']()} />
	<meta name="author" content="Vinícius GPL" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#1e1e2e" />

	<!-- Canonical & Multilingual Alternate Links -->
	<link rel="canonical" href={page.url.href} />
	{#each locales as loc (loc)}
		<link rel="alternate" hreflang={loc} href={localizeHref(page.url.pathname, { locale: loc })} />
	{/each}

	<link
		rel="alternate"
		hreflang="x-default"
		href={localizeHref(page.url.pathname, { locale: 'pt-br' })}
	/>

	<!-- Open Graph Meta Tags -->
	<meta property="og:site_name" content={m['site.name']()} />
	<meta property="og:title" content={m['site.og_title']()} />
	<meta property="og:description" content={m['site.og_description']()} />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:locale" content={locale === 'pt-br' ? 'pt_BR' : 'en_US'} />
	<meta property="og:image" content="https://vinicius-gpl.com/social/vinicius-gpl.com.png" />
	<meta
		property="og:image:secure_url"
		content="https://vinicius-gpl.com/social/vinicius-gpl.com.png"
	/>
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={m['site.og_title']()} />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m['site.og_title']()} />
	<meta name="twitter:description" content={m['site.og_description']()} />
	<meta name="twitter:image" content="https://vinicius-gpl.com/social/vinicius-gpl.com.png" />
	<meta name="twitter:image:alt" content={m['site.og_title']()} />

	<!-- JSON-LD Structured Data for Google & AI Engines.
	     Literal <script> element (not {@html}), content set via the
	     bindJsonLd action instead of text interpolation — see bindJsonLd
	     above for why. -->
	<script type="application/ld+json" use:bindJsonLd={jsonLd}></script>
</svelte:head>

{#key locale}
	<Navbar />
	{@render children()}

	<Toast />
{/key}

<div style="display:none">
	{#each locales as loc (loc)}
		<a href={localizeHref(page.url.pathname, { locale: loc })}>{loc}</a>
	{/each}
</div>
