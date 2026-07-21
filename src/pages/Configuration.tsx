import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { PropsTable } from "../components/PropsTable";
import { CONFIG_OPTIONS } from "../data/reference";
import { routeByPath } from "../data/routes";

const CONFIGURE = `import { configure } from "toaster-magic";

configure({
  positionClass: "toast-bottom-end",
  theme: "glassmorphism",
  animation: "slide",
  closeButton: true,
  preventDuplicates: true,
  timeOut: 5000,
  pauseOnHover: true,
  gradientEnable: false,
  colorMode: false,
});`;

const GET_CONFIG = `const current = toastMagic.getConfig();
console.log(current.theme); // "glassmorphism"`;

const INSTANCE = `import { ToastMagic } from "toaster-magic";

const errors = new ToastMagic({
  theme: "neon",
  positionClass: "toast-bottom-start",
  timeOut: 0, // errors stay until dismissed
});

errors.error("Build failed", "See the console for details.");`;

const WINDOW = `<script>
  // Set before toaster-magic's global build loads
  window.toastMagicConfig = {
    theme: "material",
    positionClass: "toast-top-center",
    timeOut: 4000,
  };
</script>
<script src="https://unpkg.com/toaster-magic/dist/toaster-magic.global.js"></script>`;

export default function Configuration() {
  return (
    <DocPage page={routeByPath("/docs/configuration")!}>
      <h1>Configuration</h1>
      <p className="lead">
        Configure toasts globally, per instance, or through a window object for the CDN build.
      </p>

      <H2 id="configure">Global configuration</H2>
      <p>
        Call <code>configure()</code> once to set defaults for every toast from the shared
        singleton. Later calls merge on top of the current config.
      </p>
      <CodeBlock code={CONFIGURE} language="tsx" />
      <Callout kind="info">
        <code>configure()</code> is chainable and re-styles the live container immediately, so you
        can change the theme or position at runtime.
      </Callout>

      <H2 id="get-config">Reading the config</H2>
      <p>
        <code>getConfig()</code> returns a copy of the active configuration:
      </p>
      <CodeBlock code={GET_CONFIG} language="tsx" />

      <H2 id="instances">Independent instances</H2>
      <p>
        Need two toast stacks with different settings? Construct <code>ToastMagic</code> directly.
        Each instance keeps its own config but shares the same on-screen container region per
        position.
      </p>
      <CodeBlock code={INSTANCE} language="tsx" />

      <H2 id="window">Window config (CDN build)</H2>
      <p>
        The browser-global build reads <code>window.toastMagicConfig</code> on load, so you can
        configure it without any JavaScript module. Both camelCase and the Laravel-style{" "}
        <code>snake_case</code> keys (<code>gradient_enable</code>, <code>color_mode</code>) are
        accepted.
      </p>
      <CodeBlock code={WINDOW} language="html" />

      <H2 id="options">All configuration options</H2>
      <PropsTable rows={CONFIG_OPTIONS} nameHeader="Option" />

      <Callout kind="tip">
        For per-toast overrides (a single toast's timeout, close button, etc.), see the{" "}
        <Link to="/docs/options">Options</Link> reference.
      </Callout>
    </DocPage>
  );
}
