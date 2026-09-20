import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from './navbar.svelte';

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

describe('Navbar', () => {
	test('renders a header element', async () => {
		mockViewport(false);
		const { container } = render(Navbar);

		expect(container.querySelector('header')).not.toBeNull();
	});

	test('renders the site name brand text', async () => {
		mockViewport(false);
		const { getByText } = render(Navbar);

		await expect.element(getByText('VINICIUS-GPL.COM', { exact: true })).toBeInTheDocument();
	});

	test('renders the language switcher with PT and EN options', async () => {
		mockViewport(false);
		const { getByText } = render(Navbar);

		await expect.element(getByText('PT', { exact: true })).toBeInTheDocument();
		await expect.element(getByText('EN', { exact: true })).toBeInTheDocument();
	});

	test('happy path (desktop): renders the top nav links and no bottom bar', async () => {
		mockViewport(false);
		const { container } = render(Navbar);

		expect(container.querySelector('.nav-links')).not.toBeNull();
		expect(container.querySelector('.bottom-nav')).toBeNull();
	});

	test('sad path (mobile): hides the top nav links and renders the bottom bar instead', async () => {
		mockViewport(true);
		const { container } = render(Navbar);

		expect(container.querySelector('.nav-links')).toBeNull();
		expect(container.querySelector('.bottom-nav')).not.toBeNull();
	});

	test('the mobile bottom bar has 4 destinations, each linking to a section', async () => {
		mockViewport(true);
		const { container } = render(Navbar);

		const items = container.querySelectorAll('.bottom-nav .bottom-nav-item');
		expect(items.length).toBe(4);

		const hrefs = [...items].map((el) => el.getAttribute('href'));
		expect(hrefs).toEqual(['#hero', '#projects', '#about', '#contact']);
	});
});
