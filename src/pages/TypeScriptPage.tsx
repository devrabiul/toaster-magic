import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const IMPORTS = `import {
  toastMagic,
  ToastMagic,
  configure,
} from "toaster-magic";

import type {
  ToastType,
  ToastTheme,
  ToastPosition,
  ToastAnimation,
  ToastOptions,
  ToastMagicConfig,
  ShowOptions,
} from "toaster-magic";`;

const UNIONS = `type ToastType = "success" | "error" | "warning" | "info";

type ToastTheme =
  | "default" | "material" | "ios" | "glassmorphism"
  | "neon" | "minimal" | "neumorphism";

type ToastPosition =
  | "toast-top-start" | "toast-top-end" | "toast-top-center"
  | "toast-bottom-start" | "toast-bottom-end" | "toast-bottom-center";

type ToastAnimation = "default" | "slide" | "fade" | "pop" | "bounce";`;

const TYPED_CONFIG = `import { configure, type ToastMagicConfig } from "toaster-magic";

const config: Partial<ToastMagicConfig> = {
  theme: "neon",          // ✅ autocomplete + type-checked
  positionClass: "toast-bottom-end",
  timeOut: 6000,
};

configure(config);`;

const TYPED_OPTIONS = `import { toastMagic, type ToastOptions } from "toaster-magic";

const options: ToastOptions = {
  showCloseBtn: true,
  customBtnText: "Undo",
  customBtnLink: "#undo",
  timeOut: 8000,
};

toastMagic.success("Deleted", "Item moved to trash.", options);`;

const HELPER = `import { toastMagic, type ToastType } from "toaster-magic";

function notify(type: ToastType, heading: string, description?: string) {
  toastMagic[type](heading, description);
}

notify("success", "Done");`;

export default function TypeScriptPage() {
  return (
    <DocPage page={routeByPath("/docs/typescript")!}>
      <h1>TypeScript</h1>
      <p className="lead">
        Toaster Magic is written in TypeScript and ships complete type definitions. Every method,
        option, and config value is fully typed — no <code>@types</code> package needed.
      </p>

      <H2 id="imports">Value and type imports</H2>
      <p>Import runtime values and types from the same entry point:</p>
      <CodeBlock code={IMPORTS} language="ts" />

      <H2 id="unions">Exported union types</H2>
      <p>The string-literal unions give you autocomplete and compile-time safety:</p>
      <CodeBlock code={UNIONS} language="ts" />

      <H2 id="typed-config">Typing the config</H2>
      <p>
        Configuration accepts <code>Partial&lt;ToastMagicConfig&gt;</code>:
      </p>
      <CodeBlock code={TYPED_CONFIG} language="ts" />

      <H2 id="typed-options">Typing per-toast options</H2>
      <CodeBlock code={TYPED_OPTIONS} language="ts" />

      <H2 id="helper">Building typed helpers</H2>
      <p>
        Because the type helpers are keyed by <code>ToastType</code>, you can index into{" "}
        <code>toastMagic</code> with a typed variable:
      </p>
      <CodeBlock code={HELPER} language="ts" />

      <Callout kind="tip">
        See the full list of typed fields in the <Link to="/docs/options">Options</Link> reference.
      </Callout>
    </DocPage>
  );
}
