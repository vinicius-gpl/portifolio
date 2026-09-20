import { gsap } from 'gsap';

export type SheetTransitionParams = {
	duration?: number;
};

/** Svelte `in:` transition — slides the bottom sheet up from off-screen using GSAP. */
export function sheetSlideIn(node: Element, { duration = 350 }: SheetTransitionParams = {}) {
	gsap.fromTo(
		node,
		{ yPercent: 100 },
		{ yPercent: 0, duration: duration / 1000, ease: 'power3.out' }
	);
	return { duration };
}

/** Svelte `out:` transition — slides the bottom sheet back down using GSAP. */
export function sheetSlideOut(node: Element, { duration = 250 }: SheetTransitionParams = {}) {
	gsap.to(node, { yPercent: 100, duration: duration / 1000, ease: 'power2.in' });
	return { duration };
}
