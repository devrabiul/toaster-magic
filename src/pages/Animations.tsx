import { useState } from "react";
import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { ANIMATIONS } from "../data/reference";
import { routeByPath } from "../data/routes";

const CONFIGURE = `import { configure } from "toaster-magic";

configure({ animation: "bounce" });`;

const PER_TOAST = `// Animation is a config-level setting, so switch it before showing
configure({ animation: "pop" });
toastMagic.success("Pop!", "Scales in with a slight overshoot.");`;

export default function Animations() {
  const [animation, setAnimation] = useState("slide");

  return (
    <DocPage page={routeByPath("/docs/animations")!}>
      <h1>Animations</h1>
      <p className="lead">
        Choose how toasts enter and exit. On top of that, the stack reflows smoothly with a FLIP
        animation whenever toasts are added or removed.
      </p>

      <H2 id="preview">Live preview</H2>
      <p>Pick an animation and fire a few toasts in quick succession to see the stack reflow:</p>
      <div className="demo">
        <div className="demo__label">Animation</div>
        <div className="demo__row" style={{ marginBottom: 14 }}>
          {ANIMATIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="chip"
              data-active={animation === a.id}
              onClick={() => setAnimation(a.id)}
            >
              {a.name}
            </button>
          ))}
        </div>
        <TypeButtons config={{ animation: animation as any }} />
      </div>

      <H2 id="all">Available animations</H2>
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Animation</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {ANIMATIONS.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.name}</strong>
                </td>
                <td className="col-name">
                  <code>"{a.id}"</code>
                </td>
                <td>{a.blurb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="set">Setting the animation</H2>
      <CodeBlock code={CONFIGURE} language="tsx" />
      <p>Because animation is a configuration setting, switch it before showing a toast:</p>
      <CodeBlock code={PER_TOAST} language="tsx" />

      <H2 id="flip">The FLIP stack reflow</H2>
      <p>
        When multiple toasts are on screen and one is added or dismissed, the remaining toasts glide
        to their new positions instead of jumping. This uses the independent CSS{" "}
        <code>translate</code> property so it never fights the entrance/exit animation — a toast can
        slide in <em>and</em> reflow vertically at the same time.
      </p>

      <H2 id="reduced-motion">Reduced motion</H2>
      <p>
        Toaster Magic respects <code>prefers-reduced-motion</code>. When a visitor has reduced
        motion enabled, the reflow animation is skipped automatically and toasts appear without
        motion.
      </p>
      <Callout kind="tip">
        Pair an animation with a <Link to="/docs/positioning">position</Link> — a{" "}
        <code>slide</code> animation slides in from whichever edge the stack is anchored to.
      </Callout>
    </DocPage>
  );
}
