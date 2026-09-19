import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectImage from './project-image.svelte';

describe('ProjectImage', () => {
	test('renders a trigger with the thumbnail and a hover preview image', async () => {
		const { getByRole, container } = render(ProjectImage, {
			props: { src: '/img/preview.png', alt: 'Preview' }
		});

		await expect.element(getByRole('button', { name: /expand|ampliada/i })).toBeInTheDocument();

		const images = container.querySelectorAll('img[alt="Preview"]');
		expect(images.length).toBe(2);
	});

	test('renders the desktop image inside an aspect-ratio frame', async () => {
		const { container } = render(ProjectImage, {
			props: {
				src: '/img/preview.png',
				alt: 'Preview',
				type: 'desktop',
				dimensions: { width: 1920, height: 1080 }
			}
		});

		expect(container.querySelector('.desktop-img')).not.toBeNull();
		expect(container.querySelector('.mobile-img')).toBeNull();
	});

	test('renders the mobile image at its natural size (no forced frame)', async () => {
		const { container } = render(ProjectImage, {
			props: { src: '/img/preview.png', alt: 'Preview', type: 'mobile' }
		});

		expect(container.querySelector('.mobile-img')).not.toBeNull();
		expect(container.querySelector('.desktop-img')).toBeNull();
	});

	test('sad path: falls back to a default frame when no real dimensions are given', async () => {
		const { container } = render(ProjectImage, {
			props: { src: '/img/preview.png', alt: 'Preview', type: 'desktop' }
		});

		// Doesn't crash and still renders a sized desktop frame instead of an
		// unconstrained/broken image when Project.previewDimensions is missing.
		expect(container.querySelector('.desktop-img')).not.toBeNull();
	});

	test('sad path: renders gracefully with an empty src', async () => {
		const { container } = render(ProjectImage, {
			props: { src: '', alt: 'Preview', type: 'mobile' }
		});

		const img = container.querySelector<HTMLImageElement>('.mobile-img');
		expect(img).not.toBeNull();
		expect(img?.getAttribute('src')).toBe('');
	});
});
