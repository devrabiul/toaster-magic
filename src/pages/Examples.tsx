import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { routeByPath } from "../data/routes";

const ACTION = `toastMagic.success("Order shipped", "Track your package anytime.", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
});`;

const AVATAR = `toastMagic.info("New message", "Sarah sent you a file.", {
  avatar: "/img/sarah.png",
});`;

const DUPLICATES = `import { configure } from "toaster-magic";

configure({ preventDuplicates: true });

// The second identical toast is skipped while the first is visible
toastMagic.error("Network error", "Retrying…");
toastMagic.error("Network error", "Retrying…");`;

const PERSISTENT = `// timeOut: 0 keeps the toast until dismissed
toastMagic.warning("Unsaved changes", "Save before leaving.", {
  timeOut: 0,
  showCloseBtn: true,
});`;

const PROMISE = `async function saveProfile(data) {
  try {
    await api.save(data);
    toastMagic.success("Saved", "Your profile is up to date.");
  } catch (err) {
    toastMagic.error("Save failed", err.message);
  }
}`;

const HTML = `// allowHtml renders raw markup — only for content YOU control
toastMagic.info("Deploy complete", "View the <strong>build log</strong>.", {
  allowHtml: true,
});`;

const FORM = `form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ok = await submit(new FormData(form));
  ok
    ? toastMagic.success("Sent!", "We'll be in touch shortly.")
    : toastMagic.error("Hmm", "Please check the highlighted fields.");
});`;

export default function Examples() {
  return (
    <DocPage page={routeByPath("/docs/examples")!}>
      <h1>Examples</h1>
      <p className="lead">
        Copy-paste recipes for the patterns you'll reach for most. Every snippet uses the real API —
        try the buttons below.
      </p>

      <TypeButtons config={{ closeButton: true }} />

      <H2 id="action-button">Action button</H2>
      <p>Give a toast a call-to-action link with both the text and the link:</p>
      <CodeBlock code={ACTION} language="tsx" />

      <H2 id="avatar">Avatar instead of an icon</H2>
      <p>
        Swap the type icon for an image — great for chat and social notifications:
      </p>
      <CodeBlock code={AVATAR} language="tsx" />

      <H2 id="duplicates">Prevent duplicates</H2>
      <p>Skip an identical toast (same type, heading, and description) while one is already visible:</p>
      <CodeBlock code={DUPLICATES} language="tsx" />

      <H2 id="persistent">Persistent toast</H2>
      <p>
        Keep a toast on screen until the user dismisses it with <code>timeOut: 0</code>:
      </p>
      <CodeBlock code={PERSISTENT} language="tsx" />

      <H2 id="async">Async / promise flows</H2>
      <p>Show success or error based on the result of an async operation:</p>
      <CodeBlock code={PROMISE} language="tsx" />

      <H2 id="forms">Form submission feedback</H2>
      <CodeBlock code={FORM} language="tsx" />

      <H2 id="html">Rich HTML content</H2>
      <p>
        Render markup in the heading or description with <code>allowHtml</code>:
      </p>
      <CodeBlock code={HTML} language="tsx" />
      <Callout kind="danger">
        Only enable <code>allowHtml</code> for content you fully control. Passing user-provided
        strings with <code>allowHtml: true</code> is an XSS risk — by default, text is escaped.
      </Callout>
    </DocPage>
  );
}
