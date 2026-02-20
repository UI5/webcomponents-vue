import { h, cloneVNode, type VNode, type Ref } from "vue";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { IsDefaultSlot, IsSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

type ExtractComponentProps<T> = {
	[K in keyof T as
		K extends `_${string}` ? never : // Remove private props
		T[K] extends Array<HTMLElement> ? never : // Remove slots (check type first)
		K extends `data-${string}` ? never : // Remove data-* attributes
		K extends keyof HTMLElement ? never : // Remove HTMLElement props
		K extends keyof UI5Element ? never : // Remove UI5Element base props
		K extends "dangerouslySetInnerHTML" ? never : // Remove React-specific props
		K extends "ref" ? never : // Remove ref to avoid conflicts
		K]: T[K];
};

type ExtractComponentSlots<T> = {
  [K in keyof T]: IsDefaultSlot<Exclude<T[K], undefined>> extends true 
  							? "default" : IsSlot<Exclude<T[K], undefined>> extends true 
										? K : never;
}[keyof T];

/** Custom event with detail property */
interface CustomEventWithDetail extends Event {
  detail?: Record<string, unknown>;
}

/** Event target with dynamic properties */
interface EventTargetWithProps extends EventTarget {
  [key: string]: unknown;
}

/** Emit function type for Vue components */
type EmitFn = (event: string, ...args: unknown[]) => void;
type SlotFn = () => VNode | VNode[];

/**
 * Configuration for v-model binding.
 * @public
 */
export type VModelConfig = {
	/** The property name to bind for v-model (e.g., "value", "open") */
	prop: string;
	/** The event name to listen for v-model updates (e.g., "input", "change", "close") */
	event: string;
};

/**
 * Creates a Vue component wrapper for a given UI5 Web Component class.
 *
 * Usage:
 * ```ts
 * import { createComponent } from 'path-to-this-file';
 * import UI5Input from '@ui5/webcomponents/dist/Input.js';
 *
 * const Input = createComponent(UI5Input);
 *
 * <template>
 *   <Input v-model="inputValue" placeholder="Enter text" />
 * </template>
 * ```
 *
 * @param { UI5Element } Klass - The UI5 Web Component class to wrap.
 * @param { VModelConfig } vModelConfig - Optional configuration for v-model binding.
 *  - vModelConfig.prop: The property name to bind for v-model (e.g., "value", "open") - by default it is "value"
 *  - vModelConfig.event: The event name to listen for v-model updates (e.g., "input", "change", "close") - by default it is "input"
 *
 * @returns A Vue component that wraps the specified UI5 Web Component.
 * @public
 * @since 0.7.0
 * @author SAP SE
 */
export default function createComponent<T extends typeof UI5Element>(Klass: T, vModelConfig?: VModelConfig) {
	const tagName = Klass.getMetadata().getTag();
	const modelProp = vModelConfig?.prop ?? "value";
	const modelEvent = vModelConfig?.event ?? "input";
	const eventHandlerName = `on${modelEvent[0].toUpperCase()}${modelEvent.slice(1)}`;

	type ComponentInstance = InstanceType<T>;
	type ComponentProps = ExtractComponentProps<InstanceType<T>["_jsxProps"]>;
	type ComponentSlots = ExtractComponentSlots<ComponentInstance["_jsxProps"]>;

	type SlotTypes = {
	[K in ComponentSlots]?: SlotFn;
	};

  return function FComponent(
    props: ComponentProps & { modelValue?: unknown; ref?: Ref<HTMLElement> | string },
    { slots, emit }: { slots?: SlotTypes; emit?: EmitFn }
  ) {
	const finalProps: Record<string, unknown> = { ...props };

	// v-model handling - only add if modelValue is defined
	if (props.modelValue !== undefined) {
		finalProps[modelProp] = props.modelValue;
		finalProps[eventHandlerName] = (e: CustomEventWithDetail) => {
			const target = e.target as EventTargetWithProps | null;
			emit?.("update:modelValue", e.detail?.[modelProp] ?? target?.[modelProp]);
		};
	}

    const children = slots
		? Object.entries(slots).flatMap(([slotName, slotFn]) => {
			if (typeof slotFn !== "function") {
				return [];
			}

			const content = slotFn();

			if (!content) {
				return [];
			}

			const vnodes = Array.isArray(content) ? content : [content];

			return vnodes
				.filter(Boolean)
				.map((vnode) =>
					slotName === "default" ? vnode : cloneVNode(vnode, { 
							slot: slotName 
					})
				);
			})
		: [];

		return h(tagName, finalProps, children);
	};
}
