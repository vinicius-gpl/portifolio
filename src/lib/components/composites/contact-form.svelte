<script lang="ts">
	import { Send, User, Mail, MessageSquare, Loader2, Paperclip, FileText, X } from 'lucide-svelte';
	import { toast } from '$lib/store/toast.svelte';
	import { sendEmail } from '$lib/service/email.service';
	import * as m from '$lib/paraglide/messages';

	let { onSuccess }: { onSuccess?: () => void } = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let loading = $state(false);
	let emailTouched = $state(false);

	let selectedFile = $state<File | null>(null);
	let fileBase64 = $state<string | null>(null);
	let fileReading = $state(false);

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isEmailValid = $derived(email === '' || emailPattern.test(email));

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !message.trim()) {
			toast.show(m['toast.error'](), 'error');
			return;
		}
		if (!emailPattern.test(email)) {
			toast.show(m['contact.invalid_email'](), 'error');
			return;
		}

		loading = true;

		const attachment =
			selectedFile && fileBase64
				? {
						filename: selectedFile.name,
						content: fileBase64
					}
				: null;

		const result = await sendEmail({ name, email, message, attachment });
		loading = false;

		if (result.ok) {
			toast.show(m['toast.success'](), 'success');
			name = '';
			email = '';
			message = '';
			emailTouched = false;
			selectedFile = null;
			fileBase64 = null;
			onSuccess?.();
		} else {
			toast.show(m['toast.error'](), 'error');
		}
	}

	function handleInputKeyDown(e: KeyboardEvent) {
		e.stopPropagation();

		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			const form = (e.target as HTMLElement)?.closest('form');
			if (form) form.requestSubmit();
		}
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return;

		const file = input.files[0];
		if (file.size > 5 * 1024 * 1024) {
			toast.show(m['contact.file_too_large'](), 'error');
			input.value = '';
			return;
		}

		fileReading = true;
		try {
			const base64 = await fileToBase64(file);
			selectedFile = file;
			fileBase64 = base64;
		} catch {
			toast.show(m['contact.file_read_error'](), 'error');
		} finally {
			fileReading = false;
		}
	}

	function removeFile() {
		selectedFile = null;
		fileBase64 = null;
	}

	function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				const base64 = result.includes(',') ? result.split(',')[1] : result;
				resolve(base64);
			};
			reader.onerror = (err) => reject(err);
			reader.readAsDataURL(file);
		});
	}
</script>

