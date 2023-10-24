module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "dist/",
    "node_nodules/",
    "*.config.js",
    ".eslintrc.js"
  ],
  rules: {
    "prettier/prettier": ["error", {"trailingComma": "es5"}],
  }
};
