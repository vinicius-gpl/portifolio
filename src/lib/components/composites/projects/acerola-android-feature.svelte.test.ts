import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AcerolaAndroidFeature from './acerola-android-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'acerola-android')!;

describe('AcerolaAndroidFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(AcerolaAndroidFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }))
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
			await expect.element(getByText(tech, { exact: true })).toBeInTheDocument();
		}
	});

	test('renders the screenshot at its natural size (mobile, no forced frame)', async () => {
		const { container } = render(AcerolaAndroidFeature);

		expect(project.previewType).toBe('mobile');
		expect(container.querySelector('.mobile-img')).not.toBeNull();
		expect(container.querySelector('.desktop-img')).toBeNull();
	});
});
