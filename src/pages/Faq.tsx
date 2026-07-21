import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const INSTANCE = `const errors = new ToastMagic({
  theme: "neon",
  positionClass: "toast-bottom-end",
});`;

export default function Faq() {
  return (
    <DocPage page={routeByPath("/docs/faq")!}>
      <h1>Frequently Asked Questions</h1>
      <p className="lead">Short answers to the questions that come up most.</p>

      <H2 id="css">Do I have to import the CSS?</H2>
      <p>
        Yes — import <code>toaster-magic/css</code> once (or link the CDN stylesheet). The JS ships
        without inlined styles so you can tree-shake and theme freely. Without it, toasts render
        unstyled.
      </p>

      <H2 id="safe">Is it safe to render user-provided text?</H2>
      <p>
        Yes. Headings and descriptions are HTML-escaped by default. Only pass{" "}
        <code>allowHtml: true</code> for content you trust — raw HTML from users is an XSS risk.
        Action-button and avatar URLs are sanitized (only <code>http(s)://</code>, <code>/</code>,
        and <code>#</code> are allowed).
      </p>

      <H2 id="ssr">Does it work with server-side rendering?</H2>
      <p>
        Yes. Importing the package never touches the DOM; the container is created lazily the first
        time a toast is shown. Just trigger toasts from client-side code. See the{" "}
        <Link to="/docs/frameworks/react">React</Link> and <Link to="/docs/frameworks/vue">Vue</Link>{" "}
        guides.
      </p>

      <H2 id="multiple">How do I show multiple, independently-configured stacks?</H2>
      <p>Create separate instances:</p>
      <CodeBlock code={INSTANCE} language="tsx" />

      <H2 id="bundler">Can I use it without a bundler?</H2>
      <p>
        Yes — drop in the CDN <code>&lt;script&gt;</code> and use the global{" "}
        <code>toastMagic</code>, or wire up <code>data-toast-*</code> attributes for zero-JS
        triggers. See <Link to="/docs/frameworks/cdn">CDN / No Build</Link>.
      </p>

      <H2 id="size">How big is it?</H2>
      <p>
        Roughly <strong>5 KB min+gzip</strong> for the JS, with zero runtime dependencies.
      </p>

      <H2 id="browsers">Which browsers are supported?</H2>
      <p>
        All modern evergreen browsers — Chrome, Edge, Firefox, and Safari. Animations use the CSS{" "}
        <code>translate</code> property, and <code>prefers-reduced-motion</code> is respected
        automatically.
      </p>

      <H2 id="reduced-motion">Does it respect reduced motion?</H2>
      <p>
        Yes. When a visitor enables "reduce motion" at the OS level, the FLIP stack reflow is
        skipped and toasts appear without extra animation.
      </p>
    </DocPage>
  );
}
