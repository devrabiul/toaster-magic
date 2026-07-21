import { useState } from "react";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { POSITIONS } from "../data/reference";
import { routeByPath } from "../data/routes";

const CONFIGURE = `import { configure } from "toaster-magic";

configure({ positionClass: "toast-bottom-end" });`;

export default function Positioning() {
  const [position, setPosition] = useState("toast-top-end");

  return (
    <DocPage page={routeByPath("/docs/positioning")!}>
      <h1>Positioning</h1>
      <p className="lead">
        Anchor the toast stack to any of six spots: the three top edges and the three bottom edges.
        The newest toast always appears closest to the anchored corner.
      </p>

      <H2 id="preview">Live preview</H2>
      <p>Pick a position, then fire a toast to see where it lands:</p>
      <div className="demo">
        <div className="demo__label">Position</div>
        <div className="demo__row" style={{ marginBottom: 14 }}>
          {POSITIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="chip"
              data-active={position === p.id}
              onClick={() => setPosition(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <TypeButtons config={{ positionClass: position as any }} />
      </div>

      <H2 id="values">Available positions</H2>
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Position</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {POSITIONS.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td className="col-name">
                  <code>"{p.id}"</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="set">Setting the position</H2>
      <CodeBlock code={CONFIGURE} language="tsx" />

      <H2 id="rtl">RTL support</H2>
      <p>
        The <code>start</code> and <code>end</code> position names are direction-aware. In a
        right-to-left layout (<code>dir="rtl"</code>), <code>toast-top-end</code> anchors to the
        left, so the stack always sits on the correct side for the reading direction.
      </p>

      <Callout kind="info">
        Stacking order follows the anchor: for top positions the newest toast is on top and older
        ones move down; for bottom positions the newest sits at the bottom and older ones move up.
      </Callout>
    </DocPage>
  );
}
