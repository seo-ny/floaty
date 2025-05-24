import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/__tests__/**",
      "website/**"
    ]
  },
  prettier,
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    linterOptions: {
      noInlineConfig: false
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "off"
    }
  }
];
