import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { routeByPath } from "../data/routes";

const ATTR = `<body theme="dark">
  <!-- toasts now render in dark mode -->
</body>`;

const TOGGLE = `function toggleTheme() {
  const isDark = document.body.getAttribute("theme") === "dark";
  document.body.setAttribute("theme", isDark ? "light" : "dark");
}`;

const OS = `// Follow the operating-system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.setAttribute("theme", prefersDark ? "dark" : "light");`;

const VARS = `:root {
  --toast-item-bg: #fff;
  --toast-item-color: #000;
}

body[theme="dark"] {
  --toast-item-bg: #101418;
  --toast-item-color: #e6edf3;
  --toast-magic-box-shadow: 0 0 30px rgba(255, 255, 255, 0.08);
}`;

export default function DarkMode() {
  return (
    <DocPage page={routeByPath("/docs/dark-mode")!}>
      <h1>Dark Mode</h1>
      <p className="lead">
        Toaster Magic reads a single <code>theme</code> attribute on <code>&lt;body&gt;</code>. Flip
        it and every toast follows — this docs site does exactly that.
      </p>

      <H2 id="preview">Live preview</H2>
      <p>
        Use the theme toggle in the top bar, then fire a toast — the toast styling tracks the page.
      </p>
      <TypeButtons config={{ closeButton: true }} />

      <H2 id="enable">Enabling dark mode</H2>
      <p>
        Set <code>theme="dark"</code> on the <code>&lt;body&gt;</code> element:
      </p>
      <CodeBlock code={ATTR} language="html" />

      <H2 id="toggle">Toggling at runtime</H2>
      <CodeBlock code={TOGGLE} language="js" />

      <H2 id="os">Following the OS preference</H2>
      <CodeBlock code={OS} language="js" />
      <Callout kind="tip">
        Set the attribute in an inline script in <code>&lt;head&gt;</code> before your app renders
        to avoid a flash of the wrong theme.
      </Callout>

      <H2 id="variables">Customizing with CSS variables</H2>
      <p>
        Prefer your own palette? Every color is a CSS custom property. Override them under{" "}
        <code>body[theme="dark"]</code> (or anywhere) to fully re-skin the toasts:
      </p>
      <CodeBlock code={VARS} language="css" />

      <Callout kind="info">
        Key variables include <code>--toast-item-bg</code>, <code>--toast-item-color</code>,{" "}
        <code>--toast-magic-box-shadow</code>, and the per-type accents like{" "}
        <code>--toast-magic-success</code>.
      </Callout>
    </DocPage>
  );
}
