import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: pkg.name,
      formats: ["es", "umd"]
    }
  }
});
