# Toaster Magic

[![npm version](https://img.shields.io/npm/v/toaster-magic.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/toaster-magic)
[![npm downloads](https://img.shields.io/npm/dm/toaster-magic.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/toaster-magic)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/toaster-magic?color=success&label=min%2Bgzip)](https://bundlephobia.com/package/toaster-magic)
[![types](https://img.shields.io/npm/types/toaster-magic.svg?color=blue&logo=typescript)](https://www.npmjs.com/package/toaster-magic)
[![license](https://img.shields.io/npm/l/toaster-magic.svg?color=blue)](./LICENSE)

**Lightweight, dependency-free toast notifications with beautiful themes.** The standalone JavaScript build of [Laravel Toaster Magic](https://github.com/devrabiul/laravel-toaster-magic) — works with **React**, **Vue**, **Next.js**, **Nuxt**, **Svelte**, **Angular**, or plain JavaScript.

- 🪶 **Zero dependencies**, ~5 KB min+gzip JS
- 🎨 **7 themes**: `default`, `material`, `ios`, `glassmorphism`, `neon`, `minimal`, `neumorphism`
- 🎬 **Animations**: `slide`, `fade`, `pop`, `bounce` + smooth FLIP stack reflow
- 🌙 **Dark mode**, gradient accents, colored mode, RTL-friendly positions
- 🧷 **SSR-safe**: import anywhere in Next.js / Nuxt — the DOM is only touched when a toast is shown
- 🔒 **Secure by default**: HTML is escaped and URLs are sanitized unless you opt in
- 📦 **ESM + CJS + CDN** builds with full **TypeScript** types

---

## Table of contents

- [Install](#install)
- [Quick start](#quick-start)
- [Options per toast](#options-per-toast)
- [Global configuration](#global-configuration)
- [React / Next.js](#react--nextjs)
- [Vue / Nuxt](#vue--nuxt)
- [CDN / no build step](#cdn--no-build-step)
- [API](#api)
- [Dark mode](#dark-mode)
- [FAQ](#faq)
- [Browser support](#browser-support)
- [License](#license)

## Install

```bash
npm install toaster-magic
```

```bash
# or
pnpm add toaster-magic
yarn add toaster-magic
```

## Quick start

```js
import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

toastMagic.success("Success!", "Your data has been saved.");
toastMagic.error("Oops", "Something went wrong.");
toastMagic.warning("Heads up", "Storage almost full.");
toastMagic.info("FYI", "A new version is available.");
```

## Options per toast

```js
toastMagic.success("Order shipped", "Track your package anytime.", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
  timeOut: 8000,        // ms, overrides global
  avatar: "/img/courier.png",
});
```

## Global configuration

```js
import { configure } from "toaster-magic";

configure({
  positionClass: "toast-bottom-end", // toast-top-start | toast-top-end | toast-top-center | toast-bottom-*
  theme: "glassmorphism",
  animation: "slide",                // default | slide | fade | pop | bounce
  closeButton: true,
  preventDuplicates: true,
  timeOut: 5000,
  pauseOnHover: true,
  gradientEnable: false,
  colorMode: false,
});
```

Need multiple independent configurations? Instantiate the class directly: `new ToastMagic({ theme: "neon" })`.

## React / Next.js

Works in any component or event handler — no provider or container component needed.

```jsx
// app/layout.tsx (Next.js App Router) — load the styles once
import "toaster-magic/css";
```

```jsx
"use client";
import { toastMagic } from "toaster-magic";

export function SaveButton() {
  return (
    <button onClick={() => toastMagic.success("Saved!", "Profile updated.")}>
      Save
    </button>
  );
}
```

Importing is SSR-safe; just make sure toasts are triggered from client-side code (event handlers, `useEffect`).

## Vue / Nuxt

```vue
<script setup>
import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

function save() {
  toastMagic.success("Saved!", "Your changes are live.");
}
</script>

<template>
  <button @click="save">Save</button>
</template>
```

For Nuxt, add the CSS globally in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ["toaster-magic/css"],
});
```

## CDN / no build step

```html
<link rel="stylesheet" href="https://unpkg.com/toaster-magic/dist/toaster-magic.min.css">
<script src="https://unpkg.com/toaster-magic/dist/toaster-magic.global.js"></script>
<script>
  toastMagic.success("Hello!", "It just works.");
</script>

<!-- Declarative triggers also work -->
<button
  data-toast-type="success"
  data-toast-heading="Copied"
  data-toast-description="Link copied to clipboard"
  data-toast-close-btn
>Copy</button>
```

jsDelivr works too: `https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.global.js`.

## API

| Method | Description |
| --- | --- |
| `toastMagic.success(heading, description?, options?)` | Show a success toast |
| `toastMagic.error(...)` / `.warning(...)` / `.info(...)` | Other types |
| `toastMagic.show({ type, heading, ... })` | Fully explicit form |
| `toastMagic.clear()` / `.dismissAll()` | Dismiss all visible toasts |
| `toastMagic.configure(options)` / `configure(options)` | Update the config |
| `toastMagic.getConfig()` | Read a copy of the active config |
| `new ToastMagic(options)` | Independent instance |

Legacy positional arguments from the Laravel asset — `success(heading, description, showCloseBtn, customBtnText, customBtnLink, timeOut, showDuration, avatar)` — are still supported.

### Toast options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `showCloseBtn` | `boolean` | config `closeButton` | Show a close button |
| `customBtnText` / `customBtnLink` | `string` | – | Action link button (both required) |
| `timeOut` | `number` | config `timeOut` (5000) | Auto-dismiss ms |
| `showDuration` | `number` | config `showDuration` (100) | Entrance delay ms |
| `avatar` | `string` | – | Image URL instead of the icon |
| `allowHtml` | `boolean` | `false` | Render heading/description as raw HTML (trusted content only) |

### Configuration options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `positionClass` | `ToastPosition` | `"toast-top-end"` | Corner the stack is anchored to |
| `theme` | `ToastTheme` | `"default"` | One of the 7 themes |
| `animation` | `ToastAnimation` | `"default"` | Entrance/exit animation |
| `closeButton` | `boolean` | `false` | Show a close button on every toast |
| `preventDuplicates` | `boolean` | `false` | Skip identical toasts already visible |
| `showDuration` | `number` | `100` | Entrance-animation delay in ms |
| `timeOut` | `number` | `5000` | Auto-dismiss timeout in ms |
| `pauseOnHover` | `boolean` | `true` | Pause the dismiss timer while hovered |
| `gradientEnable` | `boolean` | `false` | Gradient accent styling |
| `colorMode` | `boolean` | `false` | Colored toast background per type |

## Dark mode

Set `theme="dark"` on `<body>` (`<body theme="dark">`) and the toasts follow, or override the CSS custom properties (`--toast-item-bg`, `--toast-item-color`, …) yourself.

## FAQ

**Do I have to import the CSS?**
Yes — import `toaster-magic/css` once (or link the CDN stylesheet). The JS ships without inlined styles so you can tree-shake and theme freely.

**Is it safe to render user-provided text?**
Yes. Headings and descriptions are HTML-escaped by default. Only pass `allowHtml: true` for content you trust — raw HTML from users is an XSS risk. Action-button and avatar URLs are sanitized (only `http(s)://`, `/`, and `#` are allowed).

**Does it work with server-side rendering (Next.js / Nuxt)?**
Yes. Importing the package never touches the DOM; the container is created lazily the first time a toast is shown. Just trigger toasts from client-side code.

**How do I show multiple, independently-configured stacks?**
Create separate instances: `const errors = new ToastMagic({ theme: "neon", positionClass: "toast-bottom-end" })`.

**Can I use it without a bundler?**
Yes — drop in the CDN `<script>` and use the global `toastMagic`, or wire up `data-toast-*` attributes for zero-JS triggers.

**How big is it?**
Roughly 5 KB min+gzip for the JS, with zero runtime dependencies.

## Browser support

Works in all modern evergreen browsers (Chrome, Edge, Firefox, Safari). Animations use the CSS `translate` property and `matchMedia("prefers-reduced-motion")` is respected automatically.

## License

MIT © [Muhammad Rabiul](https://github.com/devrabiul)
