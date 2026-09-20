import { afterEach, describe, expect, test, vi } from 'vitest';
import { flushSync } from 'svelte';
import { IsMobile } from './is-mobile.svelte';

function mockMatchMedia(initialMatches: boolean) {
	let matches = initialMatches;
	let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

	const mql = {
		get matches() {
			return matches;
		},
		media: '',
		addEventListener: (event: string, handler: (e: MediaQueryListEvent) => void) => {
			if (event === 'change') changeHandler = handler;
		},
		removeEventListener: () => {}
	};

	vi.stubGlobal(
		'matchMedia',
		vi.fn(() => mql)
	);

	return {
		setMatches(next: boolean) {
			matches = next;
			changeHandler?.({ matches: next } as MediaQueryListEvent);
		}
	};
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('IsMobile', () => {
	test('happy path: reports true when the viewport is narrower than the breakpoint', () => {
		mockMatchMedia(true);

		const isMobile = new IsMobile();
		flushSync();

		expect(isMobile.current).toBe(true);
	});

	test('sad path: reports false when the viewport is at or above the breakpoint', () => {
		mockMatchMedia(false);

		const isMobile = new IsMobile();
		flushSync();

		expect(isMobile.current).toBe(false);
	});

	test('updates reactively when the viewport crosses the breakpoint', () => {
		const media = mockMatchMedia(false);

		const isMobile = new IsMobile();
		flushSync();
		expect(isMobile.current).toBe(false);

		media.setMatches(true);
		flushSync();
		expect(isMobile.current).toBe(true);
	});
});
