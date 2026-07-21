import { Callout } from "../../components/Callout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocPage } from "../../components/DocPage";
import { H2 } from "../../components/Heading";
import { routeByPath } from "../../data/routes";

const UNPKG = `<link rel="stylesheet" href="https://unpkg.com/toaster-magic/dist/toaster-magic.min.css">
<script src="https://unpkg.com/toaster-magic/dist/toaster-magic.global.js"></script>

<script>
  toastMagic.success("Hello!", "It just works.");
</script>`;

const JSDELIVR = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.min.css">
<script src="https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.global.js"></script>`;

const DATA = `<button
  data-toast-type="success"
  data-toast-heading="Copied"
  data-toast-description="Link copied to clipboard"
  data-toast-close-btn
>Copy link</button>

<button
  data-toast-type="info"
  data-toast-heading="Learn more"
  data-toast-btn-text="Open docs"
  data-toast-btn-link="/docs"
>Info</button>`;

const GLOBAL = `// The global build exposes both a class and a ready-to-use instance
const custom = new window.ToastMagic({ theme: "neon" });
custom.error("Alert", "Something needs your attention.");

// window.toastMagic is the shared singleton
window.toastMagic.info("FYI", "Using the shared instance.");`;

const CONFIG = `<script>
  window.toastMagicConfig = { theme: "material", timeOut: 4000 };
</script>
<script src="https://unpkg.com/toaster-magic/dist/toaster-magic.global.js"></script>`;

export default function CdnPage() {
  return (
    <DocPage page={routeByPath("/docs/frameworks/cdn")!}>
      <h1>CDN / No Build</h1>
      <p className="lead">
        No bundler, no package manager — just a script tag. Perfect for plain HTML, prototypes, and
        server-rendered pages.
      </p>

      <H2 id="unpkg">unpkg</H2>
      <CodeBlock code={UNPKG} language="html" />

      <H2 id="jsdelivr">jsDelivr</H2>
      <CodeBlock code={JSDELIVR} language="html" />

      <H2 id="data-attributes">Data-attribute triggers</H2>
      <p>
        The global build listens for clicks on any element with <code>data-toast-type</code>. Fire
        toasts declaratively — no JavaScript required:
      </p>
      <CodeBlock code={DATA} language="html" />
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-name"><code>data-toast-type</code></td>
              <td>success · error · warning · info (defaults to info)</td>
            </tr>
            <tr>
              <td className="col-name"><code>data-toast-heading</code></td>
              <td>The bold title line</td>
            </tr>
            <tr>
              <td className="col-name"><code>data-toast-description</code></td>
              <td>The secondary line</td>
            </tr>
            <tr>
              <td className="col-name"><code>data-toast-close-btn</code></td>
              <td>Presence adds a close button</td>
            </tr>
            <tr>
              <td className="col-name"><code>data-toast-btn-text</code></td>
              <td>Action button label</td>
            </tr>
            <tr>
              <td className="col-name"><code>data-toast-btn-link</code></td>
              <td>Action button URL</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="global-api">The global API</H2>
      <CodeBlock code={GLOBAL} language="js" />

      <H2 id="config">Configuring the global build</H2>
      <p>
        Set <code>window.toastMagicConfig</code> before the script loads:
      </p>
      <CodeBlock code={CONFIG} language="html" />

      <Callout kind="tip">
        Pin a version (e.g. <code>toaster-magic@1.0.1</code>) in production so an upstream release
        can't change behavior unexpectedly.
      </Callout>
    </DocPage>
  );
}
