import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const CSS = `import "toaster-magic/css";`;

const CLIENT = `"use client"; // Next.js App Router
import { toastMagic } from "toaster-magic";`;

const POSITION = `configure({ positionClass: "toast-bottom-end" });`;

const ZINDEX = `.toast-container {
  --tm-toast-z-index: 99999;
}`;

export default function Troubleshooting() {
  return (
    <DocPage page={routeByPath("/docs/troubleshooting")!}>
      <h1>Troubleshooting</h1>
      <p className="lead">Fixes for the issues people hit most often.</p>

      <H2 id="unstyled">Toasts appear unstyled or plain</H2>
      <p>
        The CSS isn't loaded. Import the stylesheet once at your app root:
      </p>
      <CodeBlock code={CSS} language="tsx" />
      <p>
        With the CDN build, make sure the <code>&lt;link&gt;</code> to{" "}
        <code>toaster-magic.min.css</code> is present.
      </p>

      <H2 id="nothing">Nothing happens when I call a toast</H2>
      <ul>
        <li>
          <strong>Running during SSR?</strong> Toasts are no-ops on the server — call them from an
          event handler or effect on the client.
        </li>
        <li>
          <strong>Next.js App Router?</strong> The component must be a client component:
        </li>
      </ul>
      <CodeBlock code={CLIENT} language="tsx" />
      <Callout kind="info">
        <code>show()</code> silently returns when <code>document</code> is undefined, so a
        server-side call won't throw — it just does nothing.
      </Callout>

      <H2 id="position">Toasts show in the wrong corner</H2>
      <p>
        Set <code>positionClass</code> in your config. Valid values are the six{" "}
        <Link to="/docs/positioning">position</Link> strings:
      </p>
      <CodeBlock code={POSITION} language="tsx" />

      <H2 id="hidden">Toasts are hidden behind other elements</H2>
      <p>
        Another element has a higher stacking context. Raise the toast container's z-index via its
        CSS variable:
      </p>
      <CodeBlock code={ZINDEX} language="css" />

      <H2 id="duplicates">The same toast fires twice</H2>
      <p>
        In React 18 Strict Mode, effects run twice in development. Either fire toasts from event
        handlers, or enable <code>preventDuplicates</code> in your config. This does not happen in
        production builds.
      </p>

      <H2 id="html">My HTML shows as plain text</H2>
      <p>
        That's the secure default — text is escaped. Pass <code>allowHtml: true</code> for trusted
        content only (see <Link to="/docs/best-practices">Best Practices</Link>).
      </p>

      <Callout kind="tip">
        Still stuck? Open an issue on{" "}
        <a href="https://github.com/devrabiul/toaster-magic/issues" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        with a minimal reproduction.
      </Callout>
    </DocPage>
  );
}
