import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AcerolaTicketFeature from './acerola-ticket-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'acerola-ticket')!;

describe('AcerolaTicketFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(AcerolaTicketFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }).first())
			.toBeInTheDocument();
	});

	test('renders its GitHub link', async () => {
		const { container } = render(AcerolaTicketFeature);

		expect(container.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
	});

	test('has no docs link (acerola-ticket has no docs site)', async () => {
		const { container } = render(AcerolaTicketFeature);

		expect(project.docs).toBeUndefined();
		const links = [...container.querySelectorAll('a')];
		expect(links.some((a) => a.textContent?.includes('Docs'))).toBe(false);
	});

	test('renders its tech stack', async () => {
		const { getByText } = render(AcerolaTicketFeature);

		for (const tech of project.tech) {
			await expect.element(getByText(tech, { exact: true }).first()).toBeInTheDocument();
		}
	});

	test('renders the requested banner at its real dimensions', async () => {
		const { container } = render(AcerolaTicketFeature);

		expect(container.querySelector('.desktop-img')?.getAttribute('src')).toBe(
			'https://raw.githubusercontent.com/vinicius-gpl/acerola-ticket/main/docs/brag/brag.jpg'
		);
		expect(project.previewDimensions).toEqual({ width: 1920, height: 1080 });
	});

	test('the detail sheet starts closed', () => {
		render(AcerolaTicketFeature);

		expect(document.querySelector('[role="dialog"]')).toBeNull();
	});

	test('happy path: the "View details" button opens the detail sheet', async () => {
		const { container } = render(AcerolaTicketFeature);

		container.querySelector<HTMLButtonElement>('.view-details-btn')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});

	test('happy path: clicking the image also opens the detail sheet', async () => {
		const { container } = render(AcerolaTicketFeature);

		container.querySelector<HTMLButtonElement>('.image-frame')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});
});
