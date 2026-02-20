# AI Agents Guide

This document provides guidance for AI tools and agents working with the UI5 Web Components for Vue codebase.

## Project Overview

This is a Vue component library that wraps [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) to provide first-class Vue integration with TypeScript support, v-model compatibility, and native slot syntax.

## Repository Structure

```
webcomponents-vue/
├── lib/                    # Core library (@ui5/webcomponents-vue)
│   ├── src/
│   │   ├── index.ts        # Library entry point
│   │   ├── createComponent.ts  # Core wrapper factory function
│   │   └── components.ts   # Pre-built component wrappers
│   ├── eslint.config.js
│   ├── tsconfig.json
│   └── vitest.config.ts
├── app/                    # Demo application
│   ├── src/
│   │   ├── App.vue         # Demo component
│   │   └── main.ts         # App entry point
│   └── vite.config.ts
└── package.json            # Root package (npm workspaces)
```

## Key Concepts

### `createComponent` Factory Function

The core of this library is `lib/src/createComponent.ts`. It:
- Takes a UI5 Web Component class and returns a Vue functional component
- Extracts TypeScript types from UI5 components for props and slots
- Handles v-model binding with configurable prop/event pairs
- Maps Vue slots to UI5 Web Component slots

### Pre-built Components

`lib/src/components.ts` exports ready-to-use wrappers for 40+ UI5 components with appropriate v-model configurations.

## Development Commands

```sh
npm install      # Install all dependencies
npm start        # Build lib and start demo app
npm run dev      # Watch mode for lib + demo app
npm run build    # Production build
npm test         # Run tests
npm run lint     # Check code quality
npm run lint:fix # Auto-fix lint issues
```

## Code Style Guidelines

- **TypeScript**: All source code uses TypeScript with strict typing
- **Vue 3.5+**: Uses Vue 3.5+ features (requires Vue ^3.5.27)
- **Functional Components**: Vue wrappers are functional components, not class-based
- **JSDoc**: Document public APIs with JSDoc comments including `@public`, `@since`, and `@see` tags

## Testing

Tests are located in `lib/src/__tests__/` and use Vitest. Run with:

```sh
npm test
```

## Common Tasks

### Adding a New Pre-built Component

1. Import the UI5 component in `lib/src/components.ts`
2. Export a wrapped component using `createComponent()`
3. Configure v-model if needed: `createComponent(Component, { prop: 'propName', event: 'eventName' })`

### v-model Configuration Patterns

| Component Type | prop | event |
|---------------|------|-------|
| Input-like | `value` | `input` (default) |
| Checkbox/Switch | `checked` | `change` |
| Dialog/Popover | `open` | `close` |
| Panel | `collapsed` | `toggle` |

## Important Files to Understand

| File | Purpose |
|------|---------|
| `lib/src/createComponent.ts` | Core wrapper logic, type extraction |
| `lib/src/components.ts` | All pre-built component exports |
| `lib/src/index.ts` | Public API exports |
| `app/src/App.vue` | Usage examples and demos |

## Dependencies

- **Vue ^3.5.27**: Required Vue version
- **@ui5/webcomponents-base**: Base types for UI5 elements
- **@ui5/webcomponents**: UI5 Web Components (peer dependency for pre-built components)

## Notes for AI Agents

- This library is **experimental** - APIs may change
- Always check existing patterns in `components.ts` before adding new components
- UI5 Web Components use custom elements - they have their own property/event naming conventions
- The `_jsxProps` type on UI5 elements provides the TypeScript interface for props and slots
- Slots are identified using `IsSlot` and `IsDefaultSlot` type guards from UI5
