import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AuthServerFeature from './auth-server-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'auth-server')!;

describe('AuthServerFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(AuthServerFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }).first())
			.toBeInTheDocument();
	});

	test('renders its GitHub link', async () => {
		const { container } = render(AuthServerFeature);

		expect(container.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
	});

	test('has no docs link (auth-server has no docs site)', async () => {
		const { container } = render(AuthServerFeature);

		expect(project.docs).toBeUndefined();
		const links = [...container.querySelectorAll('a')];
		expect(links.some((a) => a.textContent?.includes('Docs'))).toBe(false);
	});

	test('renders its tech stack', async () => {
		const { getByText } = render(AuthServerFeature);

		for (const tech of project.tech) {
			await expect.element(getByText(tech, { exact: true }).first()).toBeInTheDocument();
		}
	});

	test('sizes the image as a desktop screenshot using its real dimensions', async () => {
		const { container } = render(AuthServerFeature);

		expect(container.querySelector('.desktop-img')).not.toBeNull();
		expect(project.previewDimensions).toEqual({ width: 1517, height: 1284 });
	});

	test('the detail sheet starts closed', () => {
		render(AuthServerFeature);

		expect(document.querySelector('[role="dialog"]')).toBeNull();
	});

	test('happy path: the "View details" button opens the detail sheet', async () => {
		const { container } = render(AuthServerFeature);

		container.querySelector<HTMLButtonElement>('.view-details-btn')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});

	test('happy path: clicking the image also opens the detail sheet', async () => {
		const { container } = render(AuthServerFeature);

		container.querySelector<HTMLButtonElement>('.image-frame')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});
});
