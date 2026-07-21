import { useState } from "react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { Playground } from "../components/ToastDemo";
import { Seo } from "../components/Seo";
import { routeByPath } from "../data/routes";

const FEATURES = [
  { icon: "🪶", title: "Tiny & dependency-free", desc: "~5 KB min+gzip with zero runtime dependencies. Tree-shakeable ESM." },
  { icon: "🎨", title: "7 beautiful themes", desc: "default, material, iOS, glassmorphism, neon, minimal, neumorphism." },
  { icon: "🎬", title: "Smooth animations", desc: "slide, fade, pop, bounce — plus a FLIP stack reflow when toasts stack." },
  { icon: "🌙", title: "Dark mode built in", desc: "Follows the OS, or drive it yourself with CSS custom properties." },
  { icon: "🧷", title: "SSR-safe", desc: "Import anywhere in Next.js or Nuxt — the DOM is only touched on show." },
  { icon: "🔒", title: "Secure by default", desc: "HTML is escaped and URLs are sanitized unless you explicitly opt in." },
  { icon: "📦", title: "ESM · CJS · CDN", desc: "Ship it any way you like, all with complete TypeScript types." },
  { icon: "⚛️", title: "Works everywhere", desc: "React, Vue, Next, Nuxt, Svelte, Angular, or plain JavaScript." },
];

const QUICK_CODE = `import { toastMagic } from "toaster-magic";
import "toaster-magic/css";

toastMagic.success("Success!", "Your data has been saved.");
toastMagic.error("Oops", "Something went wrong.");`;

export default function Home() {
  const home = routeByPath("/")!;
  const [copied, setCopied] = useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm install toaster-magic");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Seo title={home.title} description={home.description} path="/" keywords={home.keywords} />
      <div className="home">
        <section className="hero">
          <span className="hero__badge">🎉 v1.0 · MIT licensed · zero dependencies</span>
          <h1 className="hero__title">
            Toast notifications
            <br />
            that just feel <span className="grad">magic</span>
          </h1>
          <p className="hero__subtitle">
            A lightweight, dependency-free toast library with 7 beautiful themes, buttery
            animations, and full TypeScript support. Works with React, Vue, and everything else.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--primary" to="/docs/getting-started">
              Get Started →
            </Link>
            <a
              className="btn btn--ghost"
              href="https://github.com/devrabiul/toaster-magic"
              target="_blank"
              rel="noreferrer"
            >
              ★ Star on GitHub
            </a>
          </div>
          <div className="hero__install">
            <span style={{ color: "var(--text-faint)" }}>$</span>
            <span>npm install toaster-magic</span>
            <button onClick={copyInstall} aria-label="Copy install command">
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section__title">See it in action</h2>
          <p className="home-section__sub">
            Pick a theme, animation, and position, then fire a real toast. This playground uses the
            actual published package.
          </p>
          <Playground />
        </section>

        <section className="home-section">
          <h2 className="home-section__title">Three lines to your first toast</h2>
          <p className="home-section__sub">No providers, no containers, no boilerplate.</p>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <CodeBlock code={QUICK_CODE} language="tsx" filename="app.ts" />
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section__title">Everything you need</h2>
          <p className="home-section__sub">
            Batteries included, but small enough to forget it's there.
          </p>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <div className="feature__icon" aria-hidden="true">
                  {f.icon}
                </div>
                <p className="feature__title">{f.title}</p>
                <p className="feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section" style={{ textAlign: "center" }}>
          <h2 className="home-section__title">Ready to sprinkle some magic?</h2>
          <p className="home-section__sub">
            Read the guide, explore the API, or jump straight into examples.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--primary" to="/docs/quick-start">
              Quick Start →
            </Link>
            <Link className="btn btn--ghost" to="/docs/api">
              API Reference
            </Link>
          </div>
        </section>

        <footer className="home-footer">
          Built with ♥ by{" "}
          <a href="https://github.com/devrabiul" target="_blank" rel="noreferrer">
            Muhammad Rabiul
          </a>
          . Released under the MIT License.
        </footer>
      </div>
    </>
  );
}
