import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "Floaty",
      fileName: "floaty",
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      output: {
        exports: "named"
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
