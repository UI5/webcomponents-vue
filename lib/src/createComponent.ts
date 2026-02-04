import { h, type Ref } from "vue";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

type isArray<T> = T extends HTMLElement[] ? true : false;

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
  [K in keyof T]: isArray<Exclude<T[K], undefined>> extends true ? K : never;
}[keyof T];

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

  type ComponentInstance = InstanceType<T>;
  type ComponentProps = ExtractComponentProps<InstanceType<T>["_jsxProps"]>;
  type ComponentSlots = ExtractComponentSlots<ComponentInstance["_jsxProps"]> | "default";

  type SlotTypes = {
    [K in ComponentSlots]?: () => any;
  };

  return function FComponent(
    props: ComponentProps & { modelValue?: any, ref?: Ref<HTMLElement> | string },
    { slots, emit }: { slots?: SlotTypes; emit?: any,  }
  ) {

    // v-model handling
    let propsFromModel = {};
    if (props.modelValue !== undefined) {
      const eventHandlerName = `on${modelEvent
        .charAt(0)
        .toUpperCase()}${modelEvent.slice(1)}`;

      propsFromModel = {
        [modelProp]: props.modelValue,
        [eventHandlerName]: (e: Event) => {
          const newValue =
            (e as any).detail?.[modelProp] ?? (e.target as any)?.[modelProp];
          emit?.("update:modelValue", newValue);
        },
      };
    }

    // slots handling
    const children: any[] = []; 
    if (slots) {
      Object.keys(slots).forEach((slotName: string) => {
        const slotFn = slots[slotName as keyof SlotTypes];
        const slotContent = typeof slotFn === "function" ? slotFn() : slotFn;
        
        if (!slotContent) return;
        
        const vnodes = Array.isArray(slotContent) ? slotContent : [slotContent];
        
        vnodes.forEach((vnode: any) => {
          if (!vnode) return;
          
          if (slotName !== "default") {
            if (vnode.props) {
              vnode.props = { ...vnode.props, slot: slotName };
            } else {
              vnode.props = { slot: slotName };
            }
          }
          
          children.push(vnode);
        });
      });
    }

    return h(
      tagName,
      { ...props, ...propsFromModel } as any,
      children
    );
  };
}