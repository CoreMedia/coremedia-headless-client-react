/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: [
    "__downloaded__/",
    "__generated__/",
    "dist/",
    "*.js",
    "*.graphql"
  ],
  rules: {
    "prettier/prettier": ["error", {"trailingComma": "es5"}],
  }
};
