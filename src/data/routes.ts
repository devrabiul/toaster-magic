// Canonical route table — the single source of truth for the sidebar, search
// index, prev/next navigation, and the build-time sitemap. Keep it free of React
// imports so vite.config.ts can read it under Node during the build.

export interface RouteMeta {
  path: string;
  title: string;
  /** Sidebar label (defaults to title). */
  label?: string;
  description: string;
  section: string;
  keywords?: string[];
}

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Toaster Magic — Lightweight toast notifications",
    label: "Introduction",
    description:
      "A lightweight, dependency-free toast notification library with 7 beautiful themes, smooth animations, and full TypeScript support.",
    section: "Overview",
    keywords: ["toast", "notification", "intro", "overview", "home"],
  },

  {
    path: "/docs/getting-started",
    title: "Getting Started",
    description: "Everything you need to add Toaster Magic to your project in under a minute.",
    section: "Getting Started",
    keywords: ["start", "setup", "begin"],
  },
  {
    path: "/docs/installation",
    title: "Installation",
    description: "Install Toaster Magic with npm, pnpm, yarn, or a CDN script tag.",
    section: "Getting Started",
    keywords: ["install", "npm", "pnpm", "yarn", "cdn", "unpkg", "jsdelivr"],
  },
  {
    path: "/docs/quick-start",
    title: "Quick Start",
    description: "Fire your first toast in three lines of code.",
    section: "Getting Started",
    keywords: ["quick", "first toast", "hello world"],
  },
  {
    path: "/docs/basic-usage",
    title: "Basic Usage",
    description: "The four toast types, headings, descriptions, and per-toast options.",
    section: "Getting Started",
    keywords: ["usage", "success", "error", "warning", "info"],
  },

  {
    path: "/docs/themes",
    title: "Themes",
    description: "Seven built-in themes: default, material, iOS, glassmorphism, neon, minimal, and neumorphism.",
    section: "Guides",
    keywords: ["theme", "material", "ios", "glassmorphism", "neon", "minimal", "neumorphism", "style"],
  },
  {
    path: "/docs/animations",
    title: "Animations",
    description: "Entrance and exit animations plus the smooth FLIP stack reflow.",
    section: "Guides",
    keywords: ["animation", "slide", "fade", "pop", "bounce", "motion", "flip"],
  },
  {
    path: "/docs/positioning",
    title: "Positioning",
    description: "Anchor the toast stack to any of the six screen corners and edges.",
    section: "Guides",
    keywords: ["position", "top", "bottom", "corner", "placement"],
  },
  {
    path: "/docs/configuration",
    title: "Configuration",
    description: "Global defaults, multiple instances, and the window config object.",
    section: "Guides",
    keywords: ["configure", "config", "defaults", "global", "instance"],
  },
  {
    path: "/docs/dark-mode",
    title: "Dark Mode",
    description: "Follow the OS theme or drive dark mode yourself with CSS variables.",
    section: "Guides",
    keywords: ["dark", "light", "color scheme", "css variables"],
  },
  {
    path: "/docs/examples",
    title: "Examples",
    description: "Copy-paste recipes: action buttons, avatars, duplicates, custom timeouts, and more.",
    section: "Guides",
    keywords: ["examples", "recipes", "action button", "avatar", "playground"],
  },
  {
    path: "/docs/typescript",
    title: "TypeScript",
    description: "Exported types and fully typed configuration and options.",
    section: "Guides",
    keywords: ["typescript", "types", "typing", "interface"],
  },
  {
    path: "/docs/best-practices",
    title: "Best Practices",
    description: "Guidance on security, accessibility, timing, and UX for great notifications.",
    section: "Guides",
    keywords: ["best practices", "security", "xss", "accessibility", "ux"],
  },
  {
    path: "/docs/migration",
    title: "Migration Guide",
    description: "Move from Laravel Toaster Magic or a positional-argument API to the modern one.",
    section: "Guides",
    keywords: ["migration", "laravel", "upgrade", "legacy"],
  },

  {
    path: "/docs/frameworks/react",
    title: "React & Next.js",
    label: "React / Next.js",
    description: "Use Toaster Magic in React components and Next.js App Router — SSR safe.",
    section: "Frameworks",
    keywords: ["react", "nextjs", "next", "ssr", "hooks", "jsx"],
  },
  {
    path: "/docs/frameworks/vue",
    title: "Vue & Nuxt",
    label: "Vue / Nuxt",
    description: "Use Toaster Magic in Vue 3 single-file components and Nuxt.",
    section: "Frameworks",
    keywords: ["vue", "nuxt", "composition api", "sfc"],
  },
  {
    path: "/docs/frameworks/laravel",
    title: "Laravel",
    description: "The origin story and how the npm build maps to Laravel Toaster Magic.",
    section: "Frameworks",
    keywords: ["laravel", "blade", "php"],
  },
  {
    path: "/docs/frameworks/cdn",
    title: "CDN / No Build",
    label: "CDN / No Build",
    description: "Drop in a script tag and use the global toastMagic or data attributes.",
    section: "Frameworks",
    keywords: ["cdn", "script", "unpkg", "jsdelivr", "data attributes", "vanilla"],
  },

  {
    path: "/docs/api",
    title: "API Reference",
    description: "The complete public surface: exports, the singleton, and the class.",
    section: "API Reference",
    keywords: ["api", "reference", "exports", "toastMagic", "ToastMagic", "configure"],
  },
  {
    path: "/docs/methods",
    title: "Methods",
    description: "Every method: success, error, warning, info, show, clear, configure, getConfig.",
    section: "API Reference",
    keywords: ["methods", "show", "clear", "dismissAll", "getConfig"],
  },
  {
    path: "/docs/options",
    title: "Options",
    description: "All toast options and configuration options with types and defaults.",
    section: "API Reference",
    keywords: ["options", "config options", "toast options", "props", "parameters"],
  },

  {
    path: "/docs/faq",
    title: "FAQ",
    description: "Common questions about CSS, SSR, security, size, and multiple stacks.",
    section: "Help",
    keywords: ["faq", "questions", "help"],
  },
  {
    path: "/docs/troubleshooting",
    title: "Troubleshooting",
    description: "Fixes for the most common issues: missing styles, no toast, wrong position.",
    section: "Help",
    keywords: ["troubleshooting", "issues", "not working", "debug", "problem"],
  },
  {
    path: "/docs/changelog",
    title: "Changelog",
    description: "Release history for Toaster Magic.",
    section: "Help",
    keywords: ["changelog", "releases", "history", "versions"],
  },
  {
    path: "/docs/contributing",
    title: "Contributing",
    description: "How to report issues, build the package, and open a pull request.",
    section: "Help",
    keywords: ["contributing", "contribute", "development", "pull request"],
  },
  {
    path: "/docs/license",
    title: "License",
    description: "Toaster Magic is released under the MIT license.",
    section: "Help",
    keywords: ["license", "mit", "legal"],
  },
];

export const SECTION_ORDER = [
  "Overview",
  "Getting Started",
  "Guides",
  "Frameworks",
  "API Reference",
  "Help",
];

export interface NavSection {
  title: string;
  items: RouteMeta[];
}

export const NAV_SECTIONS: NavSection[] = SECTION_ORDER.map((title) => ({
  title,
  items: ROUTES.filter((r) => r.section === title),
}));

/** Flattened order used for prev/next paging (skips the Overview landing page). */
export const PAGE_ORDER: RouteMeta[] = ROUTES.filter((r) => r.path !== "/");

export function routeByPath(path: string): RouteMeta | undefined {
  return ROUTES.find((r) => r.path === path);
}
