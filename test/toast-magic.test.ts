import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ToastMagic } from "../src/toast-magic";

function getContainer(): HTMLElement | null {
  return document.querySelector(".toast-container");
}

function getToasts(): HTMLElement[] {
  return Array.from(document.querySelectorAll(".toast-item"));
}

beforeEach(() => {
  document.body.innerHTML = "";
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("ToastMagic", () => {
  it("creates the container lazily on first toast", () => {
    const toast = new ToastMagic();
    expect(getContainer()).toBeNull();

    toast.success("Saved!");

    const container = getContainer();
    expect(container).not.toBeNull();
    expect(container!.classList.contains("toast-top-end")).toBe(true);
    expect(container!.classList.contains("theme-default")).toBe(true);
  });

  it("renders heading, description and type class", () => {
    new ToastMagic().error("Oops", "Something went wrong");

    const item = getToasts()[0];
    expect(item.classList.contains("toast-danger")).toBe(true);
    expect(item.querySelector("h4")!.textContent).toBe("Oops");
    expect(item.querySelector("p")!.textContent).toBe("Something went wrong");
    expect(item.getAttribute("role")).toBe("alert");
  });

  it("escapes HTML by default and honors allowHtml", () => {
    const toast = new ToastMagic();
    toast.info("<img src=x onerror=alert(1)>", "<b>desc</b>");

    const item = getToasts()[0];
    expect(item.querySelector("h4 img")).toBeNull();
    expect(item.querySelector("h4")!.textContent).toContain("<img");

    toast.info("Rich", "<b>bold</b>", { allowHtml: true });
    expect(getToasts()[0].querySelector("p b")).not.toBeNull();
  });

  it("supports legacy positional arguments", () => {
    new ToastMagic().success("Done", "Saved", true, "View", "https://example.com/x");

    const item = getToasts()[0];
    expect(item.querySelector(".toast-close-btn")).not.toBeNull();
    const link = item.querySelector<HTMLAnchorElement>(".toast-custom-btn")!;
    expect(link.textContent).toBe("View");
    expect(link.getAttribute("href")).toBe("https://example.com/x");
  });

  it("sanitizes unsafe URLs", () => {
    new ToastMagic().success("Hi", "", {
      customBtnText: "Click",
      // eslint-disable-next-line no-script-url
      customBtnLink: "javascript:alert(1)",
      avatar: "javascript:alert(2)",
    });

    const item = getToasts()[0];
    expect(item.querySelector(".toast-custom-btn")!.getAttribute("href")).toBe("#");
    expect(item.querySelector(".toast-avatar")!.getAttribute("src")).toBe("#");
  });

  it("auto-dismisses after the timeout", () => {
    new ToastMagic({ timeOut: 1000 }).info("Bye");
    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1000); // dismiss triggers close
    vi.advanceTimersByTime(500); // exit animation finishes, element removed
    expect(getToasts()).toHaveLength(0);
  });

  it("prevents duplicates when configured", () => {
    const toast = new ToastMagic({ preventDuplicates: true });
    toast.success("Same", "Message");
    toast.success("Same", "Message");
    expect(getToasts()).toHaveLength(1);
  });

  it("applies theme, gradient, color mode and position via configure()", () => {
    const toast = new ToastMagic();
    toast.configure({
      theme: "glassmorphism",
      gradientEnable: true,
      colorMode: true,
      positionClass: "toast-bottom-center",
    });
    toast.warning("Styled");

    const container = getContainer()!;
    expect(container.classList.contains("theme-glassmorphism")).toBe(true);
    expect(container.classList.contains("toast-gradient-enable")).toBe(true);
    expect(container.classList.contains("toast-color-true")).toBe(true);
    expect(container.classList.contains("toast-bottom-center")).toBe(true);
  });

  it("stacks newest-first for top positions and newest-last for bottom positions", () => {
    const top = new ToastMagic();
    top.info("first");
    top.info("second");
    expect(getToasts()[0].querySelector("h4")!.textContent).toBe("second");

    document.body.innerHTML = "";
    const bottom = new ToastMagic({ positionClass: "toast-bottom-end" });
    bottom.info("first");
    bottom.info("second");
    expect(getToasts()[1].querySelector("h4")!.textContent).toBe("second");
  });

  it("clear() dismisses all visible toasts", () => {
    const toast = new ToastMagic();
    toast.success("a");
    toast.error("b");
    expect(getToasts()).toHaveLength(2);

    toast.clear();
    vi.advanceTimersByTime(500);
    expect(getToasts()).toHaveLength(0);
  });

  it("close button dismisses its toast", () => {
    new ToastMagic().success("Closable", "", { showCloseBtn: true });

    const item = getToasts()[0];
    item.querySelector<HTMLButtonElement>(".toast-close-btn")!.click();
    vi.advanceTimersByTime(500);
    expect(getToasts()).toHaveLength(0);
  });

  it("is safe to construct and import without a DOM", () => {
    // The module entry constructs a singleton; ensure no container is created
    // until a toast is actually shown (SSR safety proxy).
    const toast = new ToastMagic();
    expect(document.querySelector(".toast-container")).toBeNull();
    expect(() => toast.getConfig()).not.toThrow();
  });
});
