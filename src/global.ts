/**
 * CDN / script-tag build. Recreates the Laravel asset behavior:
 * window.ToastMagic, window.toastMagic, and [data-toast-*] click triggers.
 */
import { ToastMagic } from "./toast-magic";
import type { ToastType } from "./types";

declare global {
  interface Window {
    ToastMagic: typeof ToastMagic;
    toastMagic: ToastMagic;
  }
}

if (typeof window !== "undefined") {
  if (typeof window.ToastMagic === "undefined") {
    window.ToastMagic = ToastMagic;
  }

  const init = () => {
    // Construct after DOM ready so window.toastMagicConfig (if any) is picked up.
    if (typeof window.toastMagic === "undefined") {
      window.toastMagic = new ToastMagic();
    }

    // Listen for toast trigger buttons
    document.body.addEventListener("click", (event) => {
      const btn = (event.target as HTMLElement).closest("[data-toast-type]");
      if (!btn) return;

      const type = (btn.getAttribute("data-toast-type") || "info") as ToastType;
      const heading = btn.getAttribute("data-toast-heading") || "Notification";
      const description = btn.getAttribute("data-toast-description") || "";
      const showCloseBtn = btn.hasAttribute("data-toast-close-btn");
      const customBtnText = btn.getAttribute("data-toast-btn-text") || "";
      const customBtnLink = btn.getAttribute("data-toast-btn-link") || "";

      const toast = window.toastMagic;
      const method = typeof toast[type] === "function" ? type : "info";
      toast[method](heading, description, { showCloseBtn, customBtnText, customBtnLink });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

export {};
