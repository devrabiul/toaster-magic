import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";

const Home = lazy(() => import("./pages/Home"));
const GettingStarted = lazy(() => import("./pages/GettingStarted"));
const Installation = lazy(() => import("./pages/Installation"));
const QuickStart = lazy(() => import("./pages/QuickStart"));
const BasicUsage = lazy(() => import("./pages/BasicUsage"));
const Themes = lazy(() => import("./pages/Themes"));
const Animations = lazy(() => import("./pages/Animations"));
const Positioning = lazy(() => import("./pages/Positioning"));
const Configuration = lazy(() => import("./pages/Configuration"));
const DarkMode = lazy(() => import("./pages/DarkMode"));
const Examples = lazy(() => import("./pages/Examples"));
const TypeScriptPage = lazy(() => import("./pages/TypeScriptPage"));
const BestPractices = lazy(() => import("./pages/BestPractices"));
const Migration = lazy(() => import("./pages/Migration"));
const ReactPage = lazy(() => import("./pages/frameworks/ReactPage"));
const VuePage = lazy(() => import("./pages/frameworks/VuePage"));
const LaravelPage = lazy(() => import("./pages/frameworks/LaravelPage"));
const CdnPage = lazy(() => import("./pages/frameworks/CdnPage"));
const Api = lazy(() => import("./pages/Api"));
const Methods = lazy(() => import("./pages/Methods"));
const Options = lazy(() => import("./pages/Options"));
const Faq = lazy(() => import("./pages/Faq"));
const Troubleshooting = lazy(() => import("./pages/Troubleshooting"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Contributing = lazy(() => import("./pages/Contributing"));
const License = lazy(() => import("./pages/License"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Scrolls to top on route change, or to the anchored heading if the URL has a hash. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // ⌘K / Ctrl+K opens search; "/" opens it when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (
        e.key === "/" &&
        !searchOpen &&
        !/^(input|textarea|select)$/i.test((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar
        onMenuClick={() => setSidebarOpen((o) => !o)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {isHome ? (
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
      ) : (
        <div className="layout">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/docs/getting-started" element={<GettingStarted />} />
                <Route path="/docs/installation" element={<Installation />} />
                <Route path="/docs/quick-start" element={<QuickStart />} />
                <Route path="/docs/basic-usage" element={<BasicUsage />} />
                <Route path="/docs/themes" element={<Themes />} />
                <Route path="/docs/animations" element={<Animations />} />
                <Route path="/docs/positioning" element={<Positioning />} />
                <Route path="/docs/configuration" element={<Configuration />} />
                <Route path="/docs/dark-mode" element={<DarkMode />} />
                <Route path="/docs/examples" element={<Examples />} />
                <Route path="/docs/typescript" element={<TypeScriptPage />} />
                <Route path="/docs/best-practices" element={<BestPractices />} />
                <Route path="/docs/migration" element={<Migration />} />
                <Route path="/docs/frameworks/react" element={<ReactPage />} />
                <Route path="/docs/frameworks/vue" element={<VuePage />} />
                <Route path="/docs/frameworks/laravel" element={<LaravelPage />} />
                <Route path="/docs/frameworks/cdn" element={<CdnPage />} />
                <Route path="/docs/api" element={<Api />} />
                <Route path="/docs/methods" element={<Methods />} />
                <Route path="/docs/options" element={<Options />} />
                <Route path="/docs/faq" element={<Faq />} />
                <Route path="/docs/troubleshooting" element={<Troubleshooting />} />
                <Route path="/docs/changelog" element={<Changelog />} />
                <Route path="/docs/contributing" element={<Contributing />} />
                <Route path="/docs/license" element={<License />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </div>
  );
}

function PageLoader() {
  return (
    <div className="content-wrap">
      <div className="content" style={{ opacity: 0.5 }}>
        Loading…
      </div>
    </div>
  );
}
