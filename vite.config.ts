import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";

export default defineConfig({
  // Deployed under a sub-path; keep in sync with conf/nginx.conf.
  base: "/",
  resolve: {
    // Vite 7 does not read `paths` from tsconfig -- keep this in sync with it.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  plugins: [
    // The Linaria (wyw-in-js) plugin must come before the React plugin.
    // wyw-in-js 2.3+ transforms TS/JSX with its built-in Oxc pipeline, so no
    // babel presets are needed.
    wyw({ include: ["**/*.{ts,tsx}"] }),
    react(),
  ],
  build: {
    sourcemap: true,
  },
});
