# Toaster Magic

Lightweight, dependency-free toast notifications with beautiful themes — the standalone JavaScript version of [Laravel Toaster Magic](https://github.com/devrabiul/toaster-magic). Works with **React**, **Vue**, **Next.js**, **Nuxt**, **Svelte**, or plain JavaScript.

- 🪶 Zero dependencies, ~5 KB min+gzip JS
- 🎨 7 themes: `default`, `material`, `ios`, `glassmorphism`, `neon`, `minimal`, `neumorphism`
- 🎬 Animations: `slide`, `fade`, `pop`, `bounce` + smooth FLIP stack reflow
- 🌙 Dark mode, gradient accents, colored mode, RTL-friendly positions
- 🧷 SSR-safe: import anywhere in Next.js / Nuxt — the DOM is only touched when a toast is shown
- 🔒 Escapes HTML by default; URLs are sanitized
- 📦 ESM + CJS + CDN builds, full TypeScript types

## Install

```bash
npm install toaster-magic
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

### Options per toast

```js
toastMagic.success("Order shipped", "Track your package anytime.", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
  timeOut: 8000,        // ms, overrides global
  avatar: "/img/courier.png",
});
```

### Global configuration

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

## API

| Method | Description |
| --- | --- |
| `toastMagic.success(heading, description?, options?)` | Show a success toast |
| `toastMagic.error(...)` / `.warning(...)` / `.info(...)` | Other types |
| `toastMagic.show({ type, heading, ... })` | Fully explicit form |
| `toastMagic.clear()` / `.dismissAll()` | Dismiss all visible toasts |
| `configure(options)` | Update the shared config |
| `new ToastMagic(options)` | Independent instance |

Legacy positional arguments from the Laravel asset — `success(heading, description, showCloseBtn, customBtnText, customBtnLink, timeOut, showDuration, avatar)` — are still supported.

### Toast options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `showCloseBtn` | `boolean` | config `closeButton` | Show a close button |
| `customBtnText` / `customBtnLink` | `string` | – | Action link button |
| `timeOut` | `number` | config `timeOut` (5000) | Auto-dismiss ms |
| `showDuration` | `number` | config `showDuration` (100) | Entrance delay ms |
| `avatar` | `string` | – | Image URL instead of the icon |
| `allowHtml` | `boolean` | `false` | Render heading/description as raw HTML (trusted content only) |

## Dark mode

Set `theme="dark"` on `<body>` (`<body theme="dark">`) and the toasts follow, or override the CSS custom properties (`--toast-item-bg`, `--toast-item-color`, …) yourself.

## License

MIT © [Muhammad Rabiul](https://github.com/devrabiul)
