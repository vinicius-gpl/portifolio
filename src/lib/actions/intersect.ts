import type { Action } from 'svelte/action';
import type { Section } from '$lib/store/navigation.svelte';
import { navigation } from '$lib/store/navigation.svelte';

export type IntersectOptions = {
	section: Section;
	threshold?: number;
};

export const intersect: Action<HTMLElement, IntersectOptions> = (node, options) => {
	const { threshold = 0.2, section } = options;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) navigation.setActive(section);
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
