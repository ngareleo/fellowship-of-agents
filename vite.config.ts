import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite is used for the local dev server (fast HMR, ESM-native).
// Rspack handles production bundling — see rspack.config.ts.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
