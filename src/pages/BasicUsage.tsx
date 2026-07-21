import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { routeByPath } from "../data/routes";

const TYPES = `toastMagic.success("Saved", "Your profile is up to date.");
toastMagic.error("Failed", "Could not connect to the server.");
toastMagic.warning("Careful", "This action cannot be undone.");
toastMagic.info("Tip", "Press ? to see keyboard shortcuts.");`;

const HEADING_ONLY = `// Heading only — description is optional
toastMagic.success("Copied to clipboard");`;

const SHOW = `toastMagic.show({
  type: "success",
  heading: "Saved",
  description: "Everything is in sync.",
  showCloseBtn: true,
});`;

const CLEAR = `// Dismiss every visible toast
toastMagic.clear();

// dismissAll() is an alias
toastMagic.dismissAll();`;

const CLOSE_BTN = `toastMagic.info("Update available", "Reload to get the latest.", {
  showCloseBtn: true,
});`;

const ACTION = `toastMagic.success("Order shipped", "Your package is on the way.", {
  customBtnText: "Track order",
  customBtnLink: "/orders/42",
});`;

const TIMEOUT = `// Stays until dismissed (timeOut: 0)
toastMagic.warning("Session expiring", "Save your work.", { timeOut: 0 });

// Longer than the 5s default
toastMagic.info("Reading…", "Take your time.", { timeOut: 12000 });`;

export default function BasicUsage() {
  return (
    <DocPage page={routeByPath("/docs/basic-usage")!}>
      <h1>Basic Usage</h1>
      <p className="lead">
        The four toast types, headings and descriptions, the explicit <code>show()</code> form, and
        the most common per-toast options.
      </p>

      <H2 id="types">The four types</H2>
      <p>
        Each type helper takes <code>(heading, description?, options?)</code>:
      </p>
      <CodeBlock code={TYPES} language="tsx" />
      <TypeButtons />

      <H2 id="heading-only">Heading only</H2>
      <p>The description is optional. A single-line toast is perfectly valid:</p>
      <CodeBlock code={HEADING_ONLY} language="tsx" />

      <H2 id="show">The explicit show() form</H2>
      <p>
        Every helper is sugar over <code>show()</code>. Call it directly when the type is dynamic:
      </p>
      <CodeBlock code={SHOW} language="tsx" />

      <H2 id="close-button">Close button</H2>
      <p>
        Add a manual dismiss button with <code>showCloseBtn</code>:
      </p>
      <CodeBlock code={CLOSE_BTN} language="tsx" />

      <H2 id="action-button">Action button</H2>
      <p>
        Provide both <code>customBtnText</code> and <code>customBtnLink</code> to render an action
        link. URLs are sanitized — only <code>http(s)://</code>, <code>/</code>, and <code>#</code>{" "}
        are allowed.
      </p>
      <CodeBlock code={ACTION} language="tsx" />

      <H2 id="timeout">Custom timeout</H2>
      <p>
        Override the auto-dismiss timer per toast. Use <code>0</code> to keep a toast until it's
        dismissed manually.
      </p>
      <CodeBlock code={TIMEOUT} language="tsx" />

      <H2 id="clear">Dismiss toasts programmatically</H2>
      <CodeBlock code={CLEAR} language="tsx" />

      <Callout kind="info">
        Ready for more? Explore <Link to="/docs/examples">Examples</Link> for avatars, duplicate
        prevention, and richer recipes.
      </Callout>
    </DocPage>
  );
}
