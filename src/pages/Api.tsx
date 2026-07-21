import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const EXPORTS = `import toastMagic, {        // default export = the singleton
  toastMagic,               // named singleton (same instance)
  ToastMagic,               // the class
  configure,                // configure the singleton
} from "toaster-magic";`;

const SINGLETON = `import { toastMagic } from "toaster-magic";

toastMagic.success("Hi");
toastMagic.configure({ theme: "neon" });
const config = toastMagic.getConfig();`;

const CLASS = `import { ToastMagic } from "toaster-magic";

const instance = new ToastMagic({
  theme: "glassmorphism",
  positionClass: "toast-bottom-end",
});

instance.info("Independent", "This instance has its own config.");`;

const CONFIGURE = `import { configure } from "toaster-magic";

// Equivalent to toastMagic.configure(...)
configure({ theme: "material" });`;

export default function Api() {
  return (
    <DocPage page={routeByPath("/docs/api")!}>
      <h1>API Reference</h1>
      <p className="lead">
        The complete public surface of Toaster Magic: what's exported, the shared singleton, and the
        class for independent instances.
      </p>

      <H2 id="exports">Exports</H2>
      <p>The package exports one value in several convenient forms plus the class:</p>
      <CodeBlock code={EXPORTS} language="tsx" />
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Export</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-name"><code>toastMagic</code></td>
              <td className="col-type"><code>ToastMagic</code></td>
              <td>Shared singleton — the instance most apps use. Also the default export.</td>
            </tr>
            <tr>
              <td className="col-name"><code>ToastMagic</code></td>
              <td className="col-type"><code>class</code></td>
              <td>Constructor for creating independent, separately-configured instances.</td>
            </tr>
            <tr>
              <td className="col-name"><code>configure</code></td>
              <td className="col-type"><code>(config) =&gt; ToastMagic</code></td>
              <td>Shorthand for configuring the shared singleton.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="singleton">The singleton</H2>
      <p>
        <code>toastMagic</code> is a ready-to-use instance created with the default config. Safe to
        import during SSR — it only touches the DOM when a toast is shown.
      </p>
      <CodeBlock code={SINGLETON} language="tsx" />

      <H2 id="class">The ToastMagic class</H2>
      <p>Construct the class directly for multiple, independently-configured stacks:</p>
      <CodeBlock code={CLASS} language="tsx" />

      <H2 id="configure">configure()</H2>
      <p>
        A convenience wrapper equal to calling <code>toastMagic.configure()</code>:
      </p>
      <CodeBlock code={CONFIGURE} language="tsx" />

      <Callout kind="info">
        Continue to the <Link to="/docs/methods">Methods</Link> reference for every callable, or{" "}
        <Link to="/docs/options">Options</Link> for all option fields and types.
      </Callout>
    </DocPage>
  );
}
