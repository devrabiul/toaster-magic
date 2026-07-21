import { Callout } from "../components/Callout";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

export default function Changelog() {
  return (
    <DocPage page={routeByPath("/docs/changelog")!}>
      <h1>Changelog</h1>
      <p className="lead">Release history for Toaster Magic. Dates are approximate.</p>

      <H2 id="v1-0-1">1.0.1</H2>
      <ul>
        <li>Updated repository links and CSS asset names.</li>
        <li>Documentation and packaging polish.</li>
      </ul>

      <H2 id="v1-0-0">1.0.0</H2>
      <ul>
        <li>Initial public release of the standalone npm build.</li>
        <li>Four toast types: success, error, warning, info.</li>
        <li>
          Seven themes: default, material, iOS, glassmorphism, neon, minimal, neumorphism.
        </li>
        <li>Four animations plus a FLIP stack reflow that respects reduced motion.</li>
        <li>Six positions with RTL-aware start/end anchoring.</li>
        <li>ESM, CommonJS, and browser-global (CDN) builds with full TypeScript types.</li>
        <li>SSR-safe imports; HTML escaping and URL sanitization on by default.</li>
        <li>
          Backward-compatible positional API and <code>window.toastMagicConfig</code> support.
        </li>
      </ul>

      <Callout kind="info">
        The authoritative, always-current changelog lives with the{" "}
        <a
          href="https://github.com/devrabiul/toaster-magic/releases"
          target="_blank"
          rel="noreferrer"
        >
          GitHub releases
        </a>
        .
      </Callout>
    </DocPage>
  );
}
