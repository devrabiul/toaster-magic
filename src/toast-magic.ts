import { getToasterIcon } from "./icons";
import type {
  ShowOptions,
  ToastMagicConfig,
  ToastOptions,
  ToastType,
} from "./types";

const POSITION_CLASSES = [
  "toast-top-start",
  "toast-top-end",
  "toast-top-center",
  "toast-bottom-start",
  "toast-bottom-end",
  "toast-bottom-center",
];

const DEFAULT_CONFIG: ToastMagicConfig = {
  positionClass: "toast-top-end",
  closeButton: false,
  preventDuplicates: false,
  showDuration: 100,
  timeOut: 5000,
  theme: "default",
  animation: "default",
  pauseOnHover: true,
  gradientEnable: false,
  colorMode: false,
};

const isBrowser = () => typeof document !== "undefined";

function sanitizeUrl(url?: string): string {
  if (!url || !/^(https?:\/\/|\/|#)/.test(url)) return "#";
  return url;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ReflowElement = HTMLElement & { _tmReflowCleanup?: ((event: TransitionEvent) => void) | null };

// When a toast is added or removed, the others glide to their new positions
// instead of jumping (FLIP). Reflow uses the independent `translate` CSS property
// so it never fights the entrance/exit animation, which uses `transform` — that
// means a toast can slide in AND reflow vertically at the same time without conflict.
function flipReflow(container: HTMLElement | null, mutate: () => void): void {
  if (
    !container ||
    (typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    mutate();
    return;
  }

  // Keep the entrance/exit (`transform`, `opacity`) animating while `translate` reflows.
  const reflowTransition =
    "translate .5s cubic-bezier(0.22, 0.61, 0.36, 1), transform .5s ease-in-out, opacity .5s ease-in-out";

  const snapshot = Array.from(container.querySelectorAll<ReflowElement>(".toast-item"))
    .filter((el) => !el.dataset.tmClosing)
    .map((el) => ({ el, top: el.getBoundingClientRect().top }));

  mutate();

  snapshot.forEach(({ el, top }) => {
    if (!el.isConnected) return;

    // Cancel any reflow still animating on this element so its stale
    // transitionend cleanup can't wipe the new one mid-glide — that race
    // is what made the stack teleport when entrances and exits overlapped.
    if (el._tmReflowCleanup) {
      el.removeEventListener("transitionend", el._tmReflowCleanup);
      el._tmReflowCleanup = null;
    }

    // Measure the true post-mutate layout position with our own offset
    // removed, so an in-progress glide isn't double-counted into delta.
    el.style.transition = "none";
    el.style.translate = "0px";
    const delta = top - el.getBoundingClientRect().top;
    if (!delta) {
      el.style.transition = "";
      el.style.translate = "";
      return;
    }

    // Invert: offset to the old position instantly via the independent `translate`...
    el.style.translate = `0 ${delta}px`;
    void el.offsetHeight; // flush the inverted position before playing

    // ...then play: glide to the new position without touching `transform`.
    requestAnimationFrame(() => {
      el.style.transition = reflowTransition;
      el.style.translate = "0 0";
      const cleanup = (event: TransitionEvent) => {
        if (event.propertyName !== "translate") return;
        el.style.transition = "";
        el.style.translate = "";
        el.removeEventListener("transitionend", cleanup);
        el._tmReflowCleanup = null;
      };
      el._tmReflowCleanup = cleanup;
      el.addEventListener("transitionend", cleanup);
    });
  });
}

function closeToastItem(toast: HTMLElement): void {
  if (toast.dataset.tmClosing) return; // guard against double-close
  toast.dataset.tmClosing = "1";

  const container = toast.closest<HTMLElement>(".toast-container");

  // Pin the closing toast in place (out of flow) so the flex gap collapses
  // immediately, then glide the remaining toasts up to fill the space — all
  // while it slides/fades out. Keeps the stack moving smoothly and continuously.
  flipReflow(container, () => {
    const rect = toast.getBoundingClientRect();
    toast.style.translate = ""; // drop any in-progress reflow offset
    toast.style.position = "fixed";
    toast.style.top = rect.top + "px";
    toast.style.left = rect.left + "px";
    toast.style.width = rect.width + "px";
    toast.style.height = rect.height + "px";
    toast.style.margin = "0";
  });

  toast.classList.remove("show");
  setTimeout(() => toast.remove(), 500);
}

/**
 * Positional-argument form kept for compatibility with the Laravel asset:
 * (heading, description, showCloseBtn, customBtnText, customBtnLink, timeOut, showDuration, avatar)
 * The modern form is (heading, description?, options?).
 */
type ToastArgs =
  | [heading?: string, description?: string, options?: ToastOptions]
  | [
      heading?: string,
      description?: string,
      showCloseBtn?: boolean,
      customBtnText?: string,
      customBtnLink?: string,
      timeOut?: number | null,
      showDuration?: number | null,
      avatar?: string,
    ];

export class ToastMagic {
  private config: ToastMagicConfig;

  constructor(config: Partial<ToastMagicConfig> = {}) {
    // No DOM access here — the container is created lazily on the first toast,
    // so importing (and constructing) is safe during SSR.
    this.config = { ...DEFAULT_CONFIG, ...readWindowConfig(), ...config };
  }

  /** Merge new options into the active configuration and restyle the container. */
  configure(config: Partial<ToastMagicConfig>): this {
    this.config = { ...this.config, ...config };
    if (isBrowser() && document.querySelector(".toast-container")) {
      this.applyContainerClasses(this.ensureContainer());
    }
    return this;
  }

  /** A copy of the active configuration. */
  getConfig(): ToastMagicConfig {
    return { ...this.config };
  }

  success(...args: ToastArgs): void {
    this.show({ type: "success", ...parseArgs(args) });
  }

  error(...args: ToastArgs): void {
    this.show({ type: "error", ...parseArgs(args) });
  }

  warning(...args: ToastArgs): void {
    this.show({ type: "warning", ...parseArgs(args) });
  }

  info(...args: ToastArgs): void {
    this.show({ type: "info", ...parseArgs(args) });
  }

  show({
    type,
    heading = "",
    description = "",
    showCloseBtn = this.config.closeButton,
    customBtnText = "",
    customBtnLink = "",
    timeOut = null,
    showDuration = null,
    avatar = "",
    allowHtml = false,
  }: ShowOptions): void {
    if (!isBrowser()) return;

    const container = this.ensureContainer();

    // Skip rendering if an identical toast is already visible and
    // duplicate prevention is enabled in the config.
    const duplicateKey = `${type}|${heading}|${description}`;
    if (this.config.preventDuplicates) {
      const isDuplicate = Array.from(container.querySelectorAll<HTMLElement>(".toast-item")).some(
        (el) => el.dataset.toastKey === duplicateKey,
      );
      if (isDuplicate) return;
    }

    let toastClass: string;
    let toastClassBasic: string;
    switch (type) {
      case "success":
        toastClass = "toast-success";
        toastClassBasic = "success";
        break;
      case "error":
        toastClass = "toast-danger";
        toastClassBasic = "danger";
        break;
      case "warning":
        toastClass = "toast-warning";
        toastClassBasic = "warning";
        break;
      case "info":
      default:
        toastClass = "toast-info";
        toastClassBasic = "info";
    }

    const toast = document.createElement("div");
    toast.classList.add("toast-item", toastClass);
    toast.dataset.toastKey = duplicateKey;
    if (this.config.animation && this.config.animation !== "default") {
      toast.classList.add("toast-animate-" + this.config.animation);
    }
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    const render = (value: string) => (allowHtml ? value : escapeHtml(value));

    toast.innerHTML = `
                <div class="theme-ios-toast-item-border"></div>
                    <div class="position-relative">
                        <div class="toast-item-content-center">
                            <div class="toast-body ${avatar ? `toast-body-avatar` : ``}">
                                <span class="toast-body-icon-container toast-text-${toastClassBasic}">
                                    ${avatar ? `<img src="${sanitizeUrl(avatar)}" alt="" class="toast-avatar">` : getToasterIcon(type)}
                                </span>
                                <div class="toast-body-container">
                                    ${heading ? `<div class="toast-body-title"><h4>${render(heading)}</h4></div>` : ""}
                                    ${description ? `<p class="fs-12">${render(description)}</p>` : ""}
                                </div>
                            </div>
                            <div class="toast-body-end">
                                ${showCloseBtn ? `<button type="button" class="toast-close-btn" aria-label="Close">${getToasterIcon("close")}</button>` : ""}
                                ${customBtnText && customBtnLink ? `<a href="${sanitizeUrl(customBtnLink)}" class="toast-custom-btn toast-btn-bg-${toastClassBasic}">${render(customBtnText)}</a>` : ""}
                            </div>
                        </div>
                    </div>`;

    toast
      .querySelector(".toast-close-btn")
      ?.addEventListener("click", () => closeToastItem(toast));

    // Per-toast overrides take precedence; otherwise fall back to the config.
    const toastShowDuration =
      typeof showDuration === "number" ? showDuration : this.config.showDuration;
    const toastTimeOut = typeof timeOut === "number" ? timeOut : this.config.timeOut;

    // Newest toast always appears closest to its anchored corner: on top
    // for top positions (older toasts move down), at the bottom for bottom
    // positions (older toasts move up). flipReflow glides the existing toasts
    // smoothly to their new spots instead of letting them jump, and removal
    // reflows the stack to close the gap (see closeToastItem).
    if (this.config.positionClass.includes("bottom")) {
      flipReflow(container, () => container.append(toast));
    } else {
      flipReflow(container, () => container.prepend(toast));
    }

    setTimeout(() => toast.classList.add("show"), toastShowDuration);

    // Auto-dismiss timer with optional pause-on-hover.
    let remaining = toastTimeOut;
    let startedAt = Date.now();
    let dismissTimer = setTimeout(() => closeToastItem(toast), remaining);

    if (this.config.pauseOnHover) {
      toast.addEventListener("mouseenter", () => {
        clearTimeout(dismissTimer);
        remaining -= Date.now() - startedAt;
      });
      toast.addEventListener("mouseleave", () => {
        startedAt = Date.now();
        dismissTimer = setTimeout(() => closeToastItem(toast), Math.max(remaining, 0));
      });
    }
  }

  /** Dismiss every currently visible toast. */
  clear(): void {
    if (!isBrowser()) return;
    document
      .querySelectorAll<HTMLElement>(".toast-container .toast-item")
      .forEach((toast) => closeToastItem(toast));
  }

  /** Alias for clear(). */
  dismissAll(): void {
    this.clear();
  }

  private ensureContainer(): HTMLElement {
    let container = document.querySelector<HTMLElement>(".toast-container");
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }
    this.applyContainerClasses(container);
    return container;
  }

  private applyContainerClasses(container: HTMLElement): void {
    container.className = "toast-container";
    container.classList.add(
      POSITION_CLASSES.includes(this.config.positionClass)
        ? this.config.positionClass
        : "toast-top-end",
    );
    container.classList.add("theme-" + this.config.theme);
    if (this.config.gradientEnable) container.classList.add("toast-gradient-enable");
    if (this.config.colorMode) container.classList.add("toast-color-true");
  }
}

// Accept the Laravel-style global config object so the npm build can drop into
// pages that already set window.toastMagicConfig (snake_case keys included).
function readWindowConfig(): Partial<ToastMagicConfig> {
  if (typeof window === "undefined") return {};
  const raw = (window as any).toastMagicConfig;
  if (!raw || typeof raw !== "object") return {};
  const config: Partial<ToastMagicConfig> = {};
  if (raw.positionClass) config.positionClass = raw.positionClass;
  if (typeof raw.closeButton === "boolean") config.closeButton = raw.closeButton;
  if (typeof raw.preventDuplicates === "boolean") config.preventDuplicates = raw.preventDuplicates;
  if (typeof raw.showDuration === "number") config.showDuration = raw.showDuration;
  if (typeof raw.timeOut === "number") config.timeOut = raw.timeOut;
  if (raw.theme) config.theme = raw.theme;
  if (raw.animation) config.animation = raw.animation;
  if (typeof raw.pauseOnHover === "boolean") config.pauseOnHover = raw.pauseOnHover;
  const gradient = raw.gradientEnable ?? raw.gradient_enable;
  if (typeof gradient === "boolean") config.gradientEnable = gradient;
  const colorMode = raw.colorMode ?? raw.color_mode;
  if (typeof colorMode === "boolean") config.colorMode = colorMode;
  return config;
}

function parseArgs(args: ToastArgs): ToastOptions {
  const [heading = "", description = ""] = args as [string?, string?];
  const third = args[2];

  if (third !== null && typeof third === "object") {
    return { heading, description, ...third };
  }

  const [, , showCloseBtn = false, customBtnText = "", customBtnLink = "", timeOut = null, showDuration = null, avatar = ""] =
    args as [string?, string?, boolean?, string?, string?, (number | null)?, (number | null)?, string?];
  return { heading, description, showCloseBtn, customBtnText, customBtnLink, timeOut, showDuration, avatar };
}

export type { ToastArgs };
export { DEFAULT_CONFIG, closeToastItem, sanitizeUrl, escapeHtml };
