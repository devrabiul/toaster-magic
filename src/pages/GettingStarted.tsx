import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { routeByPath } from "../data/routes";

const INSTALL = `npm install toaster-magic`;
const USAGE = `import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

toastMagic.success("Success!", "Your data has been saved.");`;

export default function GettingStarted() {
  return (
    <DocPage page={routeByPath("/docs/getting-started")!}>
      <h1>Getting Started</h1>
      <p className="lead">
        Toaster Magic is a lightweight, dependency-free toast notification library. Add it to any
        project — React, Vue, Next.js, Nuxt, Svelte, Angular, or plain HTML — in under a minute.
      </p>

      <H2 id="install">1. Install</H2>
      <p>Add the package from npm (or your package manager of choice):</p>
      <CodeBlock code={INSTALL} language="bash" />

      <H2 id="import">2. Import the JS and the CSS</H2>
      <p>
        The stylesheet ships separately so you can tree-shake and theme freely. Import it once,
        anywhere in your app.
      </p>
      <CodeBlock code={USAGE} language="tsx" />

      <Callout kind="warning">
        Don't forget the CSS import — <code>toaster-magic/css</code>. Without it, toasts render
        unstyled. See <Link to="/docs/troubleshooting">Troubleshooting</Link> if nothing appears.
      </Callout>

      <H2 id="fire">3. Fire a toast</H2>
      <p>That's it. Call one of the type helpers and a toast slides in.</p>
      <TypeButtons />

      <H2 id="next">Where to next</H2>
      <p>Pick your path:</p>
      <div className="card-grid">
        <Link className="card" to="/docs/installation">
          <p className="card__title">Installation →</p>
          <p className="card__desc">All install methods: npm, pnpm, yarn, and CDN.</p>
        </Link>
        <Link className="card" to="/docs/quick-start">
          <p className="card__title">Quick Start →</p>
          <p className="card__desc">A guided first-toast walkthrough.</p>
        </Link>
        <Link className="card" to="/docs/themes">
          <p className="card__title">Themes →</p>
          <p className="card__desc">Explore all seven built-in looks.</p>
        </Link>
        <Link className="card" to="/docs/api">
          <p className="card__title">API Reference →</p>
          <p className="card__desc">Every method, option, and type.</p>
        </Link>
      </div>
    </DocPage>
  );
}
