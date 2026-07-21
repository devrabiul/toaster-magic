import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const ESCAPE = `// ✅ Safe — user text is escaped by default
toastMagic.info("New comment", userComment);

// 🛑 Dangerous — only with content you fully control
toastMagic.info("New comment", userComment, { allowHtml: true });`;

const DEDUPE = `configure({ preventDuplicates: true });`;

const TIMING = `// Short + non-critical → quick auto-dismiss
toastMagic.success("Copied");

// Important / actionable → keep it until acknowledged
toastMagic.error("Payment failed", "Update your card.", {
  timeOut: 0,
  showCloseBtn: true,
});`;

export default function BestPractices() {
  return (
    <DocPage page={routeByPath("/docs/best-practices")!}>
      <h1>Best Practices</h1>
      <p className="lead">
        Small habits that make notifications feel trustworthy, accessible, and calm rather than
        noisy.
      </p>

      <H2 id="security">Security: keep escaping on</H2>
      <p>
        Headings and descriptions are HTML-escaped by default, and action/avatar URLs are sanitized
        (only <code>http(s)://</code>, <code>/</code>, and <code>#</code> are allowed). Only reach
        for <code>allowHtml</code> with static, trusted strings.
      </p>
      <CodeBlock code={ESCAPE} language="tsx" />
      <Callout kind="danger">
        Never pass user-generated content with <code>allowHtml: true</code> — it opens an XSS hole.
      </Callout>

      <H2 id="accessibility">Accessibility</H2>
      <p>
        Every toast is rendered with <code>role="alert"</code>, <code>aria-live="assertive"</code>,
        and <code>aria-atomic="true"</code>, so screen readers announce it. To keep that useful:
      </p>
      <ul>
        <li>Write clear, self-contained headings — they're read aloud immediately.</li>
        <li>
          Don't hide critical actions <em>only</em> inside a toast that auto-dismisses; provide a
          persistent path too.
        </li>
        <li>
          Give important or actionable toasts a longer <code>timeOut</code> (or <code>0</code>) plus
          a close button.
        </li>
      </ul>

      <H2 id="timing">Timing</H2>
      <p>Match the lifespan of a toast to its importance:</p>
      <CodeBlock code={TIMING} language="tsx" />
      <p>
        <code>pauseOnHover</code> is on by default, so users get more time to read when they move
        the pointer over a toast.
      </p>

      <H2 id="duplicates">Avoid notification spam</H2>
      <p>
        Enable <code>preventDuplicates</code> for retry loops and rapid events so identical toasts
        don't pile up:
      </p>
      <CodeBlock code={DEDUPE} language="tsx" />

      <H2 id="content">Write good copy</H2>
      <ul>
        <li>
          <strong>Heading</strong>: what happened, in a few words ("Saved", "Upload failed").
        </li>
        <li>
          <strong>Description</strong>: the useful detail or next step, not a restatement.
        </li>
        <li>Prefer plain language over error codes; link to details when needed.</li>
      </ul>

      <Callout kind="tip">
        Considering multiple stacks (e.g. errors bottom-left, info top-right)? Create separate{" "}
        <Link to="/docs/configuration">instances</Link> so each has its own defaults.
      </Callout>
    </DocPage>
  );
}
