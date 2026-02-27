[![REUSE status](https://api.reuse.software/badge/github.com/UI5/webcomponents/vue)](https://api.reuse.software/info/github.com/UI5/webcomponents-vue)

# UI5 Web Components for Vue

The project provides means for creating Vue components out of [UI5 Web Components](https://sap.github.io/ui5-webcomponents/), providing a seamless integration of pure web components in Vue.
UI5 Web Components are framework-agnostic custom elements, but using them directly in Vue lacks TypeScript support, v-model compatibility, and native slot syntax.
This library wraps them to provide a first-class Vue development experience.


- **EXPERIMENTAL**: This project is currently in an experimental phase. The API may change in future releases without prior notice.
- **Vue Compatibility**: Requires Vue **^3.5.27** or higher. This library leverages Vue 3.5+ features and is not compatible with earlier versions.


## 📚 Library Usage

The library provides two ways to use UI5 Web Components in Vue:

1. **`createComponent`** - Factory function to wrap any UI5 Web Component
2. **Pre-built components** - Ready-to-use wrappers for common components

### Option 1: Using `createComponent`

Use this when you need full control or want to wrap components not included in the pre-built set.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { createComponent } from '@ui5/webcomponents-vue';
import Input_ from '@ui5/webcomponents/dist/Input.js';

const Input = createComponent(Input_);
const value = ref('');
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." />
</template>
```

### Option 2: Using Pre-built Components

For convenience, the library ships with pre-built wrappers for 40+ common UI5 Web Components. These are available from a separate entry point to keep the core library lightweight.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Ui5Input, Ui5Button, Ui5Dialog } from '@ui5/webcomponents-vue/components';

const value = ref('');
const isDialogOpen = ref(false);
</script>

<template>
  <Ui5Input v-model="value" placeholder="Enter text..." />
  <Ui5Button @click="isDialogOpen = true">Open Dialog</Ui5Button>
  <Ui5Dialog v-model="isDialogOpen" headerText="My Dialog">
    Dialog content here
  </Ui5Dialog>
</template>
```

**Why a separate import path?**
- The pre-built components import from `@ui5/webcomponents`, which would force all users to install it even if they only need `createComponent`
- Keeps the core library dependency-light
- Bundlers tree-shake unused components when importing from `/components`

**Available pre-built components:**

| Category | Components |
|----------|------------|
| Basic | `Ui5Button`, `Ui5Input`, `Ui5Label`, `Ui5Link`, `Ui5Icon`, `Ui5Title` |
| Form | `Ui5CheckBox`, `Ui5RadioButton`, `Ui5Switch`, `Ui5Select`, `Ui5ComboBox`, `Ui5MultiComboBox`, `Ui5TextArea`, `Ui5Slider`, `Ui5DatePicker`, `Ui5TimePicker` |
| Display | `Ui5Avatar`, `Ui5Badge`, `Ui5Card`, `Ui5CardHeader`, `Ui5MessageStrip`, `Ui5ProgressIndicator`, `Ui5RatingIndicator`, `Ui5Toast` |
| Layout | `Ui5Bar`, `Ui5Panel`, `Ui5TabContainer`, `Ui5Tab` |
| Overlays | `Ui5Dialog`, `Ui5Popover`, `Ui5Menu`, `Ui5MenuItem` |
| Data | `Ui5List`, `Ui5ListItemStandard`, `Ui5Table`, `Ui5TableRow`, `Ui5TableCell`, `Ui5TableHeaderRow`, `Ui5TableHeaderCell`, `Ui5Tree`, `Ui5TreeItem` |

### Using Slots

```vue
<script setup lang="ts">
import { Ui5Bar, Ui5Button } from '@ui5/webcomponents-vue/components';
</script>

<template>
  <Ui5Bar>
    <template #startContent>
      <Ui5Button>Start</Ui5Button>
    </template>
    <template #endContent>
      <Ui5Button>End</Ui5Button>
    </template>
    Default content
  </Ui5Bar>
</template>
```

### Custom v-model Configuration

Some components use different properties/events for two-way binding. The pre-built components handle this automatically, but when using `createComponent` directly, you can configure it:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { createComponent } from '@ui5/webcomponents-vue';
import Dialog_ from '@ui5/webcomponents/dist/Dialog.js';

// Dialog uses 'open' prop and 'close' event instead of 'value'/'input'
const Dialog = createComponent(Dialog_, { prop: 'open', event: 'close' });
const isOpen = ref(false);
</script>

<template>
  <Dialog v-model="isOpen" headerText="My Dialog">
    Content
  </Dialog>
</template>
```


## 🔧 Features

- **Type-safe** - Full TypeScript support with proper type inference
- **v-model support** - Two-way data binding for UI5 components
- **Slots support** - Named and default slots
- **Reactive** - Seamless integration with Vue's reactivity system


## 🛠️ Development

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm (comes with Node.js)

### Monorepo

This project is organized as a monorepo with two workspaces:

- **`lib/`** - The core wrapper library (`@ui5/webcomponents-vue`)
- **`app/`** - Demo application showcasing the library usage

> **Note**: The demo app was scaffolded using `npm create vue@latest` following the [official Vue documentation](https://vuejs.org/guide/quick-start.html).


### Installation

This will install dependencies for both the library and the demo app.

```sh
npm install
```

### Start

Launches the demo app:

```sh
npm start
```

### Development Mode

Run the library in watch mode alongside the demo app for rapid development:

```sh
npm run dev
```

### Build

Performs a production build:

```sh
npm run build
```

### Testing

Run the test suite:

```sh
npm test
```

### Linting

Check code quality:

```sh
npm run lint
npm run lint:fix  # Auto-fix issues
```


### Library Structure

- [`lib/src/index.ts`](lib/src/index.ts) - Library entry point
- [`lib/src/createComponent.ts`](lib/src/createComponent.ts) - Core wrapper function
- [`lib/src/components.ts`](lib/src/components.ts) - Pre-built component wrappers

### App Structure

- [`app/src/App.vue`](app/src/App.vue) - Demo component showcasing various UI5 components
- [`app/src/main.ts`](app/src/main.ts) - Application entry point

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Build library and start demo app |
| `npm run dev` | Watch mode for library + demo app dev server |
| `npm run build` | Build both library and demo app |
| `npm test` | Run all tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |

## 📝 License

Apache-2.0

## 👥 Author

SAP SE (https://www.sap.com)

## 🔗 Links

- [Repository](https://github.com/UI5/webcomponents-vue)
- [UI5 Web Components](https://sap.github.io/ui5-webcomponents/)
- [Vue 3 Documentation](https://vuejs.org/)


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
