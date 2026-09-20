import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectLinks from './project-links.svelte';
import type { Project } from '$lib/data/projects';

const BASE: Project = {
	id: 'test-project',
	title: 'Test Project',
	desc: { en: 'A test project.', 'pt-br': 'Um projeto de teste.' },
	tech: ['TypeScript'],
	status: 'done'
};

describe('ProjectLinks', () => {
	test('renders nothing when github, docs and demo are all absent', () => {
		const { container } = render(ProjectLinks, { props: { project: BASE } });

		expect(container.querySelectorAll('a').length).toBe(0);
	});

	test('renders a GitHub link when github is provided', async () => {
		const project = { ...BASE, github: 'https://github.com/example/test' };
		const { container } = render(ProjectLinks, { props: { project } });

		expect(container.querySelector('a[href="https://github.com/example/test"]')).not.toBeNull();
	});

	test('renders a Docs link when docs is provided', async () => {
		const project = { ...BASE, docs: 'https://docs.example.com' };
		const { container } = render(ProjectLinks, { props: { project } });

		expect(container.querySelector('a[href="https://docs.example.com"]')).not.toBeNull();
	});

	test('renders a Demo link when demo is provided', async () => {
		const project = { ...BASE, demo: 'https://example.com' };
		const { container } = render(ProjectLinks, { props: { project } });

		expect(container.querySelector('a[href="https://example.com"]')).not.toBeNull();
	});

	test('renders all three links together when all three are provided', async () => {
		const project = {
			...BASE,
			github: 'https://github.com/example/test',
			docs: 'https://docs.example.com',
			demo: 'https://example.com'
		};
		const { container } = render(ProjectLinks, { props: { project } });

		expect(container.querySelectorAll('a').length).toBe(3);
	});
});
