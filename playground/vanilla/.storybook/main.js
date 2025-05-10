import { join, dirname } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: ["../src/components/**/*.stories.@(js|mjs)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions")
  ],
  framework: {
    name: getAbsolutePath("@storybook/html-vite"),
    options: {}
  }
};
export default config;
