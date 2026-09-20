import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ContactForm from './contact-form.svelte';
import { toast } from '$lib/store/toast.svelte';

function lastToast() {
	return toast.items.at(-1);
}

function setValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
	el.value = value;
	el.dispatchEvent(new Event('input', { bubbles: true }));
}

function fillValidForm(container: HTMLElement) {
	setValue(container.querySelector('#contact-name')!, 'Ana');
	setValue(container.querySelector('#contact-email')!, 'ana@example.com');
	setValue(container.querySelector('#contact-message')!, 'Hello there');
}

beforeEach(() => {
	for (const item of [...toast.items]) toast.dismiss(item.id);
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('ContactForm', () => {
	test('renders name, email, message and a submit button', () => {
		const { container } = render(ContactForm);

		expect(container.querySelector('#contact-name')).not.toBeNull();
		expect(container.querySelector('#contact-email')).not.toBeNull();
		expect(container.querySelector('#contact-message')).not.toBeNull();
		expect(container.querySelector('button[type="submit"]')).not.toBeNull();
	});

	test('happy path: submits successfully, shows a success toast and clears the form', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(null, { status: 200 }))
		);
		const { container } = render(ContactForm);
		fillValidForm(container);

		container.querySelector('form')!.requestSubmit();

		await vi.waitFor(() => expect(lastToast()?.variant).toBe('success'));
		expect(container.querySelector<HTMLInputElement>('#contact-name')!.value).toBe('');
	});

	test('sad path: rejects submission with empty required fields without calling the API', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		const { container } = render(ContactForm);

		container.querySelector('form')!.requestSubmit();

		await vi.waitFor(() => expect(lastToast()?.variant).toBe('error'));
		expect(fetchMock).not.toHaveBeenCalled();
	});

	test('sad path: rejects an invalid email format without calling the API', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		const { container } = render(ContactForm);

		setValue(container.querySelector('#contact-name')!, 'Ana');
		const email = container.querySelector<HTMLInputElement>('#contact-email')!;
		setValue(email, 'not-an-email');
		email.dispatchEvent(new Event('blur', { bubbles: true }));
		setValue(container.querySelector('#contact-message')!, 'Hello there');

		await vi.waitFor(() => expect(container.querySelector('.field-error')).not.toBeNull());

		container.querySelector('form')!.requestSubmit();

		await vi.waitFor(() => expect(lastToast()?.variant).toBe('error'));
		expect(fetchMock).not.toHaveBeenCalled();
	});

	test('sad path: shows an error toast and keeps the form filled when the API call fails', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(JSON.stringify({ error: 'boom' }), { status: 500 }))
		);
		const { container } = render(ContactForm);
		fillValidForm(container);

		container.querySelector('form')!.requestSubmit();

		await vi.waitFor(() => expect(lastToast()?.variant).toBe('error'));
		expect(container.querySelector<HTMLInputElement>('#contact-name')!.value).toBe('Ana');
	});

	test('sad path: rejects an attachment larger than 5MB without attaching it', async () => {
		const { container } = render(ContactForm);

		const input = container.querySelector<HTMLInputElement>('#contact-file')!;
		const bigFile = new File([new Uint8Array(6 * 1024 * 1024)], 'big.pdf', {
			type: 'application/pdf'
		});
		const dt = new DataTransfer();
		dt.items.add(bigFile);
		input.files = dt.files;
		input.dispatchEvent(new Event('change', { bubbles: true }));

		await vi.waitFor(() => expect(lastToast()?.variant).toBe('error'));
		expect(container.querySelector('.file-pill')).toBeNull();
	});

	test('happy path: attaches a valid file and allows removing it', async () => {
		const { container } = render(ContactForm);

		const input = container.querySelector<HTMLInputElement>('#contact-file')!;
		const file = new File(['hello'], 'resume.pdf', { type: 'application/pdf' });
		const dt = new DataTransfer();
		dt.items.add(file);
		input.files = dt.files;
		input.dispatchEvent(new Event('change', { bubbles: true }));

		await vi.waitFor(() => expect(container.querySelector('.file-pill')).not.toBeNull());
		expect(container.querySelector('.file-name')?.textContent).toBe('resume.pdf');

		container.querySelector<HTMLButtonElement>('.btn-remove-file')!.click();
		await vi.waitFor(() => expect(container.querySelector('.file-pill')).toBeNull());
	});
});
