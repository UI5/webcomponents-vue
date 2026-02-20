# createComponent Technical Guide

This document explains how the `createComponent` factory function works to wrap UI5 Web Components as Vue components.

## Overview

`createComponent` is a factory function that takes a UI5 Web Component class and returns a Vue functional component. It handles:

1. Tag name resolution from UI5 metadata
2. Props passthrough
3. v-model two-way binding
4. Named and default slot distribution

## Step-by-Step Breakdown

### Step 1: Factory Initialization

```typescript
export default function createComponent<T extends typeof UI5Element>(
  Klass: T,
  vModelConfig?: VModelConfig
) {
  const tagName = Klass.getMetadata().getTag();
  const modelProp = vModelConfig?.prop ?? "value";
  const modelEvent = vModelConfig?.event ?? "input";
  const eventHandlerName = `on${modelEvent[0].toUpperCase()}${modelEvent.slice(1)}`;
```

When `createComponent` is called:

1. **Tag name extraction**: Retrieves the custom element tag (e.g., `ui5-input`) from the UI5 component's metadata
2. **v-model configuration**: Sets up which property and event to use for v-model binding
   - Defaults to `value` property and `input` event
   - Can be customized (e.g., `{ prop: 'open', event: 'close' }` for dialogs)
3. **Event handler name**: Pre-computes the Vue event handler name (e.g., `input` → `onInput`)

### Step 2: Type Extraction

```typescript
type ComponentInstance = InstanceType<T>;
type ComponentProps = ExtractComponentProps<InstanceType<T>["_jsxProps"]>;
type ComponentSlots = ExtractComponentSlots<ComponentInstance["_jsxProps"]>;
```

TypeScript utility types extract:

- **ComponentProps**: Valid props excluding private (`_`-prefixed), HTMLElement base props, slots, and React-specific props
- **ComponentSlots**: Slot names identified via `IsSlot` and `IsDefaultSlot` type guards from UI5

### Step 3: Functional Component Creation

```typescript
return function FComponent(
  props: ComponentProps & { modelValue?: unknown; ref?: Ref<HTMLElement> | string },
  { slots, emit }: { slots?: SlotTypes; emit?: EmitFn }
) {
```

Returns a Vue functional component that receives:

- **props**: Component-specific props plus `modelValue` for v-model support
- **slots**: Named slot functions from the parent template
- **emit**: Function to emit events back to the parent

### Step 4: Props Assembly

```typescript
const finalProps: Record<string, unknown> = { ...props };
```

Creates a copy of all incoming props to build the final props object that will be passed to the web component.

### Step 5: v-model Handling

```typescript
if (props.modelValue !== undefined) {
  finalProps[modelProp] = props.modelValue;
  finalProps[eventHandlerName] = (e: CustomEventWithDetail) => {
    const target = e.target as EventTargetWithProps | null;
    emit?.("update:modelValue", e.detail?.[modelProp] ?? target?.[modelProp]);
  };
}
```

When `v-model` is used on the component:

1. **Prop binding**: Sets the model property (e.g., `value`) to `modelValue`
2. **Event handler**: Attaches an event listener that:
   - Extracts the new value from `event.detail[prop]` (UI5 custom events) or `event.target[prop]` (fallback)
   - Emits `update:modelValue` to sync back to the parent

**Example flow:**
```
Parent: v-model="text"
  ↓
Component receives: modelValue="text"
  ↓
Web component gets: value="text", onInput={handler}
  ↓
User types → onInput fires → emit("update:modelValue", newValue)
  ↓
Parent: text = newValue
```

### Step 6: Slot Processing

```typescript
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
          slotName === "default" ? vnode : cloneVNode(vnode, { slot: slotName })
        );
    })
  : [];
```

Slot handling process:

1. **Iterate slots**: Loop through all provided slot functions
2. **Execute slot function**: Call each slot function to get its VNode content
3. **Normalize to array**: Ensure content is always an array of VNodes
4. **Filter nulls**: Remove any falsy values
5. **Apply slot attribute**: For named slots, clone the VNode with a `slot` attribute so the web component can distribute it correctly

**Why `cloneVNode`?** Vue VNodes should be treated as immutable. Instead of mutating `vnode.props`, we create a new VNode with the additional `slot` property.

### Step 7: Render

```typescript
return h(tagName, finalProps, children);
```

Uses Vue's `h()` function to create a VNode:

- **tagName**: The web component tag (e.g., `ui5-input`)
- **finalProps**: All props including v-model bindings
- **children**: Processed slot content

## Usage Examples

### Basic Component

```typescript
const Input = createComponent(UI5Input);
```

```vue
<Input placeholder="Enter text" />
```

Renders: `<ui5-input placeholder="Enter text"></ui5-input>`

### With v-model (default config)

```typescript
const Input = createComponent(UI5Input);
// Uses default: { prop: 'value', event: 'input' }
```

```vue
<Input v-model="text" />
```

Renders: `<ui5-input :value="text" @input="text = $event.target.value">`

### With Custom v-model Config

```typescript
const Dialog = createComponent(UI5Dialog, { prop: 'open', event: 'close' });
```

```vue
<Dialog v-model="isOpen">Content</Dialog>
```

Renders: `<ui5-dialog :open="isOpen" @close="isOpen = false">Content</ui5-dialog>`

### With Named Slots

```vue
<Dialog>
  <p>Main content</p>
  <template #footer>
    <Button>Close</Button>
  </template>
</Dialog>
```

Renders:
```html
<ui5-dialog>
  <p>Main content</p>
  <ui5-button slot="footer">Close</ui5-button>
</ui5-dialog>
```

## Type Safety

The factory preserves full type safety:

- Props are typed based on the UI5 component's `_jsxProps` interface
- Invalid props result in TypeScript errors
- Slot names are constrained to those defined by the component
