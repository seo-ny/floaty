import { mergeConfig } from "vite";
import path from "path";

export default {
  framework: {
    name: "@storybook/html-vite"
  },
  core: {
    builder: "@storybook/builder-vite"
  },
  stories: ["../src/components/**/*.stories.js"],
  addons: ["@storybook/addon-essentials"],
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          "floaty-core": "../../../packages/floaty-core/dist/floaty.es.js"
        }
      }
    });
  }
};
