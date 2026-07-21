import { useState } from "react";
import { Link } from "react-router-dom";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { DocPage } from "../components/DocPage";
import { H2 } from "../components/Heading";
import { TypeButtons } from "../components/ToastDemo";
import { THEMES } from "../data/reference";
import { routeByPath } from "../data/routes";

const CONFIGURE = `import { configure } from "toaster-magic";

configure({ theme: "glassmorphism" });`;

const PER_INSTANCE = `import { ToastMagic } from "toaster-magic";

const neon = new ToastMagic({ theme: "neon" });
neon.error("Critical", "GPU temperature too high.");`;

const GRADIENT = `configure({ theme: "material", gradientEnable: true });`;

const COLOR_MODE = `configure({ colorMode: true });`;

export default function Themes() {
  const [theme, setTheme] = useState("glassmorphism");

  return (
    <DocPage page={routeByPath("/docs/themes")!}>
      <h1>Themes</h1>
      <p className="lead">
        Seven hand-crafted themes ship in the box. Set one globally, or give different instances
        different looks.
      </p>

      <H2 id="preview">Live preview</H2>
      <p>Pick a theme, then fire a toast to see it applied instantly:</p>
      <div className="demo">
        <div className="demo__label">Theme</div>
        <div className="demo__row" style={{ marginBottom: 14 }}>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className="chip"
              data-active={theme === t.id}
              onClick={() => setTheme(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <TypeButtons config={{ theme: theme as any, closeButton: true }} />
      </div>

      <H2 id="all-themes">All themes</H2>
      <div className="table-wrap">
        <table className="props">
          <thead>
            <tr>
              <th>Theme</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {THEMES.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong>{t.name}</strong>
                </td>
                <td className="col-name">
                  <code>"{t.id}"</code>
                </td>
                <td>{t.blurb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="set-theme">Setting a theme</H2>
      <p>
        Set the theme globally with <code>configure()</code>:
      </p>
      <CodeBlock code={CONFIGURE} language="tsx" />
      <p>Or give an independent instance its own theme:</p>
      <CodeBlock code={PER_INSTANCE} language="tsx" />

      <H2 id="gradient">Gradient accents</H2>
      <p>
        The <code>default</code>, <code>material</code>, <code>ios</code>,{" "}
        <code>glassmorphism</code>, and <code>neon</code> themes support a subtle gradient wash via{" "}
        <code>gradientEnable</code>:
      </p>
      <CodeBlock code={GRADIENT} language="tsx" />

      <H2 id="color-mode">Colored mode</H2>
      <p>
        Turn on <code>colorMode</code> to give each toast a full background tint matching its type
        instead of a neutral card:
      </p>
      <CodeBlock code={COLOR_MODE} language="tsx" />

      <Callout kind="tip">
        Themes and <Link to="/docs/dark-mode">dark mode</Link> compose — every theme adapts when the
        page switches to <code>theme="dark"</code>.
      </Callout>
    </DocPage>
  );
}
