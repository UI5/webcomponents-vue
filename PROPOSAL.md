# Proposal: Vue Support for UI5 Web Components

## Main Question: Where Should the Prebuilt Wrappers Live?

The `createComponent` utility which has the Vue dependency will live outside the monorepo (`@ui5/webcomponents-vue-base`).

The question is where the **prebuilt component wrappers** are exported from. This is a single file with minimal code:

```typescript
// index.ts - this is all that lives in packages/vue
import { createComponent } from '@ui5/webcomponents-vue-base'
import Button from '@ui5/webcomponents/dist/Button.js'
import Input from '@ui5/webcomponents/dist/Input.js'
import Dialog from '@ui5/webcomponents/dist/Dialog.js'
// ... more imports

export const Ui5Button = createComponent(Button)
export const Ui5Input = createComponent(Input)
export const Ui5Dialog = createComponent(Dialog, { prop: 'open', event: 'close' })
// ... more exports
```

---

## 1. Testing Changes (Most Important)

The prebuilt wrappers depend on two things: **web components** and **createComponent**.

| When this changes... | Option A (Monorepo) | Option B (Separate Repo) |
|----------------------|---------------------|--------------------------|
| **Web component** | Test immediately | Need to publish or `npm link` |
| **createComponent** | Need to publish `vue-base` first | Test immediately (same repo) |

**Web components change frequently** (new features, bug fixes, new components). The `createComponent` utility is stable and changes rarely.

**→ Option A optimizes for the common case.**

---

## 2. Daily Development Workflow

| Option | Workflow |
|--------|----------|
| **A (Monorepo)** | Change component → build → test Vue wrapper immediately |
| **B (Separate)** | Requires `npm link` or publishing canary versions to test |

---

## 3. Release Workflow

| Option | Workflow |
|--------|----------|
| **A (Monorepo)** | Released together. Versioning always in sync. Single process. |
| **B (Separate)** | Independent releases. Must manually sync. Risk of version drift. |

---

## 4. Documentation

| Option | Approach |
|--------|----------|
| **A (Monorepo)** | Vue examples integrated into main playground (ui5.github.io/webcomponents). Single site for all frameworks. |
| **B (Separate)** | Separate Storybook or Docusaurus site. User must visit different sites per framework. |

Option A enables a unified documentation experience where users see HTML, Vue, React, and Angular examples side by side on the same component page.

---

## Summary

|  | Option A (Monorepo) | Option B (Separate) |
|--|---------------------|---------------------|
| **Web component changes** | Test immediately | Friction |
| **createComponent changes** | Friction | Test immediately |
| **Releases** | In sync | Manual coordination |
| **Documentation** | Integrated in main playground | Separate site |
| **Maintenance** | Core team | Vue team/community |
| **Precedent** | — | `@ui5/webcomponents-react` |

---

## Key Point: Vue Dependency Stays External

In both options, the Vue framework dependency does **not** enter the monorepo. The `createComponent` utility (with Vue dep) lives in `@ui5/webcomponents-vue-base`, maintained externally.

---

## Recommendation

**Option A (inside monorepo)** optimizes for the common case: testing web component changes with Vue wrappers. Since `createComponent` is stable and rarely changes, the tradeoff favors keeping prebuilt wrappers close to the web components.
