import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import WhatsappIcon from './whatsapp-icon.svelte';

describe('WhatsappIcon', () => {
	test('renders an svg element', async () => {
		const { container } = render(WhatsappIcon);

		expect(container.querySelector('svg')).not.toBeNull();
	});

	test('applies the size prop to width and height', async () => {
		const { container } = render(WhatsappIcon, { props: { size: 32 } });

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('32');
		expect(svg?.getAttribute('height')).toBe('32');
	});

	test('defaults to size 24 and the WhatsApp green fill when no props are given', async () => {
		const { container } = render(WhatsappIcon);

		const svg = container.querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('24');
		expect(svg?.getAttribute('height')).toBe('24');
		expect(svg?.getAttribute('fill')).toBe('#25D366');
	});

	test('applies a custom fill color when provided', async () => {
		const { container } = render(WhatsappIcon, { props: { fill: '#ffffff' } });

		expect(container.querySelector('svg')?.getAttribute('fill')).toBe('#ffffff');
	});

	test('is aria-hidden by default', async () => {
		const { container } = render(WhatsappIcon);

		expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
	});
});
