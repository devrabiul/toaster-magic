import { ToastMagic } from "./toast-magic";
import type { ToastMagicConfig } from "./types";

export { ToastMagic } from "./toast-magic";
export type {
  ShowOptions,
  ToastAnimation,
  ToastMagicConfig,
  ToastOptions,
  ToastPosition,
  ToastTheme,
  ToastType,
} from "./types";

/**
 * Shared singleton — the instance most apps should use.
 * Safe to import during SSR; it only touches the DOM when a toast is shown.
 */
export const toastMagic = new ToastMagic();

/** Configure the shared {@link toastMagic} singleton. */
export function configure(config: Partial<ToastMagicConfig>): ToastMagic {
  return toastMagic.configure(config);
}

export default toastMagic;
