import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { routeByPath } from "../data/routes";

const LEGACY = `// Legacy positional form (from the Laravel asset) — still works
toastMagic.success(
  "Order shipped",   // heading
  "On its way",      // description
  true,              // showCloseBtn
  "Track",           // customBtnText
  "/orders/42",      // customBtnLink
  8000,              // timeOut
  100,               // showDuration
  "/img/courier.png" // avatar
);`;

const MODERN = `// Modern options-object form — recommended
toastMagic.success("Order shipped", "On its way", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
  timeOut: 8000,
  showDuration: 100,
  avatar: "/img/courier.png",
});`;

const LARAVEL_BEFORE = `{{-- Laravel Blade with laravel-toaster-magic --}}
@include('toaster-magic::messages')`;

const LARAVEL_AFTER = `// The npm build reads the same window.toastMagicConfig object
window.toastMagicConfig = {
  positionClass: "toast-top-end",
  theme: "default",
  timeOut: 5000,
};`;

export default function Migration() {
  return (
    <DocPage page={routeByPath("/docs/migration")!}>
      <h1>Migration Guide</h1>
      <p className="lead">
        Toaster Magic is the standalone JavaScript build of{" "}
        <a href="https://github.com/devrabiul/laravel-toaster-magic" target="_blank" rel="noreferrer">
          Laravel Toaster Magic
        </a>
        . Migrating from the Laravel asset — or from the older positional API — is designed to be
        painless.
      </p>

      <H2 id="positional">From positional arguments</H2>
      <p>
        The original API took a long list of positional arguments. That form is{" "}
        <strong>still fully supported</strong> for backward compatibility:
      </p>
      <CodeBlock code={LEGACY} language="tsx" />
      <p>The modern equivalent uses an options object — clearer and order-independent:</p>
      <CodeBlock code={MODERN} language="tsx" />
      <Callout kind="tip">
        Both forms produce identical toasts. Migrate at your own pace — nothing breaks if you leave
        the positional calls in place.
      </Callout>

      <H2 id="laravel">From Laravel Toaster Magic</H2>
      <p>
        If you're moving a project off the Laravel package (or running both), the npm build reads
        the same <code>window.toastMagicConfig</code> object, including snake_case keys like{" "}
        <code>gradient_enable</code> and <code>color_mode</code>.
      </p>
      <CodeBlock code={LARAVEL_BEFORE} language="html" />
      <CodeBlock code={LARAVEL_AFTER} language="js" />

      <H2 id="global">Global compatibility</H2>
      <p>
        The CDN build exposes <code>window.ToastMagic</code> and <code>window.toastMagic</code>, and
        wires up <code>[data-toast-*]</code> click triggers — matching the Laravel asset's behavior,
        so existing markup keeps working.
      </p>

      <H2 id="checklist">Migration checklist</H2>
      <ul>
        <li>
          Install <code>toaster-magic</code> and import <code>toaster-magic/css</code>.
        </li>
        <li>
          Replace the bundled Laravel asset scripts with the npm import or the CDN{" "}
          <code>&lt;script&gt;</code>.
        </li>
        <li>Keep your existing config object — the keys carry over.</li>
        <li>Optionally modernize positional calls to the options-object form over time.</li>
      </ul>
    </DocPage>
  );
}
