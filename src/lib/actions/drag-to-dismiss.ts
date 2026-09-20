import { gsap } from 'gsap';

export type DragToDismissOptions = {
	onDismiss: () => void;
	/** Only pointer-downs that start inside an element matching this selector begin a drag. */
	handleSelector?: string;
};

/**
 * Compose-style bottom sheet drag: press the handle, drag down, release past a
 * distance/velocity threshold to dismiss — otherwise the sheet springs back.
 */
export function dragToDismiss(node: HTMLElement, options: DragToDismissOptions) {
	let { onDismiss, handleSelector = '[data-drag-handle]' } = options;
	let dragging = false;
	let startY = 0;
	let currentY = 0;
	let startTime = 0;

	function onPointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest(handleSelector)) return;
		dragging = true;
		startY = e.clientY;
		currentY = 0;
		startTime = performance.now();
		try {
			node.setPointerCapture(e.pointerId);
		} catch {
			// Pointer capture can fail for synthetic/already-released pointers —
			// dragging still works via the bubbled move/up listeners either way.
		}
		gsap.killTweensOf(node);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		currentY = Math.max(0, e.clientY - startY);
		gsap.set(node, { y: currentY });
	}

	function onPointerUp() {
		if (!dragging) return;
		dragging = false;

		const height = node.getBoundingClientRect().height || 1;
		// Floor elapsed time to one frame — over sub-frame timescales a tiny
		// movement can compute an inflated velocity and falsely read as a fling.
		const elapsed = Math.max(performance.now() - startTime, 16);
		const velocity = currentY / elapsed;
		const shouldDismiss = currentY > height * 0.4 || velocity > 0.5;

		if (shouldDismiss) {
			gsap.set(node, { y: 0, yPercent: (currentY / height) * 100 });
			onDismiss();
		} else {
			gsap.to(node, { y: 0, duration: 0.25, ease: 'power2.out' });
		}
	}

	node.addEventListener('pointerdown', onPointerDown);
	node.addEventListener('pointermove', onPointerMove);
	node.addEventListener('pointerup', onPointerUp);
	node.addEventListener('pointercancel', onPointerUp);

	return {
		update(newOptions: DragToDismissOptions) {
			onDismiss = newOptions.onDismiss;
			handleSelector = newOptions.handleSelector ?? '[data-drag-handle]';
		},
		destroy() {
			node.removeEventListener('pointerdown', onPointerDown);
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerup', onPointerUp);
			node.removeEventListener('pointercancel', onPointerUp);
			gsap.killTweensOf(node);
		}
	};
}
