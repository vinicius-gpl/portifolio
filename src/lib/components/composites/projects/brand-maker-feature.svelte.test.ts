import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import BrandMakerFeature from './brand-maker-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'brand-maker')!;

describe('BrandMakerFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(BrandMakerFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }).first())
			.toBeInTheDocument();
	});

	test('renders its GitHub link', async () => {
		const { container } = render(BrandMakerFeature);

		expect(container.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
	});

	test('renders its live demo link', async () => {
		const { container } = render(BrandMakerFeature);

		expect(project.demo).toBe('https://brand-maker.vinicius-gpl.com');
		expect(container.querySelector(`a[href="${project.demo}"]`)).not.toBeNull();
	});

	test('renders its tech stack', async () => {
		const { getByText } = render(BrandMakerFeature);

		for (const tech of project.tech) {
			await expect.element(getByText(tech, { exact: true }).first()).toBeInTheDocument();
		}
	});

	test('renders the banner at its real dimensions', async () => {
		const { container } = render(BrandMakerFeature);

		expect(container.querySelector('.desktop-img')?.getAttribute('src')).toBe(
			'https://raw.githubusercontent.com/vinicius-gpl/brand-maker/main/docs/banner/banner.jpg'
		);
		expect(project.previewDimensions).toEqual({ width: 1920, height: 1080 });
	});

	test('the detail sheet starts closed', () => {
		render(BrandMakerFeature);

		expect(document.querySelector('[role="dialog"]')).toBeNull();
	});

	test('happy path: the "View details" button opens the detail sheet', async () => {
		const { container } = render(BrandMakerFeature);

		container.querySelector<HTMLButtonElement>('.view-details-btn')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});

	test('happy path: clicking the image also opens the detail sheet', async () => {
		const { container } = render(BrandMakerFeature);

		container.querySelector<HTMLButtonElement>('.image-frame')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});
});