<form onsubmit={handleSubmit} novalidate aria-label="Contact" class="form flex flex-col gap-4">
	<!-- Field: Name -->
	<div class="field">
		<label for="contact-name" class="field-label flex items-center gap-1.5">
			<User size={12} />
			<span>{m['contact.name']()}</span>
		</label>
		<input
			id="contact-name"
			type="text"
			bind:value={name}
			onkeydown={handleInputKeyDown}
			placeholder={m['contact.name_placeholder']()}
			required
			autocomplete="name"
			class="field-input"
		/>
	</div>

	<!-- Field: Email -->
	<div class="field">
		<label for="contact-email" class="field-label flex items-center gap-1.5">
			<Mail size={12} />
			<span>{m['contact.email']()}</span>
		</label>
		<input
			id="contact-email"
			type="email"
			bind:value={email}
			onblur={() => (emailTouched = true)}
			onkeydown={handleInputKeyDown}
			placeholder={m['contact.email_placeholder']()}
			required
			autocomplete="email"
			class="field-input"
			class:input-invalid={emailTouched && !isEmailValid}
		/>
		{#if emailTouched && !isEmailValid}
			<span class="field-error">{m['contact.invalid_email']()}</span>
		{/if}
	</div>

	<!-- Field: Message -->
	<div class="field">
		<div class="flex items-center justify-between">
			<label for="contact-message" class="field-label flex items-center gap-1.5">
				<MessageSquare size={12} />
				<span>{m['contact.message']()}</span>
			</label>
			<span class="counter">{message.length}/1000</span>
		</div>
		<textarea
			id="contact-message"
			bind:value={message}
			onkeydown={handleInputKeyDown}
			placeholder={m['contact.message_placeholder']()}
			required
			rows="4"
			maxlength={1000}
			class="field-input resize-none"
		></textarea>
	</div>

	<!-- Field: File Attachment -->
	<div class="field">
		<label for="contact-file" class="field-label flex items-center gap-1.5">
			<Paperclip size={12} />
			<span>{m['contact.attachment']()}</span>
		</label>

		{#if selectedFile}
			<div class="file-pill">
				<div class="flex min-w-0 items-center gap-2">
					<FileText size={14} class="shrink-0" style="color: var(--color-accent)" />
					<span class="file-name truncate">{selectedFile.name}</span>
					<span class="file-size shrink-0">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
				</div>
				<button
					type="button"
					onclick={removeFile}
					class="btn-remove-file"
					title={m['contact.remove_attachment']()}
					aria-label={m['contact.remove_attachment']()}
				>
					<X size={13} />
				</button>
			</div>
		{:else}
			<label for="contact-file" class="file-dropzone">
				<Paperclip size={14} />
				<span class="dropzone-text">{m['contact.attachment_placeholder']()}</span>
				<input
					id="contact-file"
					type="file"
					onchange={handleFileSelect}
					accept=".pdf,.png,.jpg,.jpeg,.docx,.doc,.zip,.txt"
					class="sr-only"
				/>
			</label>
		{/if}
	</div>

	<!-- Footer actions: Shortcut hint & Submit Button -->
	<div
		class="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
	>
		<span class="shortcut-hint hidden sm:inline-block">
			{m['contact.shortcut_hint']()}
		</span>

		<button type="submit" disabled={loading || fileReading} class="btn-send">
			{#if loading || fileReading}
				<Loader2 size={15} class="animate-spin" />
				<span>{m['contact.sending']()}</span>
			{:else}
				<span>{m['contact.send']()}</span>
				<Send size={14} class="send-icon transition-transform duration-200" />
			{/if}
		</button>
	</div>
</form>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field-label {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		font-weight: 700;
	}

	.field-input {
		width: 100%;
		padding: 0.75rem 1rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		color: var(--color-text);
		font-size: 0.88rem;
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s;
	}
	.field-input::placeholder {
		color: var(--color-text-faint);
	}
	.field-input:focus {
		border-color: var(--color-accent);
	}
	.field-input.input-invalid {
		border-color: var(--color-status-in-progress);
	}

	.counter {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text-faint);
	}

	.field-error {
		font-size: 0.72rem;
		color: var(--ctp-red);
	}

	.file-dropzone {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.65rem 0.9rem;
		border-radius: 10px;
		background: var(--color-bg);
		border: 1px dashed var(--color-border);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.file-dropzone:hover {
		border-color: var(--color-border-hover);
	}

	.dropzone-text {
		font-size: 0.78rem;
	}

	.file-pill {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.55rem 0.85rem;
		border-radius: 10px;
		background: var(--color-accent-soft);
		border: 1px solid var(--color-accent);
	}

	.file-name {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.file-size {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text-faint);
	}

	.btn-remove-file {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: transparent;
		color: var(--color-text);
		border: 1px solid var(--color-border);
		cursor: pointer;
		transition: border-color 0.15s;
	}
	.btn-remove-file:hover {
		border-color: var(--ctp-red);
		color: var(--ctp-red);
	}

	.shortcut-hint {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--color-text-faint);
	}

	.btn-send {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0.75rem 1.6rem;
		border-radius: 10px;
		background: var(--color-accent);
		color: var(--color-bg);
		font-size: 0.88rem;
		font-weight: 700;
		font-family: inherit;
		border: none;
		cursor: pointer;
		transition: opacity 0.15s;
	}
	.btn-send:hover:not(:disabled) {
		opacity: 0.85;
	}
	.btn-send:hover:not(:disabled) :global(.send-icon) {
		transform: translateX(2px);
	}
	.btn-send:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
