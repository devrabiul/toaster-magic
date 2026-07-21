import { Callout } from "../../components/Callout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocPage } from "../../components/DocPage";
import { H2 } from "../../components/Heading";
import { routeByPath } from "../../data/routes";

const COMPOSER = `composer require devrabiul/laravel-toaster-magic`;

const NPM_IN_LARAVEL = `// resources/js/app.js (Vite)
import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

window.toastMagic = toastMagic;`;

const BLADE = `{{-- In a Blade view, after Vite has loaded app.js --}}
<button
  data-toast-type="success"
  data-toast-heading="Saved"
  data-toast-description="Your changes were stored"
  data-toast-close-btn
>Save</button>`;

const CONFIG = `<script>
  window.toastMagicConfig = {
    positionClass: "toast-top-end",
    theme: "default",
    timeOut: 5000,
    gradient_enable: false, // snake_case keys are accepted
    color_mode: false,
  };
</script>`;

export default function LaravelPage() {
  return (
    <DocPage page={routeByPath("/docs/frameworks/laravel")!}>
      <h1>Laravel</h1>
      <p className="lead">
        Toaster Magic began life as{" "}
        <a href="https://github.com/devrabiul/laravel-toaster-magic" target="_blank" rel="noreferrer">
          Laravel Toaster Magic
        </a>
        . This npm package is the framework-agnostic build of that same toast engine.
      </p>

      <Callout kind="info">
        For a full Laravel integration with server-side flash messages and Blade helpers, use the
        dedicated Composer package. Use this npm build when you want to trigger toasts from your own
        JavaScript.
      </Callout>

      <H2 id="composer">The Laravel package</H2>
      <p>Install the Laravel-specific package via Composer:</p>
      <CodeBlock code={COMPOSER} language="bash" />

      <H2 id="npm-in-laravel">Using the npm build with Vite</H2>
      <p>
        If your Laravel app bundles JavaScript with Vite, you can use this package directly. Expose
        the singleton on <code>window</code> so Blade templates can call it:
      </p>
      <CodeBlock code={NPM_IN_LARAVEL} language="js" filename="resources/js/app.js" />

      <H2 id="data-attributes">Declarative triggers in Blade</H2>
      <p>
        The browser-global build wires up <code>[data-toast-*]</code> click triggers, so you can
        fire toasts with zero custom JavaScript:
      </p>
      <CodeBlock code={BLADE} language="html" />

      <H2 id="config">Shared config object</H2>
      <p>
        Both packages read <code>window.toastMagicConfig</code>, including the snake_case keys from
        the Laravel asset:
      </p>
      <CodeBlock code={CONFIG} language="html" />
    </DocPage>
  );
}
