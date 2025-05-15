import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "Floaty",
      fileName: (format) => {
        if (format === "es") return "floaty.mjs";
        if (format === "cjs") return "floaty.cjs";
        if (format === "umd") return "floaty.umd.js";
        return `floaty.${format}.js`;
      },
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      output: {
        exports: "named"
      }
    }
  },
  test: {
    include: ["__tests__/**/*.test.js"],
    environment: "jsdom",
    setupFiles: ["./__tests__/setup.js"]
  }
});
