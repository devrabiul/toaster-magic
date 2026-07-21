import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

// Brand mark — a stylized toast notification (no checkmark), with a gradient tile.
const LogoMark = () => (
  <svg
    className="navbar__logo"
    viewBox="0 0 32 32"
    width="30"
    height="30"
    role="img"
    aria-label="Toaster Magic logo"
  >
    <defs>
      <linearGradient id="tm-logo-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0ad18a" />
        <stop offset="1" stopColor="#10b7c9" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill="url(#tm-logo-grad)" />
    <rect x="6.5" y="11.5" width="19" height="9" rx="4.5" fill="#ffffff" opacity="0.96" />
    <circle cx="11" cy="16" r="1.9" fill="#0ad18a" />
    <rect x="14.5" y="14.4" width="8.5" height="1.7" rx="0.85" fill="#0ad18a" opacity="0.55" />
    <rect x="14.5" y="17.2" width="6" height="1.7" rx="0.85" fill="#0ad18a" opacity="0.35" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function Navbar({ onMenuClick, onSearchClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const isHome = useLocation().pathname === "/";

  // Add a subtle shadow once the page is scrolled, so the header lifts off the content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page the bar is transparent over the hero until scrolled.
  const className = [
    "navbar",
    isHome ? "navbar--home" : "",
    scrolled ? "navbar--scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <div className="navbar__inner">
      <button
        type="button"
        className="icon-btn navbar__menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <MenuIcon />
      </button>

      <Link to="/" className="navbar__brand">
        <LogoMark />
        <span className="navbar__brand-text">Toaster Magic</span>
        <span className="navbar__version">v1.0</span>
      </Link>

      <div className="navbar__spacer" />

      <button type="button" className="search-trigger" onClick={onSearchClick}>
        <SearchIcon />
        <span className="search-trigger__label">Search docs…</span>
        <span className="search-trigger__kbd">⌘K</span>
      </button>

      <nav className="navbar__links" aria-label="Primary">
        <Link className="navbar__link" to="/docs/getting-started">
          Docs
        </Link>
        <Link className="navbar__link" to="/docs/examples">
          Examples
        </Link>
        <a
          className="navbar__link"
          href="https://www.npmjs.com/package/toaster-magic"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </nav>

      <a
        className="icon-btn"
        href="https://github.com/devrabiul/toaster-magic"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub repository"
      >
        <GitHubIcon />
      </a>
      <ThemeToggle />
      </div>
    </header>
  );
}
