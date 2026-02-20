import { describe, it, expect, vi } from 'vitest';
import { h, type VNode } from 'vue';
import type UI5Element from '@ui5/webcomponents-base/dist/UI5Element.js';
import createComponent, { type VModelConfig } from '../createComponent.js';

// Create a properly typed mock for UI5Element class
type UI5ElementClass = typeof UI5Element;

interface MockMetadata {
	getTag(): string;
}

interface MockUI5ElementClass {
	getMetadata(): MockMetadata;
	new(): { _jsxProps: Record<string, unknown> };
}

// Mock Input component
const MockInput: MockUI5ElementClass = class {
	static getMetadata(): MockMetadata {
		return { getTag: () => 'ui5-input' };
	}
	_jsxProps!: {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
	};
} as MockUI5ElementClass;

// Mock Dialog component
const MockDialog: MockUI5ElementClass = class {
	static getMetadata(): MockMetadata {
		return { getTag: () => 'ui5-dialog' };
	}
	_jsxProps!: {
		open?: boolean;
		headerText?: string;
		footer?: HTMLElement[];
	};
} as MockUI5ElementClass;

// Helper to create typed slots
type TestSlots = Record<string, () => VNode | VNode[] | null>;

describe('createComponent', () => {
	describe('basic component creation', () => {
		it('should create a functional component', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			expect(typeof Component).toBe('function');
		});

		it('should use correct tag name from metadata', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			const vnode = Component(
				{ placeholder: 'test' } as Parameters<typeof Component>[0],
				{ slots: {} }
			);

			expect(vnode.type).toBe('ui5-input');
		});

		it('should pass props to the rendered element', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			const vnode = Component(
				{ placeholder: 'Enter text', disabled: true } as Parameters<typeof Component>[0],
				{ slots: {} }
			);

			expect(vnode.props).toMatchObject({
				placeholder: 'Enter text',
				disabled: true
			});
		});
	});

	describe('v-model handling', () => {
		it('should use default v-model config (value/input)', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			const emit = vi.fn();

			const vnode = Component(
				{ modelValue: 'test value' } as Parameters<typeof Component>[0],
				{ slots: {}, emit }
			);

			expect(vnode.props).toHaveProperty('value', 'test value');
			expect(vnode.props).toHaveProperty('onInput');
		});

		it('should use custom v-model config', () => {
			const config: VModelConfig = { prop: 'open', event: 'close' };
			const Component = createComponent(MockDialog as unknown as UI5ElementClass, config);
			const emit = vi.fn();

			const vnode = Component(
				{ modelValue: true } as Parameters<typeof Component>[0],
				{ slots: {}, emit }
			);

			expect(vnode.props).toHaveProperty('open', true);
			expect(vnode.props).toHaveProperty('onClose');
		});

		it('should emit update:modelValue on event', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			const emit = vi.fn();

			const vnode = Component(
				{ modelValue: 'initial' } as Parameters<typeof Component>[0],
				{ slots: {}, emit }
			);

			const mockEvent = {
				target: { value: 'new value' },
				detail: {}
			};

			const props = vnode.props as Record<string, (e: typeof mockEvent) => void>;
			props.onInput(mockEvent);

			expect(emit).toHaveBeenCalledWith('update:modelValue', 'new value');
		});

		it('should prefer detail value over target value', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);
			const emit = vi.fn();

			const vnode = Component(
				{ modelValue: 'initial' } as Parameters<typeof Component>[0],
				{ slots: {}, emit }
			);

			const mockEvent = {
				target: { value: 'target value' },
				detail: { value: 'detail value' }
			};

			const props = vnode.props as Record<string, (e: typeof mockEvent) => void>;
			props.onInput(mockEvent);

			expect(emit).toHaveBeenCalledWith('update:modelValue', 'detail value');
		});

		it('should not add v-model props when modelValue is undefined', () => {
			const Component = createComponent(MockInput as unknown as UI5ElementClass);

			const vnode = Component(
				{ placeholder: 'test' } as Parameters<typeof Component>[0],
				{ slots: {} }
			);

			expect(vnode.props).not.toHaveProperty('onInput');
			expect(vnode.props).toHaveProperty('placeholder', 'test');
		});
	});

	describe('slot handling', () => {
		it('should render default slot content', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const slotContent = h('span', 'Default content');

			const slots: TestSlots = {
				default: () => slotContent
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(1);
			expect(children[0]).toBe(slotContent);
		});

		it('should add slot attribute to named slot content', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const footerContent = h('div', 'Footer');

			const slots: TestSlots = {
				footer: () => footerContent
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(1);
			expect(children[0].props).toHaveProperty('slot', 'footer');
		});

		it('should handle multiple slot contents', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const defaultContent = h('p', 'Content');
			const footerContent = h('div', 'Footer');

			const slots: TestSlots = {
				default: () => defaultContent,
				footer: () => footerContent
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(2);
		});

		it('should handle array slot content', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const items = [
				h('span', 'Item 1'),
				h('span', 'Item 2'),
				h('span', 'Item 3')
			];

			const slots: TestSlots = {
				default: () => items
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(3);
		});

		it('should skip null/undefined slot content', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);

			const slots: TestSlots = {
				default: () => null,
				footer: () => null
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(0);
		});

		it('should preserve event handlers on named slot content after cloning', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const clickHandler = vi.fn();
			const footerContent = h('button', { onClick: clickHandler, class: 'my-btn' }, 'Click me');

			const slots: TestSlots = {
				footer: () => footerContent
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			expect(children).toHaveLength(1);

			const clonedButton = children[0];
			// Verify slot attribute was added
			expect(clonedButton.props).toHaveProperty('slot', 'footer');
			// Verify original props are preserved
			expect(clonedButton.props).toHaveProperty('class', 'my-btn');
			// Verify event handler is preserved
			expect(clonedButton.props).toHaveProperty('onClick', clickHandler);
		});

		it('should preserve multiple event handlers on cloned slot content', () => {
			const Component = createComponent(MockDialog as unknown as UI5ElementClass);
			const clickHandler = vi.fn();
			const mouseEnterHandler = vi.fn();
			const footerContent = h('button', {
				onClick: clickHandler,
				onMouseenter: mouseEnterHandler,
				id: 'test-btn'
			}, 'Hover me');

			const slots: TestSlots = {
				footer: () => footerContent
			};

			const vnode = Component(
				{} as Parameters<typeof Component>[0],
				{ slots: slots as Parameters<typeof Component>[1]['slots'] }
			);

			const children = vnode.children as VNode[];
			const clonedButton = children[0];

			expect(clonedButton.props).toHaveProperty('slot', 'footer');
			expect(clonedButton.props).toHaveProperty('onClick', clickHandler);
			expect(clonedButton.props).toHaveProperty('onMouseenter', mouseEnterHandler);
			expect(clonedButton.props).toHaveProperty('id', 'test-btn');
		});
	});
});
