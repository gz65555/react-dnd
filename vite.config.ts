import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteExternalsPlugin } from "vite-plugin-externals";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteExternalsPlugin({
      react: "React",
      "react-dom": "ReactDOM",
      lazy: ["React", "lazy"]
    })
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
