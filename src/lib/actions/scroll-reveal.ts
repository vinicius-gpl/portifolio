import type { Action } from 'svelte/action';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const scrollReveal: Action<HTMLElement> = (node) => {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	if (!registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}

	const tween = gsap.fromTo(
		node,
		{ opacity: 0, y: 24 },
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: node,
				start: 'top 85%',
				once: true
			}
		}
	);

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
};
