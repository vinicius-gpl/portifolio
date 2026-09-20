import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectDetailSheet from './project-detail-sheet.svelte';
import { PROJECTS } from '$lib/data/projects';

const authServer = PROJECTS.find((p) => p.id === 'auth-server')!;
const relay = PROJECTS.find((p) => p.id === 'acerola-relay')!;

function mockViewport(isMobile: boolean) {
	vi.stubGlobal(
		'matchMedia',
		vi.fn((query: string) => ({
			matches: isMobile,
			media: query,
			addEventListener: () => {},
			removeEventListener: () => {}
		}))
	);
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('ProjectDetailSheet', () => {
	test('sad path (desktop): renders nothing in the DOM when closed', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: false }
		});

		expect(document.querySelector('[role="dialog"]')).toBeNull();
	});

	test('happy path (desktop): opens as a centered dialog with the project title', async () => {
		mockViewport(false);
		const { getByRole } = render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		const dialog = getByRole('dialog');
		await expect.element(dialog).toBeInTheDocument();
		await expect.element(getByRole('heading', { name: authServer.title })).toBeInTheDocument();
	});

	test('happy path (desktop): renders the highlights and image gallery', async () => {
		mockViewport(false);
		const { getByText } = render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		await expect
			.element(getByText(authServer.highlights![0].title['pt-br'], { exact: true }))
			.toBeInTheDocument();
		// Dialog content renders into a portal outside the render container, so
		// query the document instead of the scoped `container`.
		expect(document.querySelectorAll('.gallery-thumb').length).toBe(authServer.images!.length);
	});

	test('happy path (mobile): opens as a bottom sheet instead of a centered dialog', async () => {
		mockViewport(true);
		const { getByRole } = render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		await expect.element(getByRole('heading', { name: authServer.title })).toBeInTheDocument();
	});

	test('sad path: a project without images or highlights renders without crashing', async () => {
		mockViewport(false);
		expect(relay.images).toBeUndefined();

		const { getByRole } = render(ProjectDetailSheet, {
			props: { project: relay, open: true }
		});

		await expect.element(getByRole('heading', { name: relay.title })).toBeInTheDocument();
		expect(document.querySelectorAll('.gallery-thumb').length).toBe(0);
	});

	test('happy path: clicking a gallery thumbnail opens it fullscreen', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		expect(document.querySelector('.image-lightbox')).toBeNull();

		const thumb = document.querySelector<HTMLButtonElement>('.gallery-thumb')!;
		thumb.click();

		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).not.toBeNull());
		const lightboxImg = document.querySelector<HTMLImageElement>('.image-lightbox img')!;
		expect(lightboxImg.src).toBe(authServer.images![0].url);
	});

	test('happy path: clicking the lightbox backdrop closes it again', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		document.querySelector<HTMLButtonElement>('.gallery-thumb')!.click();
		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).not.toBeNull());

		document.querySelector<HTMLDivElement>('.image-lightbox-overlay')!.click();

		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).toBeNull());
	});

	test('happy path: clicking outside the image on the lightbox container closes it', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		document.querySelector<HTMLButtonElement>('.gallery-thumb')!.click();
		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).not.toBeNull());

		document.querySelector<HTMLDivElement>('.image-lightbox')!.click();

		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).toBeNull());
	});

	test('sad path: clicking the lightbox image itself does not close it', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		document.querySelector<HTMLButtonElement>('.gallery-thumb')!.click();
		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).not.toBeNull());

		document.querySelector<HTMLImageElement>('.image-lightbox img')!.click();

		// Still open — clicking the image should not bubble up to the backdrop.
		expect(document.querySelector('.image-lightbox')).not.toBeNull();
	});

	test('happy path: closing the lightbox (close button) leaves the underlying dialog open', async () => {
		mockViewport(false);
		render(ProjectDetailSheet, {
			props: { project: authServer, open: true }
		});

		document.querySelector<HTMLButtonElement>('.gallery-thumb')!.click();
		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).not.toBeNull());

		document.querySelector<HTMLButtonElement>('.image-lightbox button')!.click();

		await vi.waitFor(() => expect(document.querySelector('.image-lightbox')).toBeNull());
		// The gallery thumbnail is only rendered while the parent dialog is open.
		expect(document.querySelector('.gallery-thumb')).not.toBeNull();
	});
});
