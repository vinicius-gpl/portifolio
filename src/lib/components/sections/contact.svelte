<script lang="ts">
	import { Mail, Copy, Check, ArrowUpRight, Download } from 'lucide-svelte';
	import GithubIcon from '$lib/components/primitives/github-icon.svelte';
	import WhatsappIcon from '$lib/components/primitives/whatsapp-icon.svelte';
	import { toast } from '$lib/store/toast.svelte';
	import ContactForm from '$lib/components/composites/contact-form.svelte';
	import { intersect } from '$lib/actions/intersect';
	import { scrollReveal } from '$lib/actions/scroll-reveal';
	import { RESUME_URL } from '$lib/data/resume';
	import * as m from '$lib/paraglide/messages';

	let copied = $state(false);

	async function copyEmail() {
		const targetEmail = 'contact@vinicius-gpl.com';
		try {
			await navigator.clipboard.writeText(targetEmail);
			copied = true;
			toast.show(m['contact.email_copied'](), 'success');
			setTimeout(() => {
				copied = false;
			}, 2500);
		} catch {
			copied = true;
			setTimeout(() => (copied = false), 2500);
		}
	}
</script>

<section
	id="contact"
	class="section-inner mx-auto max-w-5xl px-6 py-20 sm:py-28"
	use:intersect={{ section: 'contact', threshold: 0.2 }}
	use:scrollReveal
>
	<h2 class="section-heading">
		<span class="num">03.</span>
		{m['contact.title']()}
		<span class="rule"></span>
	</h2>

	<div class="contact-grid">
		<div class="contact-info">
			<div class="status-pill">
				<span class="dot"></span>
				<span>{m['contact.status_available']()}</span>
			</div>

			<p class="subtitle">{m['contact.subtitle']()}</p>

			<div class="info-cards">
				<div class="info-card">
					<div class="info-main">
						<Mail size={16} />
						<div class="info-text">
							<span class="info-label">{m['contact.email']()}</span>
							<a href="mailto:contact@vinicius-gpl.com" class="info-value">
								contact@vinicius-gpl.com
							</a>
						</div>
					</div>
					<button
						type="button"
						onclick={copyEmail}
						class="btn-icon"
						title={m['contact.copy_email']()}
						aria-label={m['contact.copy_email']()}
					>
						{#if copied}
							<Check size={14} />
						{:else}
							<Copy size={14} />
						{/if}
					</button>
				</div>

				<a
					href="https://github.com/vinicius-gpl"
					target="_blank"
					rel="noopener noreferrer"
					class="info-card"
				>
					<div class="info-main">
						<GithubIcon size={16} />
						<div class="info-text">
							<span class="info-label">GitHub</span>
							<span class="info-value">@vinicius-gpl</span>
						</div>
					</div>
					<ArrowUpRight size={14} class="arrow" />
				</a>

				<a
					href="https://wa.me/5562992952214?text={encodeURIComponent(m['contact.whatsapp_text']())}"
					target="_blank"
					rel="noopener noreferrer"
					class="info-card"
				>
					<div class="info-main">
						<WhatsappIcon size={16} />
						<div class="info-text">
							<span class="info-label">WhatsApp</span>
							<span class="info-value">+55 62 99295-2214</span>
						</div>
					</div>
					<ArrowUpRight size={14} class="arrow" />
				</a>

				<a href={RESUME_URL} target="_blank" rel="noopener noreferrer" class="info-card">
					<div class="info-main">
						<Download size={16} />
						<div class="info-text">
							<span class="info-label">{m['resume.download']()}</span>
							<span class="info-value">PDF</span>
						</div>
					</div>
					<ArrowUpRight size={14} class="arrow" />
				</a>
			</div>
		</div>

		<div class="contact-form-wrap">
			<ContactForm />
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
		margin-bottom: 2.5rem;
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

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
	}

	@media (min-width: 900px) {
		.contact-grid {
			grid-template-columns: 5fr 7fr;
			align-items: start;
		}
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-status-done);
		margin-bottom: 1rem;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-status-done);
	}

	.subtitle {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-text-muted);
		max-width: 42ch;
		margin-bottom: 1.75rem;
	}

	.info-cards {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.info-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.9rem 1rem;
		border-radius: 10px;
		border: 1px solid var(--color-border);
		background: var(--color-bg-elevated);
		color: var(--color-text);
		text-decoration: none;
		transition: border-color 0.15s;
	}
	.info-card:hover {
		border-color: var(--color-border-hover);
	}

	.info-main {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
	}

	.info-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.info-label {
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-text-faint);
	}

	.info-value {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-text);
		text-decoration: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.btn-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		flex-shrink: 0;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.btn-icon:hover {
		border-color: var(--color-border-hover);
	}

	:global(.info-card .arrow) {
		color: var(--color-text-faint);
		flex-shrink: 0;
		transition: color 0.15s;
	}
	.info-card:hover :global(.arrow) {
		color: var(--color-accent);
	}

	.contact-form-wrap {
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid var(--color-border);
		background: var(--color-bg-elevated);
	}
</style>
