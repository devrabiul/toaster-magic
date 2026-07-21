import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const CLONE = `git clone https://github.com/devrabiul/toaster-magic.git
cd toaster-magic
npm install`;

const SCRIPTS = `npm run build      # bundle to dist/ with tsup (ESM, CJS, IIFE + CSS)
npm test           # run the vitest suite
npm run typecheck  # tsc --noEmit`;

const DOCS = `cd docs
npm install
npm run dev        # start the docs site locally
npm run build      # production build of the docs`;

export default function Contributing() {
  return (
    <DocPage page={routeByPath("/docs/contributing")!}>
      <h1>Contributing</h1>
      <p className="lead">
        Contributions are welcome — bug reports, docs fixes, and pull requests all help.
      </p>

      <H2 id="issues">Reporting issues</H2>
      <p>
        Found a bug or have a feature idea? Open an issue on{" "}
        <a href="https://github.com/devrabiul/toaster-magic/issues" target="_blank" rel="noreferrer">
          GitHub
        </a>
        . For bugs, a minimal reproduction (a CodeSandbox or a short snippet) makes fixes much
        faster.
      </p>

      <H2 id="setup">Local setup</H2>
      <p>Clone the repository and install dependencies:</p>
      <CodeBlock code={CLONE} language="bash" />

      <H2 id="scripts">Package scripts</H2>
      <CodeBlock code={SCRIPTS} language="bash" />

      <H2 id="docs">Working on the docs</H2>
      <p>
        This documentation site lives in the <code>docs/</code> directory and is a self-contained
        Vite + React app:
      </p>
      <CodeBlock code={DOCS} language="bash" />

      <H2 id="pr">Opening a pull request</H2>
      <ul>
        <li>Fork the repo and create a branch off <code>main</code>.</li>
        <li>Keep changes focused; add or update tests when you change behavior.</li>
        <li>
          Run <code>npm test</code> and <code>npm run typecheck</code> before pushing.
        </li>
        <li>Describe the motivation and the change in the PR description.</li>
      </ul>

      <H2 id="conduct">Be kind</H2>
      <p>
        Please be respectful and constructive in issues and reviews. Maintainers volunteer their
        time — a friendly tone goes a long way.
      </p>
    </DocPage>
  );
}
