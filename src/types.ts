export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "toast-top-start"
  | "toast-top-end"
  | "toast-top-center"
  | "toast-bottom-start"
  | "toast-bottom-end"
  | "toast-bottom-center";

export type ToastTheme =
  | "default"
  | "material"
  | "ios"
  | "glassmorphism"
  | "neon"
  | "minimal"
  | "neumorphism";

export type ToastAnimation = "default" | "slide" | "fade" | "pop" | "bounce";

export interface ToastMagicConfig {
  /** Where the toast stack is anchored. Default: "toast-top-end". */
  positionClass: ToastPosition;
  /** Show a close button on every toast unless overridden per toast. Default: false. */
  closeButton: boolean;
  /** Skip a toast when an identical one (type + heading + description) is visible. Default: false. */
  preventDuplicates: boolean;
  /** Delay in ms before the entrance animation plays. Default: 100. */
  showDuration: number;
  /** Auto-dismiss timeout in ms. Default: 5000. */
  timeOut: number;
  /** Visual theme. Default: "default". */
  theme: ToastTheme;
  /** Entrance/exit animation. Default: "default". */
  animation: ToastAnimation;
  /** Pause the auto-dismiss timer while hovered. Default: true. */
  pauseOnHover: boolean;
  /** Gradient accent styling (default, material, ios, glassmorphism, neon themes). Default: false. */
  gradientEnable: boolean;
  /** Colored toast background per type. Default: false. */
  colorMode: boolean;
}

export interface ToastOptions {
  /** Bold title line. */
  heading?: string;
  /** Secondary description line. */
  description?: string;
  /** Show a close button on this toast. Falls back to config.closeButton. */
  showCloseBtn?: boolean;
  /** Label for an action link button. Rendered only together with customBtnLink. */
  customBtnText?: string;
  /** URL for the action link button. */
  customBtnLink?: string;
  /** Auto-dismiss timeout in ms for this toast. Falls back to config.timeOut. */
  timeOut?: number | null;
  /** Entrance-animation delay in ms for this toast. Falls back to config.showDuration. */
  showDuration?: number | null;
  /** Image URL rendered instead of the type icon. */
  avatar?: string;
  /**
   * Render heading/description as raw HTML instead of escaped text.
   * Only enable for trusted content — raw HTML from users is an XSS risk.
   */
  allowHtml?: boolean;
}

export interface ShowOptions extends ToastOptions {
  type: ToastType;
}
