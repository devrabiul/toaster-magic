import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const NPM = `# npm
npm install toaster-magic

# pnpm
pnpm add toaster-magic

# yarn
yarn add toaster-magic

# bun
bun add toaster-magic`;

const ESM = `import { toastMagic } from "toaster-magic";
import "toaster-magic/css";`;

const CJS = `const { toastMagic } = require("toaster-magic");
require("toaster-magic/css");`;

const CSS_MIN = `import "toaster-magic/css/min";`;

const CDN = `<link rel="stylesheet" href="https://unpkg.com/toaster-magic/dist/toaster-magic.min.css">
<script src="https://unpkg.com/toaster-magic/dist/toaster-magic.global.js"></script>
<script>
  toastMagic.success("Hello!", "It just works.");
</script>`;

const JSDELIVR = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.min.css">
<script src="https://cdn.jsdelivr.net/npm/toaster-magic/dist/toaster-magic.global.js"></script>`;

export default function Installation() {
  return (
    <DocPage page={routeByPath("/docs/installation")!}>
      <h1>Installation</h1>
      <p className="lead">
        Toaster Magic ships as ESM, CommonJS, and a browser global — install it however your project
        is built.
      </p>

      <H2 id="package-manager">Package manager</H2>
      <p>Install from the npm registry with any package manager:</p>
      <CodeBlock code={NPM} language="bash" />

      <H2 id="esm">ES Modules</H2>
      <p>The modern default. Works with Vite, Webpack, Rollup, esbuild, and all bundlers:</p>
      <CodeBlock code={ESM} language="tsx" />

      <H2 id="cjs">CommonJS</H2>
      <p>
        The package exposes a CJS build for Node and older toolchains via the <code>require</code>{" "}
        condition:
      </p>
      <CodeBlock code={CJS} language="js" />

      <H2 id="css">Importing the CSS</H2>
      <p>
        The stylesheet is a separate entry point so it never gets bundled into your JS. Two variants
        are available:
      </p>
      <ul>
        <li>
          <code>toaster-magic/css</code> — the full, readable stylesheet.
        </li>
        <li>
          <code>toaster-magic/css/min</code> — the minified build for production.
        </li>
      </ul>
      <CodeBlock code={CSS_MIN} language="tsx" />
      <Callout kind="info">
        You only need to import the CSS <strong>once</strong> for your whole app — typically at the
        root entry file or layout.
      </Callout>

      <H2 id="cdn">CDN (no build step)</H2>
      <p>
        Drop in a script tag and the global <code>toastMagic</code> is ready. Great for prototypes,
        plain HTML pages, and server-rendered templates.
      </p>
      <CodeBlock code={CDN} language="html" />
      <p>jsDelivr works identically:</p>
      <CodeBlock code={JSDELIVR} language="html" />
      <Callout kind="tip">
        Pin a version in production, e.g.{" "}
        <code>https://unpkg.com/toaster-magic@1.0.1/dist/toaster-magic.global.js</code>, so a new
        release can't change behavior unexpectedly.
      </Callout>

      <H2 id="requirements">Requirements</H2>
      <p>
        Toaster Magic targets modern evergreen browsers (Chrome, Edge, Firefox, Safari). There are
        no peer dependencies and no framework requirement. See the{" "}
        <Link to="/docs/frameworks/react">Frameworks</Link> guides for framework-specific setup.
      </p>
    </DocPage>
  );
}
