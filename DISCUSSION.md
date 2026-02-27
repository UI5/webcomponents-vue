# Discussion: Vue Support for UI5 Web Components

## Background

This document is for the **UI5 team** to decide the architecture for official Vue support.

**Current state:**
- This repository (`webcomponents-vue`) contains a working `createComponent` utility and prebuilt wrappers
- `@ui5/webcomponents-react` exists as a separate repository (precedent for framework bindings)

**What we're building:**
- Vue wrapper library that provides TypeScript support, `v-model` bindings, and proper slot handling for UI5 Web Components

---

## Package Structure

| Package | Contains | Location |
|---------|----------|----------|
| `@ui5/webcomponents-vue` | `createComponent` utility + prebuilt wrappers (Option B) | This repo |
| *or* | | |
| `@ui5/webcomponents-vue-base` | `createComponent` utility only | This repo |
| `@ui5/webcomponents/vue` | Prebuilt wrappers only (Option A) | UI5 monorepo |

The `createComponent` utility (which has the Vue framework dependency) will **always remain in this repository**.

---

## Main Question: Where Should the Prebuilt Wrappers Live?

The prebuilt wrappers are a thin layer that imports web components and exports Vue-wrapped versions:

```typescript
// Prebuilt wrappers - minimal code
import { createComponent } from '@ui5/webcomponents-vue-base'
import Button from '@ui5/webcomponents/dist/Button.js'
import Input from '@ui5/webcomponents/dist/Input.js'

export const Ui5Button = createComponent(Button)
export const Ui5Input = createComponent(Input)
export const Ui5Dialog = createComponent(Dialog, { prop: 'open', event: 'close' })
// ... more exports
```

**Option A:** Prebuilt wrappers live in the **UI5 Web Components monorepo** (`packages/vue`)

**Option B:** Prebuilt wrappers live in **this repository** (alongside `createComponent`)

---

## Comparison

### 1. Testing Changes

The prebuilt wrappers depend on: **web components** + **createComponent**

| When this changes... | Option A (UI5 Monorepo) | Option B (This Repo) |
|----------------------|-------------------------|----------------------|
| **Web component** | Test immediately | Need to publish or `npm link` |
| **createComponent** | Need to publish first | Test immediately |

Web components change **frequently** (new features, bug fixes, new components).
The `createComponent` utility is **stable** and changes rarely.

**→ Option A optimizes for the common case.**

---

### 2. Daily Development Workflow

| Option | Workflow |
|--------|----------|
| **A (UI5 Monorepo)** | Change component → build → test Vue wrapper immediately |
| **B (This Repo)** | Requires `npm link` or publishing canary versions to test |

---

### 3. Release Workflow

| Option | Workflow |
|--------|----------|
| **A (UI5 Monorepo)** | Released together. Versioning always in sync. Single process. |
| **B (This Repo)** | Independent releases. Must manually sync. Risk of version drift. |

---

### 4. Documentation

| Option | Approach |
|--------|----------|
| **A (UI5 Monorepo)** | Vue examples integrated into main playground (ui5.sap.com). Single site for all frameworks. |
| **B (This Repo)** | Separate documentation site. User must visit different sites per framework. |

Option A enables a unified experience where users see HTML, Vue, React, and Angular examples side by side.

---

## Summary

|  | Option A (UI5 Monorepo) | Option B (This Repo) |
|--|-------------------------|----------------------|
| **Web component changes** | Test immediately | Friction |
| **createComponent changes** | Friction | Test immediately |
| **Releases** | In sync | Manual coordination |
| **Documentation** | Integrated | Separate site |
| **Maintenance** | UI5 core team | Vue team/community |
| **Precedent** | — | `@ui5/webcomponents-react` |

---

## Library Package Dependencies

How the library `package.json` differs between options:

### Option A (UI5 Monorepo)

**This repo** (`@ui5/webcomponents-vue-base`) — only `createComponent`:
```json
{
  "peerDependencies": {
    "vue": "^3.5.27",
    "@ui5/webcomponents-base": "^2.19.0"
  }
}
```

**UI5 monorepo** (`packages/vue`) — prebuilt wrappers:
```json
{
  "dependencies": {
    "@ui5/webcomponents-vue-base": "^2.19.0"
  }
}
```
- `vue` peer is inherited from `@ui5/webcomponents-vue-base`
- `@ui5/webcomponents` is an internal workspace dependency (same monorepo)

### Option B (This Repo)

**This repo** (`@ui5/webcomponents-vue`) — everything in one package:
```json
{
  "peerDependencies": {
    "vue": "^3.5.27",
    "@ui5/webcomponents-base": "^2.19.0",
    "@ui5/webcomponents": "^2.19.0"
  }
}
```

---

## App Packages Dependencies

From the app developer's perspective, **both options provide the same experience**:

```bash
npm install @ui5/webcomponents @ui5/webcomponents-vue vue
```

```json
{
  "dependencies": {
    "vue": "^3.5.27",
    "@ui5/webcomponents": "^2.19.0",
    "@ui5/webcomponents-vue": "^2.19.0"
  }
}
```

```ts
import { Ui5Button, Ui5Input } from '@ui5/webcomponents-vue'
```

The difference is internal:
- **Option A:** `@ui5/webcomponents-vue` comes from the UI5 monorepo, with `@ui5/webcomponents-vue-base` as a transitive dependency
- **Option B:** `@ui5/webcomponents-vue` comes from this repo as a single package

---

## Recommendation

**Option A (UI5 monorepo)** — Prebuilt wrappers live alongside web components.

This optimizes for the common case: testing web component changes with Vue wrappers immediately. Since `createComponent` is stable and rarely changes, the tradeoff favors keeping prebuilt wrappers close to the web components.
