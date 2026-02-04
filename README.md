# UI5 Web Components for Vue

Vue component factory function which creates Vue component wrapper out of [UI5 Web Components](https://sap.github.io/ui5-webcomponents/), providing a seamless integration of UI5 Web Components in Vue.

UI5 Web Components are framework-agnostic custom elements, but using them directly in Vue lacks TypeScript support, v-model compatibility, and native slot syntax.
This library wraps them to provide a first-class Vue development experience.


- **EXPERIMENTAL**: This project is currently in an experimental phase. The API may change in future releases without prior notice.
- **Vue Compatibility**: Requires Vue **^3.5.27** or higher. This library leverages Vue 3.5+ features and is not compatible with earlier versions.


## 📚 Library Usage

The library provides a `createComponent` function that converts UI5 Web Components into Vue 3 components with full type safety and v-model support.


### Basic Example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import createComponent from '@ui5/webcomponents-vue';
import Input_ from '@ui5/webcomponents/dist/Input.js';

const Input = createComponent(Input_);
const value = ref('');
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." />
</template>
```

### Using Slots

```vue
<script setup lang="ts">
import createComponent from '@ui5/webcomponents-vue';
import Bar_ from '@ui5/webcomponents/dist/Bar.js';
import Button_ from '@ui5/webcomponents/dist/Button.js';

const Bar = createComponent(Bar_);
const Button = createComponent(Button_);
</script>

<template>
  <Bar>
    <template #startContent>
      <Button>Start</Button>
    </template>
    <template #endContent>
      <Button>End</Button>
    </template>
    Default content
  </Bar>
</template>
```


## 🔧 Features

- ✅ **Type-safe** - Full TypeScript support with proper type inference
- ✅ **v-model support** - Two-way data binding for UI5 components
- ✅ **Slots support** - Named and default slots
- ✅ **Reactive** - Seamless integration with Vue's reactivity system


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

Performs a production build:

### Build

```sh
npm run build
```


### Library Structure

- [`lib/src/createComponent.ts`](lib/src/createComponent.ts) - Core wrapper function

### App Structure

- [`app/src/App.vue`](app/src/App.vue) - Demo component showcasing various UI5 components
- [`app/src/main.ts`](app/src/main.ts) - Application entry point

### Available Scripts

- `npm start` - Build library and start demo app
- `npm run build` - Build both library and demo app

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