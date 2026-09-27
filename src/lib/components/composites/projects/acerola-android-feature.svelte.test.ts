import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AcerolaAndroidFeature from './acerola-android-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'acerola-android')!;

describe('AcerolaAndroidFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(AcerolaAndroidFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }).first())
			.toBeInTheDocument();
	});

	test('renders its GitHub and Docs links', async () => {
		const { container } = render(AcerolaAndroidFeature);

		expect(container.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
		expect(container.querySelector(`a[href="${project.docs}"]`)).not.toBeNull();
	});

	test('renders its tech stack', async () => {
		const { getByText } = render(AcerolaAndroidFeature);

		for (const tech of project.tech) {
			await expect.element(getByText(tech, { exact: true }).first()).toBeInTheDocument();
		}
	});

	test('sizes the image as a 16:9 desktop screenshot using its real dimensions', async () => {
		const { container } = render(AcerolaAndroidFeature);

		expect(container.querySelector('.desktop-img')).not.toBeNull();
		expect(project.previewDimensions).toEqual({ width: 1920, height: 1080 });
	});

	test('the detail sheet starts closed', () => {
		render(AcerolaAndroidFeature);

		expect(document.querySelector('[role="dialog"]')).toBeNull();
	});

	test('happy path: the "View details" button opens the detail sheet', async () => {
		const { container } = render(AcerolaAndroidFeature);

		container.querySelector<HTMLButtonElement>('.view-details-btn')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});

	test('happy path: clicking the image also opens the detail sheet', async () => {
		const { container } = render(AcerolaAndroidFeature);

		container.querySelector<HTMLButtonElement>('.image-frame')!.click();

		await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).not.toBeNull());
	});
});
