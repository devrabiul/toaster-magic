import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig } from "tsup";

// The stylesheets live in src/styles/ so this package builds standalone —
// the build copies them into dist/ as the shipped CSS.
const cssSource = join(__dirname, "src", "styles");

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    async onSuccess() {
      await mkdir("dist", { recursive: true });
      await copyFile(join(cssSource, "toaster-magic.css"), "dist/toaster-magic.css");
      await copyFile(join(cssSource, "toaster-magic.min.css"), "dist/toaster-magic.min.css");
    },
  },
  {
    entry: { "toaster-magic": "src/global.ts" },
    format: ["iife"],
    minify: true,
    sourcemap: true,
  },
]);
