import { afterEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Toast from './toast.svelte';
import { toast } from '$lib/store/toast.svelte';

afterEach(() => {
	for (const item of [...toast.items]) toast.dismiss(item.id);
});

describe('Toast', () => {
	test('renders the live region container', async () => {
		const { container } = render(Toast);

		expect(container.querySelector('[aria-live="polite"]')).not.toBeNull();
	});

	test('renders no toast items when the store is empty', async () => {
		const { container } = render(Toast);

		expect(container.querySelector('[role="alert"]')).toBeNull();
	});

	test('happy path: renders a success toast with its message', async () => {
		const { container, getByRole } = render(Toast);

		toast.show('Email sent!', 'success');

		await expect.element(getByRole('alert')).toBeInTheDocument();
		const alertEl = container.querySelector('[role="alert"]');
		expect(alertEl?.textContent).toContain('Email sent!');
		expect(alertEl?.className).toContain('border-green-800/40');
	});

	test('sad path: renders an error toast styled differently from success', async () => {
		const { container, getByRole } = render(Toast);

		toast.show('Something went wrong', 'error');

		await expect.element(getByRole('alert')).toBeInTheDocument();
		const alertEl = container.querySelector('[role="alert"]');
		expect(alertEl?.textContent).toContain('Something went wrong');
		expect(alertEl?.className).toContain('border-red-800/40');
	});

	test('dismissing a toast removes it from the DOM', async () => {
		const { container } = render(Toast);

		toast.show('Bye', 'success');
		await new Promise((r) => setTimeout(r, 0));
		expect(container.querySelector('[role="alert"]')).not.toBeNull();

		container.querySelector<HTMLButtonElement>('[role="alert"] button')!.click();

		await new Promise((r) => setTimeout(r, 200));
		expect(container.querySelector('[role="alert"]')).toBeNull();
	});
});
