import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig } from "tsup";

// The Laravel package's stylesheet is the single source of truth — the build
// copies it into dist so the two packages can never drift apart.
const cssSource = join(__dirname, "..", "laravel-toaster-magic", "assets", "css");

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    async onSuccess() {
      await mkdir("dist", { recursive: true });
      await copyFile(join(cssSource, "laravel-toaster-magic.css"), "dist/toaster-magic.css");
      await copyFile(join(cssSource, "laravel-toaster-magic.min.css"), "dist/toaster-magic.min.css");
    },
  },
  {
    entry: { "toaster-magic": "src/global.ts" },
    format: ["iife"],
    minify: true,
    sourcemap: true,
  },
]);
