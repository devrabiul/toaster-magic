import { Callout } from "../../components/Callout";
import { CodeBlock } from "../../components/CodeBlock";
import { DocPage } from "../../components/DocPage";
import { H2 } from "../../components/Heading";
import { TypeButtons } from "../../components/ToastDemo";
import { routeByPath } from "../../data/routes";

const CSS = `// app/layout.tsx (Next.js App Router) — or your root entry
import "toaster-magic/css";`;

const COMPONENT = `"use client";
import { toastMagic } from "toaster-magic";

export function SaveButton() {
  return (
    <button onClick={() => toastMagic.success("Saved!", "Profile updated.")}>
      Save
    </button>
  );
}`;

const HOOK = `"use client";
import { useEffect } from "react";
import { toastMagic } from "toaster-magic";

export function WelcomeToast() {
  useEffect(() => {
    toastMagic.info("Welcome back", "You have 3 new messages.");
  }, []);
  return null;
}`;

const CONFIG = `"use client";
import { configure } from "toaster-magic";

// Run once, e.g. in a top-level client component
configure({ theme: "material", positionClass: "toast-bottom-end" });`;

export default function ReactPage() {
  return (
    <DocPage page={routeByPath("/docs/frameworks/react")!}>
      <h1>React &amp; Next.js</h1>
      <p className="lead">
        No provider, no context, no container component. Import the singleton and call it from any
        component or event handler.
      </p>

      <TypeButtons />

      <H2 id="css">Load the CSS once</H2>
      <p>Import the stylesheet at your app root — in Next.js App Router, the root layout:</p>
      <CodeBlock code={CSS} language="tsx" filename="app/layout.tsx" />

      <H2 id="event-handler">In an event handler</H2>
      <CodeBlock code={COMPONENT} language="tsx" />

      <H2 id="effects">In an effect</H2>
      <p>Trigger a toast on mount or when data changes:</p>
      <CodeBlock code={HOOK} language="tsx" />

      <H2 id="ssr">Server-side rendering</H2>
      <p>
        Importing Toaster Magic is <strong>SSR-safe</strong> — it never touches the DOM until a
        toast is shown. The container is created lazily on the first call.
      </p>
      <Callout kind="warning">
        Just make sure toasts are triggered from client-side code — an event handler or{" "}
        <code>useEffect</code>. In Next.js App Router, mark the component{" "}
        <code>"use client"</code>.
      </Callout>

      <H2 id="config">Global configuration</H2>
      <p>Configure once from a top-level client component:</p>
      <CodeBlock code={CONFIG} language="tsx" />

      <Callout kind="tip">
        The same patterns apply to Remix, Gatsby, and any React setup — the only rule is "trigger on
        the client."
      </Callout>
    </DocPage>
  );
}
