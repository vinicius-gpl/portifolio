import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AcerolaRagFeature from './acerola-rag-feature.svelte';
import { PROJECTS } from '$lib/data/projects';

const project = PROJECTS.find((p) => p.id === 'acerola-rag')!;

describe('AcerolaRagFeature', () => {
	test('renders the project title as a heading', async () => {
		const { getByRole } = render(AcerolaRagFeature);

		await expect
			.element(getByRole('heading', { level: 3, name: project.title }))
			.toBeInTheDocument();
	});

	test('renders its GitHub link', async () => {
		const { container } = render(AcerolaRagFeature);

		expect(container.querySelector(`a[href="${project.github}"]`)).not.toBeNull();
	});

	test('has no docs link (acerola-rag has no docs site)', async () => {
		const { container } = render(AcerolaRagFeature);

		expect(project.docs).toBeUndefined();
		const links = [...container.querySelectorAll('a')];
		expect(links.some((a) => a.textContent?.includes('Docs'))).toBe(false);
	});

	test('renders its tech stack', async () => {
		const { getByText } = render(AcerolaRagFeature);

		for (const tech of project.tech) {
			await expect.element(getByText(tech, { exact: true })).toBeInTheDocument();
		}
	});

	test('sizes the image from its real (very wide) dimensions', async () => {
		const { container } = render(AcerolaRagFeature);

		expect(container.querySelector('.desktop-img')).not.toBeNull();
		expect(project.previewDimensions).toEqual({ width: 1339, height: 601 });
	});
});
