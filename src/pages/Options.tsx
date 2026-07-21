import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { PropsTable } from "../components/PropsTable";
import { CONFIG_OPTIONS, TOAST_OPTIONS } from "../data/reference";
import { routeByPath } from "../data/routes";

const TOAST_EXAMPLE = `toastMagic.success("Order shipped", "On its way!", {
  showCloseBtn: true,
  customBtnText: "Track",
  customBtnLink: "/orders/42",
  timeOut: 8000,
  avatar: "/img/courier.png",
});`;

const CONFIG_EXAMPLE = `configure({
  positionClass: "toast-bottom-end",
  theme: "glassmorphism",
  animation: "slide",
  closeButton: true,
  preventDuplicates: true,
  timeOut: 5000,
  pauseOnHover: true,
});`;

export default function Options() {
  return (
    <DocPage page={routeByPath("/docs/options")!}>
      <h1>Options</h1>
      <p className="lead">
        Two option sets: <strong>toast options</strong> passed per call, and{" "}
        <strong>configuration options</strong> that set global defaults.
      </p>

      <H2 id="toast-options">Toast options</H2>
      <p>
        Passed as the third argument to a type helper, or as fields on the <code>show()</code>{" "}
        object. They override the config for that single toast.
      </p>
      <CodeBlock code={TOAST_EXAMPLE} language="tsx" />
      <PropsTable rows={TOAST_OPTIONS} nameHeader="Option" />
      <Callout kind="warning">
        <code>customBtnText</code> and <code>customBtnLink</code> only render an action button when{" "}
        <strong>both</strong> are provided. <code>allowHtml</code> disables escaping — use it only
        with trusted content.
      </Callout>

      <H2 id="config-options">Configuration options</H2>
      <p>
        Set via <code>configure()</code>, the <code>ToastMagic</code> constructor, or{" "}
        <code>window.toastMagicConfig</code>. They apply to every toast until changed.
      </p>
      <CodeBlock code={CONFIG_EXAMPLE} language="tsx" />
      <PropsTable rows={CONFIG_OPTIONS} nameHeader="Option" />

      <Callout kind="info">
        For the exact TypeScript unions behind <code>ToastPosition</code>, <code>ToastTheme</code>,
        and <code>ToastAnimation</code>, see the <Link to="/docs/typescript">TypeScript</Link> page.
      </Callout>
    </DocPage>
  );
}
