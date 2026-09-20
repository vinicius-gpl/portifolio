import { afterEach, describe, expect, test, vi } from 'vitest';
import { dragToDismiss } from './drag-to-dismiss';

function makeSheet() {
	const node = document.createElement('div');
	vi.spyOn(node, 'getBoundingClientRect').mockReturnValue({
		height: 400,
		width: 300,
		top: 0,
		left: 0,
		right: 300,
		bottom: 400,
		x: 0,
		y: 0,
		toJSON() {}
	});
	const handle = document.createElement('div');
	handle.setAttribute('data-drag-handle', '');
	node.appendChild(handle);
	document.body.appendChild(node);
	return { node, handle };
}

function firePointer(target: Element, type: string, clientY: number) {
	target.dispatchEvent(new PointerEvent(type, { clientY, bubbles: true, pointerId: 1 }));
}

afterEach(() => {
	document.body.replaceChildren();
});

describe('dragToDismiss', () => {
	test('happy path: dragging the handle past the distance threshold dismisses', () => {
		const { node, handle } = makeSheet();
		const onDismiss = vi.fn();
		const action = dragToDismiss(node, { onDismiss });

		firePointer(handle, 'pointerdown', 0);
		firePointer(node, 'pointermove', 250); // > 40% of the 400px sheet height
		firePointer(node, 'pointerup', 250);

		expect(onDismiss).toHaveBeenCalledOnce();
		action.destroy();
	});

	test('sad path: a small, unhurried drag springs back without dismissing', async () => {
		const { node, handle } = makeSheet();
		const onDismiss = vi.fn();
		const action = dragToDismiss(node, { onDismiss });

		firePointer(handle, 'pointerdown', 0);
		firePointer(node, 'pointermove', 20);
		// A real slow drag spends real wall-clock time moving — without this,
		// the near-zero elapsed time would compute an artificially high
		// velocity and misread this as a fast fling.
		await new Promise((resolve) => setTimeout(resolve, 250));
		firePointer(node, 'pointerup', 20);

		expect(onDismiss).not.toHaveBeenCalled();
		action.destroy();
	});

	test('sad path: pointerdown outside the handle does not start a drag', () => {
		const { node } = makeSheet();
		const onDismiss = vi.fn();
		const action = dragToDismiss(node, { onDismiss });

		firePointer(node, 'pointerdown', 0);
		firePointer(node, 'pointermove', 250);
		firePointer(node, 'pointerup', 250);

		expect(onDismiss).not.toHaveBeenCalled();
		action.destroy();
	});

	test('destroy() removes listeners so further drags are ignored', () => {
		const { node, handle } = makeSheet();
		const onDismiss = vi.fn();
		const action = dragToDismiss(node, { onDismiss });
		action.destroy();

		firePointer(handle, 'pointerdown', 0);
		firePointer(node, 'pointermove', 250);
		firePointer(node, 'pointerup', 250);

		expect(onDismiss).not.toHaveBeenCalled();
	});
});
