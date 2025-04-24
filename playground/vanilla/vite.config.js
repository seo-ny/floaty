import { defineConfig } from "vite";
import StorybookVite from "@storybook/builder-vite/vite-plugin";

export default defineConfig({
  root: ".",
  plugins: [StorybookVite()],
  server: {
    port: 6006
  },
  build: {
    target: "esnext"
  }
});
