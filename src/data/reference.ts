// Structured reference data mirrored from the package source (src/types.ts and
// src/toast-magic.ts). Keep in sync with the library on each release.

export interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

export const CONFIG_OPTIONS: PropRow[] = [
  {
    name: "positionClass",
    type: "ToastPosition",
    default: `"toast-top-end"`,
    description: "Corner or edge the toast stack is anchored to.",
  },
  {
    name: "theme",
    type: "ToastTheme",
    default: `"default"`,
    description: "One of the seven built-in visual themes.",
  },
  {
    name: "animation",
    type: "ToastAnimation",
    default: `"default"`,
    description: "Entrance / exit animation for each toast.",
  },
  {
    name: "closeButton",
    type: "boolean",
    default: "false",
    description: "Show a close button on every toast unless overridden per toast.",
  },
  {
    name: "preventDuplicates",
    type: "boolean",
    default: "false",
    description: "Skip a toast when an identical one (type + heading + description) is already visible.",
  },
  {
    name: "showDuration",
    type: "number",
    default: "100",
    description: "Delay in milliseconds before the entrance animation plays.",
  },
  {
    name: "timeOut",
    type: "number",
    default: "5000",
    description: "Auto-dismiss timeout in milliseconds. Use 0 to keep a toast until dismissed manually.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description: "Pause the auto-dismiss timer while the pointer is over the toast.",
  },
  {
    name: "gradientEnable",
    type: "boolean",
    default: "false",
    description: "Gradient accent styling (default, material, ios, glassmorphism, neon themes).",
  },
  {
    name: "colorMode",
    type: "boolean",
    default: "false",
    description: "Colored toast background matching the toast type.",
  },
];

export const TOAST_OPTIONS: PropRow[] = [
  {
    name: "heading",
    type: "string",
    default: `""`,
    description: "Bold title line of the toast.",
  },
  {
    name: "description",
    type: "string",
    default: `""`,
    description: "Secondary description line.",
  },
  {
    name: "showCloseBtn",
    type: "boolean",
    default: "config.closeButton",
    description: "Show a close button on this toast.",
  },
  {
    name: "customBtnText",
    type: "string",
    default: `""`,
    description: "Label for an action link button. Rendered only together with customBtnLink.",
  },
  {
    name: "customBtnLink",
    type: "string",
    default: `""`,
    description: "URL for the action link button. Only http(s), /, and # URLs are allowed.",
  },
  {
    name: "timeOut",
    type: "number | null",
    default: "config.timeOut",
    description: "Auto-dismiss timeout in ms for this toast.",
  },
  {
    name: "showDuration",
    type: "number | null",
    default: "config.showDuration",
    description: "Entrance-animation delay in ms for this toast.",
  },
  {
    name: "avatar",
    type: "string",
    default: `""`,
    description: "Image URL rendered instead of the type icon.",
  },
  {
    name: "allowHtml",
    type: "boolean",
    default: "false",
    description: "Render heading/description as raw HTML. Only enable for trusted content (XSS risk).",
  },
];

export interface MethodRow {
  signature: string;
  returns: string;
  description: string;
}

export const METHODS: MethodRow[] = [
  {
    signature: "toastMagic.success(heading, description?, options?)",
    returns: "void",
    description: "Show a success toast (green check icon).",
  },
  {
    signature: "toastMagic.error(heading, description?, options?)",
    returns: "void",
    description: "Show an error toast (red icon).",
  },
  {
    signature: "toastMagic.warning(heading, description?, options?)",
    returns: "void",
    description: "Show a warning toast (amber icon).",
  },
  {
    signature: "toastMagic.info(heading, description?, options?)",
    returns: "void",
    description: "Show an info toast (blue icon).",
  },
  {
    signature: "toastMagic.show({ type, heading, ...options })",
    returns: "void",
    description: "Fully explicit form — the primitive every helper calls.",
  },
  {
    signature: "toastMagic.clear()",
    returns: "void",
    description: "Dismiss every currently visible toast with the exit animation.",
  },
  {
    signature: "toastMagic.dismissAll()",
    returns: "void",
    description: "Alias for clear().",
  },
  {
    signature: "toastMagic.configure(options)",
    returns: "ToastMagic",
    description: "Merge new options into the active config and restyle the container. Chainable.",
  },
  {
    signature: "toastMagic.getConfig()",
    returns: "ToastMagicConfig",
    description: "Return a copy of the active configuration.",
  },
  {
    signature: "new ToastMagic(options?)",
    returns: "ToastMagic",
    description: "Create an independent instance with its own configuration.",
  },
];

export interface ThemeInfo {
  id: string;
  name: string;
  blurb: string;
}

export const THEMES: ThemeInfo[] = [
  { id: "default", name: "Default", blurb: "Clean card with a colored accent bar — the everyday choice." },
  { id: "material", name: "Material", blurb: "Material-inspired elevation and softer shadows." },
  { id: "ios", name: "iOS", blurb: "Frosted, rounded, subtly bouncy — like a native iOS banner." },
  { id: "glassmorphism", name: "Glassmorphism", blurb: "Translucent frosted glass with a blurred backdrop." },
  { id: "neon", name: "Neon", blurb: "Glowing neon edges for dark, high-contrast interfaces." },
  { id: "minimal", name: "Minimal", blurb: "Stripped back, borderless, quiet." },
  { id: "neumorphism", name: "Neumorphism", blurb: "Soft extruded surfaces with dual-shadow depth." },
];

export interface AnimationInfo {
  id: string;
  name: string;
  blurb: string;
}

export const ANIMATIONS: AnimationInfo[] = [
  { id: "default", name: "Default", blurb: "The theme's built-in entrance." },
  { id: "slide", name: "Slide", blurb: "Slides in from the anchored edge." },
  { id: "fade", name: "Fade", blurb: "Simple opacity fade in and out." },
  { id: "pop", name: "Pop", blurb: "Scales up quickly with a slight overshoot." },
  { id: "bounce", name: "Bounce", blurb: "Springy, playful bounce on entry." },
];

export interface PositionInfo {
  id: string;
  name: string;
}

export const POSITIONS: PositionInfo[] = [
  { id: "toast-top-start", name: "Top Left" },
  { id: "toast-top-center", name: "Top Center" },
  { id: "toast-top-end", name: "Top Right" },
  { id: "toast-bottom-start", name: "Bottom Left" },
  { id: "toast-bottom-center", name: "Bottom Center" },
  { id: "toast-bottom-end", name: "Bottom Right" },
];

export const TYPES = ["success", "error", "warning", "info"] as const;
