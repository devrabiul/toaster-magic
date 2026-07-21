import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { routeByPath } from "../data/routes";

const STEP1 = `import { toastMagic } from "toaster-magic";
import "toaster-magic/css";`;

const STEP2 = `toastMagic.success("Success!", "Your data has been saved.");`;

const ALL_TYPES = `toastMagic.success("Success!", "Your data has been saved.");
toastMagic.error("Oops", "Something went wrong.");
toastMagic.warning("Heads up", "Storage almost full.");
toastMagic.info("FYI", "A new version is available.");`;

const WITH_OPTIONS = `toastMagic.success("Order shipped", "Track your package anytime.", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
  timeOut: 8000,
});`;

const CONFIGURE = `import { configure } from "toaster-magic";

configure({
  theme: "glassmorphism",
  animation: "slide",
  positionClass: "toast-bottom-end",
});`;

export default function QuickStart() {
  return (
    <DocPage page={routeByPath("/docs/quick-start")!}>
      <h1>Quick Start</h1>
      <p className="lead">Go from zero to your first toast in three steps.</p>

      <H2 id="step-1">Step 1 — Import</H2>
      <p>Bring in the singleton and the stylesheet:</p>
      <CodeBlock code={STEP1} language="tsx" />

      <H2 id="step-2">Step 2 — Show a toast</H2>
      <p>
        Call any type helper with a <strong>heading</strong> and an optional{" "}
        <strong>description</strong>:
      </p>
      <CodeBlock code={STEP2} language="tsx" />
      <TypeButtons />

      <H2 id="step-3">Step 3 — Try every type</H2>
      <p>There are four built-in types, each with its own icon and accent color:</p>
      <CodeBlock code={ALL_TYPES} language="tsx" />

      <H2 id="options">Add per-toast options</H2>
      <p>
        Pass a third argument to customize a single toast — close button, action link, timeout, and
        more:
      </p>
      <CodeBlock code={WITH_OPTIONS} language="tsx" />
      <Callout kind="tip">
        See every available option on the <Link to="/docs/options">Options</Link> page.
      </Callout>

      <H2 id="configure">Set global defaults</H2>
      <p>
        Call <code>configure()</code> once to change the look and behavior of every toast:
      </p>
      <CodeBlock code={CONFIGURE} language="tsx" />

      <Callout kind="info">
        Next: learn the <Link to="/docs/basic-usage">Basic Usage</Link> patterns, or explore all{" "}
        <Link to="/docs/themes">Themes</Link>.
      </Callout>
    </DocPage>
  );
}
