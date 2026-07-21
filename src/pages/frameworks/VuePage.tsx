import { Callout } from "../../components/Callout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocPage } from "../../components/DocPage";
import { H2 } from "../../components/Heading";
import { TypeButtons } from "../../components/ToastDemo";
import { routeByPath } from "../../data/routes";

const SFC = `<script setup>
import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

function save() {
  toastMagic.success("Saved!", "Your changes are live.");
}
</script>

<template>
  <button @click="save">Save</button>
</template>`;

const NUXT = `// nuxt.config.ts
export default defineNuxtConfig({
  css: ["toaster-magic/css"],
});`;

const NUXT_USE = `<script setup>
import { toastMagic } from "toaster-magic";

function notify() {
  toastMagic.info("Nuxt", "Rendered on the server, toasted on the client.");
}
</script>

<template>
  <button @click="notify">Notify</button>
</template>`;

const CONFIG = `import { configure } from "toaster-magic";

configure({ theme: "ios", animation: "bounce" });`;

export default function VuePage() {
  return (
    <DocPage page={routeByPath("/docs/frameworks/vue")!}>
      <h1>Vue &amp; Nuxt</h1>
      <p className="lead">
        Works in any Vue 3 single-file component. Import the singleton and call it from a method or
        event handler.
      </p>

      <TypeButtons />

      <H2 id="sfc">Single-file component</H2>
      <CodeBlock code={SFC} language="html" filename="SaveButton.vue" />

      <H2 id="nuxt-css">Nuxt: load the CSS globally</H2>
      <p>
        Add the stylesheet in <code>nuxt.config.ts</code> so it's available app-wide:
      </p>
      <CodeBlock code={NUXT} language="ts" filename="nuxt.config.ts" />
      <CodeBlock code={NUXT_USE} language="html" />

      <H2 id="ssr">SSR safety</H2>
      <p>
        Importing the package during server rendering is safe — the DOM is only touched when a toast
        is shown.
      </p>
      <Callout kind="warning">
        Trigger toasts from client-side code (event handlers, <code>onMounted</code>), not during
        server render.
      </Callout>

      <H2 id="config">Global configuration</H2>
      <p>Configure once, for example in a Nuxt plugin or your app entry:</p>
      <CodeBlock code={CONFIG} language="ts" />
    </DocPage>
  );
}
