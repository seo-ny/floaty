module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-unused-vars": "error",
    "no-console": "off"
  },
  ignorePatterns: ["node_modules/", "dist/"]
};
