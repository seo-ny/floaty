import prettier from "eslint-config-prettier";

export default [
  // Apply to all JavaScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        // Node.js globals
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "off"
    }
  },
  // Prettier config to disable conflicting rules
  prettier,
  // Global ignores (replaces ignorePatterns)
  {
    ignores: ["node_modules/", "**/*/dist/", "**/*.test.js"]
  }
];
