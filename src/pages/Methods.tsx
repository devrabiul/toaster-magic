import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2, H3 } from "../components/Heading";
import { METHODS } from "../data/reference";
import { routeByPath } from "../data/routes";

const TYPE_HELPERS = `toastMagic.success(heading, description?, options?);
toastMagic.error(heading, description?, options?);
toastMagic.warning(heading, description?, options?);
toastMagic.info(heading, description?, options?);`;

const SHOW = `toastMagic.show({
  type: "success",       // required: success | error | warning | info
  heading: "Saved",
  description: "All good.",
  showCloseBtn: true,
  timeOut: 6000,
});`;

const CLEAR = `toastMagic.clear();       // dismiss all visible toasts
toastMagic.dismissAll();  // alias for clear()`;

const CONFIGURE = `toastMagic
  .configure({ theme: "neon" })   // chainable — returns the instance
  .success("Chained", "Config applied then toast fired.");`;

const GET_CONFIG = `const config = toastMagic.getConfig();
// => { positionClass, theme, animation, timeOut, ... } (a copy)`;

export default function Methods() {
  return (
    <DocPage page={routeByPath("/docs/methods")!}>
      <h1>Methods</h1>
      <p className="lead">
        Every method available on the singleton and on <code>ToastMagic</code> instances.
      </p>

      <H2 id="overview">Overview</H2>
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Method</th>
              <th>Returns</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {METHODS.map((m) => (
              <tr key={m.signature}>
                <td className="col-name">
                  <code>{m.signature}</code>
                </td>
                <td className="col-type">
                  <code>{m.returns}</code>
                </td>
                <td>{m.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="type-helpers">Type helpers</H2>
      <p>
        The four shortcuts each set the toast <code>type</code> and forward to <code>show()</code>.
        They accept <code>(heading, description?, options?)</code>.
      </p>
      <CodeBlock code={TYPE_HELPERS} language="tsx" />
      <Callout kind="info">
        A legacy positional signature —{" "}
        <code>success(heading, description, showCloseBtn, customBtnText, customBtnLink, timeOut, showDuration, avatar)</code>{" "}
        — is still supported for compatibility with the Laravel asset.
      </Callout>

      <H2 id="show">show()</H2>
      <p>
        The primitive every helper calls. Use it when the <code>type</code> is dynamic. Returns{" "}
        <code>void</code>.
      </p>
      <CodeBlock code={SHOW} language="tsx" />

      <H2 id="clear">clear() &amp; dismissAll()</H2>
      <p>Dismiss every currently visible toast with the normal exit animation.</p>
      <CodeBlock code={CLEAR} language="tsx" />

      <H2 id="configure">configure()</H2>
      <p>
        Merge new options into the active config and re-style the live container. Returns the
        instance, so it's chainable.
      </p>
      <CodeBlock code={CONFIGURE} language="tsx" />

      <H3 id="get-config">getConfig()</H3>
      <p>Returns a copy of the active configuration object.</p>
      <CodeBlock code={GET_CONFIG} language="tsx" />
    </DocPage>
  );
}
