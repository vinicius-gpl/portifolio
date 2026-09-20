import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Projects from './projects.svelte';
import { PROJECTS } from '$lib/data/projects';

describe('Projects', () => {
	test('renders the section with id="projects"', async () => {
		const { container } = render(Projects, { props: { projects: PROJECTS } });

		expect(container.querySelector('#projects')).not.toBeNull();
	});

	test('renders each dedicated featured project component', async () => {
		const { getByText } = render(Projects, { props: { projects: PROJECTS } });

		for (const id of ['auth-server', 'acerola-android', 'acerola-desktop', 'acerola-rag']) {
			const project = PROJECTS.find((p) => p.id === id)!;
			await expect.element(getByText(project.title, { exact: true }).first()).toBeInTheDocument();
		}
	});

	test('renders a compact card only for projects without a preview image', async () => {
		const { getByText, container } = render(Projects, { props: { projects: PROJECTS } });

		const ideaProjects = PROJECTS.filter((p) => !p.preview);
		expect(ideaProjects.length).toBeGreaterThan(0);

		const cards = container.querySelectorAll('.card');
		expect(cards.length).toBe(ideaProjects.length);

		for (const project of ideaProjects) {
			await expect.element(getByText(project.title, { exact: true }).first()).toBeInTheDocument();
		}
	});
});
